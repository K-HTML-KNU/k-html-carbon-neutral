import { AuthOptions, SessionStrategy } from 'next-auth'
// eslint-disable-next-line import/no-named-as-default
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '@/prisma/prisma'
import { findUserByEmail } from '@/utils/auth'

const validateCredentials = async (email: string) => {
  const user = await findUserByEmail(email)

  if (!user) {
    throw new Error('No user found with the given email')
  }

  return user
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        method: { label: 'Method', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error('Email and password are required')
        }

        const { email, method } = credentials

        if (method === 'login') {
          const createdUser = await validateCredentials(email)
          return { ...createdUser, id: String(createdUser.id) }
        }

        throw new Error('Invalid method')
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') {
        return true
      }

      if (account?.provider === 'google') {
        const userExists = await findUserByEmail(user.email!)

        if (!userExists) {
          await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email!,
            },
          })
        }

        return true
      }

      throw new Error('Invalid provider')
    },
    redirect({ baseUrl }) {
      return baseUrl
    },
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  debug: false,
}
