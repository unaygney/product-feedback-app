import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as relationsImport from './relations'
import * as schemaImport from './schema'

const schema = { ...schemaImport, ...relationsImport }

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined
}

const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL!)
if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn

export const db = drizzle(conn, { schema })
