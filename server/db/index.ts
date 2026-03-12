import { drizzle } from 'drizzle-orm/neon-http'
import { neon }    from '@neondatabase/serverless'
import * as schema from './schema'

let _db: ReturnType<typeof drizzle> | null = null

export function useDb() {
  if (_db) return _db
  const config = useRuntimeConfig()
  const sql    = neon(config.databaseUrl)
  _db = drizzle(sql, { schema })
  return _db
}
