import { AuthOptions, SessionStrategy } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { hash } from 'bcryptjs'
import { prisma } from '@/prisma/prisma'
import { findUserByEmail, verifyPassword } from '@/utils/auth'

const signUpUser = async (email: string, password: string) => {
  const hashedPassword = await hash(password, 10)
  return prisma.user.create({
    data: {
      name: 'test_name',
      email,
      password: hashedPassword,
    },
  })
}

const validateCredentials = async (email: string, password: string) => {
  const user = await findUserByEmail(email)

  if (!user) {
    throw new Error('No user found with the given email')
  }

  if (user.password === 'oauth-google') {
    throw new Error('User signed up with Google')
  }

  const isValid = await verifyPassword(password, user.password)

  if (!isValid) {
    throw new Error('Incorrect password')
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
        password: { label: 'Password', type: 'password' },
        method: { label: 'Method', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const { email, password, method } = credentials

        if (method === 'signup') {
          const user = await findUserByEmail(email)
          if (user) {
            throw new Error('User already exists')
          }
          const createdUser = await signUpUser(email, password)
          return { ...createdUser, id: String(createdUser.id) }
        }

        if (method === 'login') {
          const createdUser = await validateCredentials(email, password)
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
              name: 'test_name',
              email: user.email!,
              password: 'oauth-google',
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
