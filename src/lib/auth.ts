import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { captcha } from 'better-auth/plugins'

import { db } from '@/server/db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    captcha({
      provider: 'cloudflare-turnstile',
      secretKey: process.env.TURNSTILE_SECRET_KEY!,
    }),
  ],
})

export const isRequestedAuthPage = (pathname: string) => {
  const authPages = ['/auth']
  return authPages.some((page) => pathname.startsWith(page))
}
export const securedPages = (pathname: string) => {
  const securedPaths = ['/dashboard', '/profile', '/settings']
  return securedPaths.some((page) => pathname.startsWith(page))
}
