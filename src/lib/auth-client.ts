import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: `${process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}` : 'http://localhost:3000'}`,
})
