import { requireAdmin }     from '../../../../utils/auth'
import { useDb }            from '../../../../db'
import { users, activityLog } from '../../../../db/schema'
import { emailRejected }    from '../../../../utils/email'
import { eq }               from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const admin = await requireAdmin(event)
  const id    = parseInt(getRouterParam(event, 'id') || '0')
  const db    = useDb()
  const row   = await db.select().from(users).where(eq(users.id, id)).limit(1)
  if (!row[0])                     throw createError({ statusCode: 404, message: 'Not found' })
  if (row[0].status !== 'pending') throw createError({ statusCode: 400, message: 'Not pending' })

  await db.update(users).set({ status: 'inactive', updatedAt: new Date() }).where(eq(users.id, id))
  await db.insert(activityLog).values({ userId: id, actorId: admin.id, action: 'rejected' })
  emailRejected(row[0].email, `${row[0].firstName} ${row[0].lastName}`).catch(() => {})
  return { success: true }
})
