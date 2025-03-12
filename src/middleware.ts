import { headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { auth } from './lib/auth'
import { isRequestedAuthPage, securedPages } from './lib/auth-pages'

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (isRequestedAuthPage(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  if (securedPages(pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
