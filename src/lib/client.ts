import { createClient } from 'jstack'

import type { AppRouter } from '@/server'

/**
 * Your type-safe API client
 * @see https://jstack.app/docs/backend/api-client
 */
export const client = createClient<AppRouter>({
  baseUrl: `${getBaseUrl()}/api`,
})

/**
 * Get the base URL for the API
 */

export function getBaseUrl() {
  // 👇 Adjust for wherever you deploy
  if (process.env.NODE_ENV === 'production') {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}`
  } else {
    return 'http://localhost:8080'
  }
}
