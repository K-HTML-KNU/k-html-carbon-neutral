import { User as PrismaUser } from '@prisma/client'

export interface User extends PrismaUser {
  id: number
  carbon_reduce: number
  email: string
  name: string
  password: string
  UserIngredients: UserIngredients[]
  recipeHistory: RecipeHistory[]
}

export interface UserIngredients {
  id: number
  ingredientName: string
  userId: number
}

export interface RecipeHistory {
  id: number
  recipeName: string
  userId: number
}
