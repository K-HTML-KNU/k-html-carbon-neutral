import Image, { StaticImageData } from "next/image";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import EGG from "@/src/images/food/egg.png";
import FRUIT from "@/src/images/food/fruit.png";
import GRAIN from "@/src/images/food/grain.png";
import LEGUME from "@/src/images/food/legume.png";
import MEET from "@/src/images/food/meet.png";
import SALT from "@/src/images/food/salt.png";
import SEAFOOD from "@/src/images/food/seafood.png";
import VEGETABLE from "@/src/images/food/vegetable.png";

import { Button } from "./ui/button";

type FoodType = "egg" | "fruit" | "grain" | "legume" | "meet" | "salt" | "seafood" | "vegetable"

const FOOD_IMAGES_MAP: { [key: string]: StaticImageData } = {
  "egg": EGG,
  "fruit": FRUIT,
  "grain": GRAIN,
  "legume": LEGUME,
  "meet": MEET,
  "salt": SALT,
  "seafood": SEAFOOD,
  "vegetable": VEGETABLE,
}

export default function Food({ type, name, description, nutrition, storage }: { type: FoodType, name: string, description: string, nutrition: string, storage: string }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="w-[139px] cursor-pointer group">
          {/* img */}
          <Image src={FOOD_IMAGES_MAP[type]} alt="food_img" className="group-hover:border border-black rounded-md" />
          {/* name */}
          <h3 className="text-lg font-semibold">{name}</h3>
          {/* description */}
          <p className="text-sm leading-7 line-clamp-2">{description}</p>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{name}</DrawerTitle>
          <DrawerDescription>식품 영량 정보 및 보관 방법을 확인합니다.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-[16px] px-[16px] max-h-[440px] overflow-y-scroll">
          <div className="flex justify-center">
            <Image src={FOOD_IMAGES_MAP[type]} alt="food_img" className="w-[50%]" />
          </div>
          <p className="text-sm leading-7 line-clamp-2">{description}</p>
          <div>
            <h1>영양 정보</h1>
            <p className="text-sm leading-7">{nutrition}</p>
          </div>
          <div>
            <h1>보관 방법</h1>
            <p className="text-sm leading-7">{storage}</p>
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