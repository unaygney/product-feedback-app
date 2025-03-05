declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Server-side only environment variables
      DATABASE_URL: string
      BETTER_AUTH_SECRET: string
      TURNSTILE_SECRET_KEY

      // Client-side accessible environment variables (prefixed with NEXT_PUBLIC_)
      NEXT_PUBLIC_BACKEND_URL: string
      NEXT_PUBLIC_BETTER_AUTH_URL: string
      NEXT_PUBLIC_SITE_KEY: string
    }
  }
}
export {}
