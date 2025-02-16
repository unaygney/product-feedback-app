import { createClient } from 'jstack'

import type { AppRouter } from '@/server'

/**
 * Your type-safe API client
 * @see https://jstack.app/docs/backend/api-client
 */
export const client = createClient<AppRouter>({
  baseUrl: 'http://localhost:3000/api',
})
