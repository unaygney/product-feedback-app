import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { env } from 'hono/adapter'
import { HTTPException } from 'hono/http-exception'
import { jstack } from 'jstack'

import { auth } from '@/lib/auth'

import * as relationsImport from '@/server/db/relations'
import * as schemaImport from '@/server/db/schema'

interface Env {
  Bindings: { DATABASE_URL: string }
}

export const j = jstack.init<Env>()

/**
 * Type-safely injects database into all procedures
 *
 * @see https://jstack.app/docs/backend/middleware
 */
const databaseMiddleware = j.middleware(async ({ c, next }) => {
  const schema = { ...schemaImport, ...relationsImport }
  const { DATABASE_URL } = env(c)

  const sql = neon(DATABASE_URL)
  const db = drizzle(sql, { schema })

  return await next({ db })
})

/**
 * Authenticated procedures
 *
 * This middleware checks if the user is authenticated.
 */

const authMiddleware = j.middleware(async ({ c, next }) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })

  if (!session) {
    throw new HTTPException(401, {
      message: 'Unauthorized, sign in to continue.',
    })
  }
  return await next({ user: session.user })
})

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure.use(databaseMiddleware)

/**
 * Private (authenticated) procedures
 *
 * Private procedures are built on top of public procedures and include the `authMiddleware`.
 */
export const privateProcedure = publicProcedure.use(authMiddleware)
