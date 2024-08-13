"use client"

import CreateIngredient from '@/components/CreateIngredient'
import Food, { FoodType } from '@/components/Food'
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const idToCategory: { [key: number]: string } = {
  1: "Other Processed Foods",
  2: "Grains and Starches",
  3: "Vegetables",
  4: "Fruits",
  5: "Meat",
  6: "Seafood",
  7: "Dairy and Eggs",
  8: "Legumes and Nuts",
  9: "Condiments and Spices",
  10: "Fats and Oils",
  11: "Other Processed Foods",
}

export type IngredientList = {
  ingredients: {
    category_id: number,
    disposal_method: string,
    id: number,
    name: string,
    nutrition_info: string,
    storage_method: string
  }
}[]

export default function Fridge() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [ingredients, setIngredients] = useState<IngredientList>([]);

  const handleGetIngredients = async () => {
    const email = session?.user?.email;
    console.log(email);
    if (!email) {
      alert('로그인이 필요합니다.');
      window.location.href = '/auth/login';
      return;
    }

    setIsLoading(true);

    try {
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
      console.log(data);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (() => {
      handleGetIngredients();
    })();
  }, [])

  return (
    <div className="flex flex-wrap gap-[12px]">
      <CreateIngredient setIngredients={setIngredients} />
      {ingredients?.map(({ ingredients }, index) => (
        <Food
          key={`ingredient-${index}`}
          type={idToCategory[ingredients.category_id] as FoodType}
          name={ingredients.name}
          description={ingredients.disposal_method}
          nutrition={ingredients.nutrition_info}
          storage={ingredients.storage_method}
        />
      ))}
      <Loading isOpen={isLoading} />
    </div>
  )
}
