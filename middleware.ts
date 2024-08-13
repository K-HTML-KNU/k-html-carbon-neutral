import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // const session = await getToken({ req, secret })
  // console.log('session: ', session)
  // const { pathname } = req.nextUrl

  // if (session) {
  //   // 로그인된 상태에서 /auth/login 또는 /auth/signup으로 접근하면 리다이렉트
  //   if (
  //     pathname.startsWith('/auth/login') ||
  //     pathname.startsWith('/auth/signup')
  //   ) {
  //     return NextResponse.redirect(new URL('/', req.url))
  //   }
  // } else {
  //   // 로그인되지 않은 상태에서 /auth/login 및 /auth/signup 이외의 경로로 접근하면 리다이렉트
  //   if (
  //     !pathname.startsWith('/auth/login') &&
  //     !pathname.startsWith('/auth/signup')
  //   ) {
  //     return NextResponse.redirect(new URL('/auth/login', req.url))
  //   }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
