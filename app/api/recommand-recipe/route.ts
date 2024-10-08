import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma'
import { parseRecipeString } from '@/utils/recipe'

const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY

export async function POST(request: Request) {
  try {
    const postData = await request.json()
    // const postData = {
    //   recipeHistory: [
    //     {
    //       recipeName: '스파게티 봉즈라노',
    //       recipeIngredients: ['스파게티', '스파게티 소스', '올리브 오일'],
    //       review: 5,
    //     },
    //     {
    //       recipeName: '치킨 커리',
    //       recipeIngredients: [
    //         '닭고기',
    //         '토마토',
    //         '양파',
    //         '마늘',
    //         '쌀',
    //         '카레 가루',
    //       ],
    //       review: 4,
    //     },
    //   ],
    //   ingredients: [
    //     '달걀',
    //     '밥',
    //     '닭고기',
    //     '소금',
    //     '후추',
    //     '간장',
    //     '참기름',
    //     '김치',
    //     '냉동 밥',
    //     '미역',
    //   ],
    // }

    if (!apiKey) {
      console.error('API Key is missing')
      return NextResponse.json({ error: 'API Key is missing' }, { status: 500 })
    }

    let prompt = `고객이 이전에 만들어 먹었던 음식(recipeName)과 재료(recipeIngredients), 평가(review: 1~5점)는 다음과 같다.\n\n${JSON.stringify(postData.recipeHistory, null)}\n
    현재 고객이 가지고 있는 식재료는 ${JSON.stringify(postData.ingredients, null)}이다.\n이와 같은 고객의 요리 기록과 현재 가지고 있는 식재료를 바탕으로 고객이 만족할 수 있는 최고의 레시피를 다음 규칙을 지켜 제시하여라.
    \n1. 어느 한 레시피만을 사용하지 말아라. 2개 이상의 레시피를 사용하여라.\n2. 작성된 레시피에서 사용된 재료들은 모두 ingredients에 명시하여라.\n3. 이미지가 제공되지 않았다면 검색을 통해 각 단계에 적절한 이미지 링크를 추가하여라.\n4. "반드시" 아래와 같이 각 내용을 줄내림으로 구분하는 형식으로 작성하여라.\n
    recipe_name: 간장계란밥\ningredient: 밥, 계란, 간장, 김치, 미역, 참기름\nserving: 2\ndifficulty: 2\ncooking_time: 30\nsteps: [\nstep: 1 || subtitle: 계란 풀기 || image: 623561-1 || description: 밥을 넣고 계란을 풀어주세요.]`

    const apiUrl =
      'https://k-html-team07.openai.azure.com/openai/deployments/Team07/chat/completions?api-version=2024-02-15-preview'

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              '너는 한식, 일식, 중식, 양식에서 최고의 평가를 받은 전문 셰프이다.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    })
    const data = await response.json()
    const json_str = data['choices'][0]['message']['content']
    const json = parseRecipeString(json_str)

    return NextResponse.json(
      {
        message: 'Ingredient added to user successfully',
        data: json,
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
