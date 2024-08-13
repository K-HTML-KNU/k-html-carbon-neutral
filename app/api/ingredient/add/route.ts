// app/api/ingredient/add/route.ts
import { prisma } from '@/prisma/prisma'
import { NextResponse } from 'next/server'

const categoryToId: { [key: string]: number } = {
  "Default category": 1,
  "Grains and Starches": 2,
  "Vegetables": 3,
  "Fruits": 4,
  "Meat": 5,
  "Seafood": 6,
  "Dairy and Eggs": 7,
  "Legumes and Nuts": 8,
  "Condiments and Spices": 9,
  "Fats and Oils": 10,
  "Other Processed Foods": 11,
}

export async function POST(request: Request) {
  try {
    const { email, ingredientName } = await request.json()

    // email로 사용자를 찾기
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // 재료가 이미 존재하는지 확인
    let ingredient = await prisma.ingredients.findFirst({
      where: {
        name: ingredientName,
      },
    })

    // 재료에 대한 영양분 정보 생성
    const response = await fetch('https://5996qadw98.execute-api.ap-northeast-2.amazonaws.com/Prod/hello', {
      method: 'POST',
      body: JSON.stringify({ ingredient_name: ingredientName }),
    })

    const { nutritionInfo, storageMethod, disposalMethod, category } = await response.json();

    console.log(nutritionInfo, storageMethod, disposalMethod, category)

    // 재료가 존재하지 않으면 생성
    if (!ingredient) {
      ingredient = await prisma.ingredients.create({
        data: {
          name: ingredientName,
          nutrition_info: JSON.stringify(nutritionInfo), // 임의의 값
          storage_method: storageMethod, // 임의의 값
          disposal_method: disposalMethod, // 임의의 값
          category: {
            connect: {
              id: categoryToId[category as string],
            },
          },
        },
      })
    }

    // User와 Ingredients 사이의 관계를 UserIngredients 테이블에 생성
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

    return NextResponse.json(
      { message: 'Ingredient added to user successfully', code: 200 },
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
