'use client'

import Food from '@/components/Food'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'

export default function Fridge() {
  const { data: session } = useSession()

  const addIngredient = async (ingredient: string) => {
    const email = session?.user?.email
    console.log(session)
    if (!email) {
      return
    }
    try {
      const response = await fetch('/api/recipe/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          ingredientName: ingredient,
        }),
      })
      console.log(response)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return (
    <div className="flex flex-wrap gap-[12px]">
      <Food
        type="egg"
        name="계란"
        description="달걀은 단백질이 풍부하고, 지방과 콜레스테롤 함량이 낮아서 건강에 좋은 식품입니다."
        nutrition="굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양굳굳 영양"
        storage="잘 저장 잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장잘 저장"
      />
      <button onClick={() => addIngredient('김치')}>Button</button>
    </div>
  )
}
