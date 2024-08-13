import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma'

const categoryToId: { [key: string]: number } = {
  'Default category': 1,
  'Grains and Starches': 2,
  Vegetables: 3,
  Fruits: 4,
  Meat: 5,
  Seafood: 6,
  'Dairy and Eggs': 7,
  'Legumes and Nuts': 8,
  'Condiments and Spices': 9,
  'Fats and Oils': 10,
  'Other Processed Foods': 11,
}

export async function POST(request: Request) {
  try {
    const postData = await request.json()
    console.log('postData:', postData)
    const { email, review, recipe_name, leftIngredients } = postData

    // 1. 이메일을 통해 유저 찾기
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    // 유저가 없을 경우 에러 발생
    if (!user) {
      throw new Error('User not found')
    }

    // 2. 유저가 있을 경우 RecipeHistory에 값 추가
    const recipeHistory = await prisma.recipeHistory.create({
      data: {
        name: recipe_name,
        nutrition_info: 'Temporary Nutrition Info',
        review: review,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    // 3. leftIngredients 처리
    const ingredientsArray = leftIngredients
      .split(',')
      .map((ingredient: string) => ingredient.trim())

    for (const ingredientName of ingredientsArray) {
      // 3-1. UserIngredients 테이블에 이미 존재하는 값일 경우 updatedAt 값을 자동으로 업데이트
      let userIngredient = await prisma.userIngredients.findFirst({
        where: {
          user_id: user.id,
          ingredients: {
            name: ingredientName,
          },
        },
        include: {
          ingredients: true,
        },
      })
      if (userIngredient) {
        await prisma.userIngredients.update({
          where: {
            id: userIngredient.id,
          },
          data: {
            // updatedAt 필드는 생략합니다. Prisma가 자동으로 업데이트합니다.
          },
        })
      } else {
        // 3-2. UserIngredients 테이블에 값이 없을 경우 Ingredients 테이블에 값을 추가하고 UserIngredients에 추가

        const category_res = await fetch(
          'https://vwekbsqcaf.execute-api.ap-northeast-2.amazonaws.com/default/Openai-Food-HelloWorldFunction-X8zN5be3fV7J',
          {
            method: 'POST',
            body: JSON.stringify({
              ingredient_name: ingredientsArray[0],
            }),
          },
        )
        const { category } = await category_res.json()
        const categoryNum = Number.parseInt(categoryToId[category].toString())
        console.log(category, categoryNum)

        // 먼저 적절한 IngredientCategory가 존재하는지 확인
        let ingredientCategory = await prisma.ingredientCategory.findFirst({
          where: {
            name: category, // 카테고리 이름을 바꾸거나 필요에 따라 동적으로 변경할 수 있습니다.
          },
        })

        if (!ingredientCategory) {
          // IngredientCategory가 없으면 새로 생성
          ingredientCategory = await prisma.ingredientCategory.create({
            data: {
              name: category,
            },
          })
        }

        let ingredient = await prisma.ingredients.findFirst({
          where: {
            name: ingredientName,
          },
        })

        if (!ingredient) {
          // Ingredients 테이블에 재료가 없을 경우 새로 추가
          ingredient = await prisma.ingredients.create({
            data: {
              name: ingredientName,
              nutrition_info: 'Temporary Nutrition Info', // 필요 시 실제 데이터로 대체
              storage_method: 'Temporary Storage Method', // 필요 시 실제 데이터로 대체
              disposal_method: 'Temporary Disposal Method', // 필요 시 실제 데이터로 대체
              category: {
                connect: {
                  id: ingredientCategory.id,
                },
              },
            },
          })
        }

        // UserIngredients 테이블에 추가
        await prisma.userIngredients.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
            ingredients: {
              connect: {
                id: ingredient.id,
              },
            },
          },
        })
      }
    }

    return NextResponse.json(
      {
        message: 'Ingredient added to user successfully',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error adding ingredient:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
