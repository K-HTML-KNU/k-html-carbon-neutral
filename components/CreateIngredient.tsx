'use client'

import Image from 'next/image'

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from './ui/button'

import PLUS from '@/meta/images/plus.svg'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { IngredientList } from '@/app/fridge/page'

export default function CreateIngredient({ setIngredients }: { setIngredients: Dispatch<SetStateAction<IngredientList>> }) {
  const { data: session } = useSession()
  const [ingredient, setIngredient] = useState('')

  const handleChangeIngredient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value)
  }

  const handleAddIngredient = async () => {
    const email = session?.user?.email
    console.log(session)
    if (!email) {
      return
    }
    try {
      const response = await fetch('/api/ingredient/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          ingredientName: ingredient,
        }),
      })

      const data = await response.json()

      if (data.code === 200) {
        const response = await fetch(`/api/ingredient/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session?.user?.email,
          }),
        })

        const data = await response.json();

        setIngredients(data.response);
      } else {
        alert('재료 추가에 실패했습니다.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="w-[139px] cursor-pointer group">
          {/* img */}
          <div className='w-[139px] h-[139px] border border-gray-500 rounded-md flex items-center justify-center group-hover:bg-gray-200'>
            <Image
              src={PLUS}
              alt="food_img"
            />
          </div>
          {/* name */}
          <h3 className="text-lg font-semibold">추가하기</h3>
          {/* description */}
          <p className="text-sm leading-7 line-clamp-2">본인의 식재료를 추가하세요.</p>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>식재료 추가하기</DrawerTitle>
          <DrawerDescription>
            본인의 식재료를 추가하세요.
          </DrawerDescription>
        </DrawerHeader>
        <div className='px-[16px]'>
          <Label htmlFor="picture">식재료를 입력해주세요</Label>
          <Input id="picture" placeholder='김치' value={ingredient} onChange={(e) => handleChangeIngredient(e)} />
        </div>
        <DrawerFooter>
          <Button onClick={() => handleAddIngredient()}>추가하기</Button>
          <DrawerClose>
            <Button variant="outline">취소하기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
