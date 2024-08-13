// app/api/ingredient/add/route.ts
import { prisma } from '@/prisma/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    console.log("start");
    const { email } = await request.json();
    console.log("check email: " + email);

    const userWithIngredients = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        UserIngredients: {
          select: {
            ingredients: true, // Fetch the related Ingredients data
          },
        },
      },
    });

    console.log(userWithIngredients);

    const result = userWithIngredients?.UserIngredients;

    return NextResponse.json(
      { code: 200, response: result || [] },
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
