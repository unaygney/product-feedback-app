import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { captcha } from 'better-auth/plugins'

import { client } from './client'
import { db } from '@/server/db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await client.send.forgetPassword.$post({
        email: user.email,
        refreshLink: url,
        subject: 'Product Feedback App | Reset Password',
      })
    },
  },
  plugins: [
    captcha({
      provider: 'cloudflare-turnstile',
      secretKey:
        process.env.NODE_ENV === 'production'
          ? process.env.TURNSTILE_SECRET_KEY
          : '1x0000000000000000000000000000000AA',
    }),
  ],
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
  },
})
