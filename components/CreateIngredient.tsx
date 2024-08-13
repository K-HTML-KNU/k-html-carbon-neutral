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
import { Button } from './ui/button'

import PLUS from '@/meta/images/plus.svg'

export default function CreateIngredient() {
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
        <div>

        </div>
        <DrawerFooter>
          <Button>추가하기</Button>
          <DrawerClose>
            <Button variant="outline">취소하기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
