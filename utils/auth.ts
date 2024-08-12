import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { prisma } from '@/prisma/prisma'

export async function verifyPassword(
  password: string | undefined,
  hashedPassword: string | undefined,
): Promise<boolean> {
  if (!password || !hashedPassword) {
    return false
  }
  const r = await compare(password, hashedPassword)
  return !!r
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return user
}
