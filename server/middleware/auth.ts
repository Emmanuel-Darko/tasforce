import { verifyToken, getToken } from '../utils/auth'
import { useDb }   from '../db'
import { users }   from '../db/schema'
import { eq }      from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const token = getToken(event)
  if (!token) return
  const p = await verifyToken(token)
  if (!p)    return
  try {
    const db  = useDb()
    const row = await db.select().from(users).where(eq(users.id, p.id)).limit(1)
    if (row[0]) event.context.user = row[0]
  } catch {}
})
