import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool }    from 'pg'
import * as schema from './schema'

let _db: ReturnType<typeof drizzle> | null = null

export function useDb() {
  if (_db) return _db
  const config = useRuntimeConfig()

  const pool = new Pool({
    connectionString: config.databaseUrl,
    // Railway's internal network doesn't require SSL;
    // if connecting externally (e.g. local dev pointing at Railway),
    // set DATABASE_URL with ?sslmode=require in the URL itself.
    ssl: config.databaseUrl.includes('sslmode=require')
      ? { rejectUnauthorized: false }
      : false,
  })

  _db = drizzle(pool, { schema })
  return _db
}