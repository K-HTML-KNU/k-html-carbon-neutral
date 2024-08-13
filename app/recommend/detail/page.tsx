'use client'

import { CheckBoxForm } from '@/components/InputForm'
import StarRate from '@/components/Star'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Form } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from '@/components/ui/use-toast'
import { recipeLevel, responseRecipeData } from '@/models/recipe'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const Page = () => {
  const { data: session } = useSession()
  const generateDynamicSchema = (fields: string[]) => {
    const schema = fields.reduce((acc, field) => {
      return {
        ...acc,
        [field]: z.boolean().default(false).optional(),
      }
    }, {})

    return z.object({
      review: z
        .number()
        .min(0, { message: '리뷰 점수는 0 이상이어야 합니다.' })
        .max(5, { message: '리뷰 점수는 5 이하이어야 합니다.' }),
      ...schema,
    })
  }

  const ingredientArray = responseRecipeData.ingredient
    .split(',')
    .map((item) => item.trim())

  const FormSchema = generateDynamicSchema(ingredientArray)

  const defaultValues = {
    review: 5,
    ...ingredientArray.reduce((acc, field) => {
      return {
        ...acc,
        [field]: false, // 각 필드에 대해 기본 값을 false로 설정
      }
    }, {}),
  }

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  function onSubmitReview(data: z.infer<typeof FormSchema>) {
    console.log('동작하지 않음; onclick을 처리')
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  function getTrueKeys(obj: { [key: string]: boolean | number }): string[] {
    return Object.keys(obj).filter(
      (key) => typeof obj[key] === 'boolean' && obj[key] === true,
    )
  }

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const response = await fetch('/api/recipe/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: session?.user?.email,
        review: form.getValues().review,
        leftIngredients: getTrueKeys(form.getValues()).join(','),
        recipe_name: responseRecipeData.recipe_name,
      }),
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <div className="">
      <ScrollArea>
        <h1>{responseRecipeData.recipe_name}</h1>
        <h1>레시피 재료</h1>
        <p>[ {responseRecipeData.ingredient} ]</p>
        {/* <div className="flex">
        {responseRecipeData.ingredient.split(',').map((ingredient) => (
          <p>{ingredient}</p>
        ))}
      </div> */}

        <h1>{responseRecipeData.serving}인분</h1>
        <h1>요리 난이도</h1>
        <p>{recipeLevel[responseRecipeData.difficulty].label}</p>

        <h1>요리 시간</h1>
        <p>{responseRecipeData.cooking_time}분 소요</p>

        <h1>요리 순서(목차)</h1>
        {responseRecipeData.steps.map((step, index) => (
          <p key={index}>{step.subtitle}</p>
        ))}

        <h1>레시피 세부 내용</h1>
        {responseRecipeData.steps.map((step, index) => (
          <div key={index}>
            <p>
              {step.step} / {responseRecipeData.steps.length}
            </p>
            <p>{step.subtitle}</p>
            <p>{step.description}</p>
            <Image
              src={step.image}
              alt={step.description + '이미지'}
              width={500}
              height={300}
              className="w-full h-auto rounded-xl"
              // layout="responsive"
            />
          </div>
        ))}

        <Drawer>
          <DrawerTrigger asChild className="flex flex-1 w-full mt-12">
            <Button>레시피 평가하기</Button>
          </DrawerTrigger>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitReview)}>
              <DrawerContent>
                <DrawerHeader className="text-left gap-4">
                  <DrawerTitle>레시피 리뷰</DrawerTitle>
                  <DrawerDescription>
                    레시피를 평가해주세요. 더 나은 레시피 추천하는데 반영됩니다.
                  </DrawerDescription>

                  <div>
                    <h1>레시피 별점</h1>
                    <div className="flex justify-center">
                      <StarRate form={form}></StarRate>
                    </div>
                  </div>

                  <div className="block">
                    <h1>남은 식재료</h1>
                    {ingredientArray.map((ingrediment, index) => (
                      <CheckBoxForm
                        key={index}
                        form={form}
                        name={ingrediment}
                        label={ingrediment}
                      />
                    ))}
                  </div>
                </DrawerHeader>

                <DrawerFooter className="pt-2 flex flex-row">
                  <DrawerClose asChild className="flex-1">
                    <Button variant="outline">취소하기</Button>
                  </DrawerClose>
                  <DrawerClose asChild className="flex-1">
                    <Button className="flex-1" type="submit" onClick={onClick}>
                      평가하기
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </form>
          </Form>
        </Drawer>
      </ScrollArea>
    </div>
  )
}

export default Page
