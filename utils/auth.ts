import { UserBase } from '@/models/user'
import { prisma } from '@/prisma/prisma'
import { compare } from 'bcryptjs'

export async function verifyPassword(
  password: string | undefined,
  hashedPassword: string | undefined,
): Promise<boolean> {
  if (!password || !hashedPassword) {
    return false
  }
  const r = await compare(password, hashedPassword)
  return r ? true : false
}

export async function findUserByEmail(email: string): Promise<UserBase | null> {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
    },
  })
  return user
}
