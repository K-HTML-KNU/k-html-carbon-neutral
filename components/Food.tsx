import Image, { StaticImageData } from 'next/image'

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
import EGG from '@/meta/images/food/egg.png'
import FRUIT from '@/meta/images/food/fruit.png'
import GRAIN from '@/meta/images/food/grain.png'
import LEGUME from '@/meta/images/food/legume.png'
import MEET from '@/meta/images/food/meet.png'
import SALT from '@/meta/images/food/salt.png'
import SEAFOOD from '@/meta/images/food/seafood.png'
import VEGETABLE from '@/meta/images/food/vegetable.png'
import Oil from '@/meta/images/food/oil.png'

import { Button } from './ui/button'

export type FoodType =
  | 'Default category'
  | 'Grains and Starches'
  | 'Vegetables'
  | 'Fruits'
  | 'Meat'
  | 'Seafood'
  | 'Dairy and Eggs'
  | 'Legumes and Nuts'
  | 'Condiments and Spices'
  | 'Fats and Oils'
  | 'Other Processed Foods'

const FOOD_IMAGES_MAP: { [key: string]: StaticImageData } = {
  'Dairy and Eggs': EGG,
  Fruits: FRUIT,
  'Grains and Starches': GRAIN,
  'Legumes and Nuts': LEGUME,
  Meat: MEET,
  'Condiments and Spices': SALT,
  Seafood: SEAFOOD,
  Vegetables: VEGETABLE,
  'Fats and Oils': Oil,
}

async function getRecommendRecipe(foodName: string) {
  const response = await fetch(
    'https://vwekbsqcaf.execute-api.ap-northeast-2.amazonaws.com/default/Openai-Food-HelloWorldFunction-X8zN5be3fV7J',
    {
      method: 'POST',
      body: JSON.stringify({ ingredient_name: foodName }),
    },
  )
  const data = await response.json()
  console.log('foodData', data)
  return data
}

export default async function Food({
  type,
  name,
  description,
  nutrition,
  storage,
}: {
  type: FoodType
  name: string
  description: string
  nutrition: string
  storage: string
}) {
  const data = getRecommendRecipe(name)
  // @ts-ignore
  const nutritionInfo = JSON.stringify(data['nutritionInfo'])
  // @ts-ignore
  const storageInfo = data['storageMethod']
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="w-[139px] cursor-pointer group">
          {/* img */}
          <Image
            src={FOOD_IMAGES_MAP[type]}
            alt="food_img"
            className="group-hover:border border-black rounded-md"
          />
          {/* name */}
          <h3 className="text-lg font-semibold">{name}</h3>
          {/* description */}
          <p className="text-sm leading-7 line-clamp-2">{description}</p>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{name}</DrawerTitle>
          <DrawerDescription>
            식품 영량 정보 및 보관 방법을 확인합니다.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-[16px] px-[16px] max-h-[440px] overflow-y-scroll">
          <div className="flex justify-center">
            <Image
              src={FOOD_IMAGES_MAP[type]}
              alt="food_img"
              className="w-[50%]"
            />
          </div>
          <p className="text-sm leading-7 line-clamp-2">{description}</p>
          <div>
            <h1>영양 정보</h1>
            <p className="text-sm leading-7">{nutritionInfo}</p>
          </div>
          <div>
            <h1>보관 방법</h1>
            <p className="text-sm leading-7">{storageInfo}</p>
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
