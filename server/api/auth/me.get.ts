import { requireAuth } from '../../utils/auth'
import { useDb }       from '../../db'
import { users }       from '../../db/schema'
import { eq }          from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const auth = await requireAuth(event)
  const db   = useDb()
  const row  = await db.select().from(users).where(eq(users.id, auth.id)).limit(1)
  if (!row[0]) throw createError({ statusCode: 404, message: 'User not found' })
  const { passwordHash: _, ...safe } = row[0]
  return { user: safe }
})
