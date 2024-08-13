import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

interface Routes {
  [key: string]: boolean
}

const publicOnlyUrls: Routes = {
  '/auth': true,
  '/auth/login': true,
  '/auth/signup': true,
  '/auth/error': true,
}

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const exists = publicOnlyUrls[request.nextUrl.pathname]

  if (!token) {
    if (!exists) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
