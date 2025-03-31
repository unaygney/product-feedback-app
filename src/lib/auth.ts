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
    autoSignIn: true,
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

// import { render } from '@react-email/render'
// import { betterAuth } from 'better-auth'
// import { drizzleAdapter } from 'better-auth/adapters/drizzle'
// import { captcha } from 'better-auth/plugins'
// import React from 'react'

// import ForgotPasswordEmail from '@/components/emails/forgot-password-email'

// import { client } from './client'
// import { db } from '@/server/db'

// export const auth = betterAuth({
//   database: drizzleAdapter(db, {
//     provider: 'pg',
//   }),
//   emailAndPassword: {
//     enabled: true,
//     autoSignIn: true,
//     sendResetPassword: async ({ user, url, token }, request) => {
//       // Render bileşeni HTML'e çeviriyoruz
//       const html = render(
//         React.createElement(ForgotPasswordEmail, { refreshLink: url })
//       )

//       await client.send.send.$post({
//         email: user.email,
//         subject: 'Reset your password',
//         template: html,
//       })
//     },
//   },
//   plugins: [
//     captcha({
//       provider: 'cloudflare-turnstile',
//       secretKey:
//         process.env.NODE_ENV === 'production'
//           ? process.env.TURNSTILE_SECRET_KEY
//           : '1x0000000000000000000000000000000AA',
//     }),
//   ],
//   advanced: {
//     useSecureCookies: process.env.NODE_ENV === 'production',
//   },
// })
