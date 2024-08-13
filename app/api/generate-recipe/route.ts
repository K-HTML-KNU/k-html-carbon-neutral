import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma'

const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY
export async function POST(request: Request) {
  try {
    const { ingredients } = await request.json()
    // const ingredients = ['달걀']
    if (!apiKey) {
      console.error('API Key is missing')
      return NextResponse.json({ error: 'API Key is missing' }, { status: 500 })
    }

    let ingredient = ''
    for (let i = 0; i < ingredients.length; i++) {
      ingredient += `"${ingredients[i]}", `
    }
    ingredient = ingredient.slice(0, -2)
    ingredient = `[${ingredient}]`

    const recipes: any[] = await prisma.$queryRaw`
  SELECT 
    recipe_id, 
    recipe_name, 
    view_count, 
    scrap_count, 
    ingredients, 
    servings, 
    difficulty, 
    cooking_time, 
    steps, 
    (
      0.4 * ((view_count - 12) / (15192 - 12)) +   
      0.3 * ((scrap_count - 116) / (462 - 116)) +  
      0.2 * ((5 - difficulty) / 4) +  
      0.1 * ((120 - cooking_time) / (120 - 5))  
    ) AS priority_score 
  FROM 
    recipes 
  WHERE 
    ingredients->'재료' @> ${ingredient}::jsonb 
  ORDER BY 
    priority_score DESC 
  LIMIT 5;
`

    if (recipes === null || recipes === undefined || recipes.length === 0) {
      return NextResponse.json(
        { message: 'No recipe found', data: recipes },
        { status: 200 },
      )
    }
    const id_match = {}
    for (let i = 0; i < recipes.length; i++) {
      const steps: any[] = recipes[i].steps
      for (let j = 0; j < steps.length; j++) {
        const key = `${recipes[i]['recipe_id']}-${j}`
        // @ts-ignore
        id_match[key] = steps[j]['image']
        steps[j]['image'] = key
      }
    }
    const prompt_data = JSON.stringify(recipes, null)
    let prompt = `
      다음은 ${'달걀'}을 이용해 만들 수 있는 요리 레시피 ${recipes.length}개이다.\n\n${prompt_data}\n
      참고:\n- view_count: 조회수(12 ~ 15192, mean: 6291)\n- scrap_count: 스크랩 횟수(116 ~ 462, mean: 145)\n- difficulty: 난이도(category: 1 ~ 5, 값이 클수록 어렵다)\n- cooking_time: 요리시간(분: 5 ~ 120, mean: 43)\n
      위 레시피를 기반으로 ${'달걀'}을 이용해 만들 수 있는 가장 적절한 레시피를 다음 규칙을 지켜 작성하여라.\n1. 어느 한 레시피만을 사용하지 말아라. 2개 이상의 레시피를 사용하여라.\n2. 작성된 레시피에서 사용된 재료들은 모두 ingredients에 명시하여라.\n3. "반드시" 아래와 같은 JSON 형식으로 작성하여라. \n{\n  'recipe_name': "간장계란밥",\n 'ingredient': "밥, 계란, 간장, 김치, 미역, 참기름",\n serving: 2,\n  'difficulty': 2,\n 'cooking_time': 30,\n  'steps': [\n  {\n 'step': 1,\n'subtitle': "계란 풀기"\n 'image': "[623561-1]",\n 'description': "밥을 넣고 계란을 풀어주세요."\n }\n  ]\n}`

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
    const cleanJsonStr = json_str
      .replace(/'/g, '"') // 작은 따옴표를 큰 따옴표로 변경
      .replace(/(\d+):/g, '"$1":') // 키값을 문자열로 변환
      .replace(/,\s*}/g, '}') // 잘못된 쉼표 제거
    const json = JSON.parse(cleanJsonStr)
    const steps = json['steps']

    for (let i = 0; i < steps.length; i++) {
      try {
        const key = steps[i]['image'].replace('[', '').replace(']', '')
        // @ts-ignore
        steps[i]['image'] = id_match[key]
      } catch (e) {
        continue
      }
    }
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
