import { requireAdmin }  from '../../utils/auth'
import { useDb }         from '../../db'
import { users, activityLog } from '../../db/schema'
import { eq, count, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = useDb()

  const [total, active, pending, inactive, recent] = await Promise.all([
    db.select({ n: count() }).from(users),
    db.select({ n: count() }).from(users).where(eq(users.status, 'active')),
    db.select({ n: count() }).from(users).where(eq(users.status, 'pending')),
    db.select({ n: count() }).from(users).where(eq(users.status, 'inactive')),
    db.select({
      id: activityLog.id, action: activityLog.action,
      detail: activityLog.detail, createdAt: activityLog.createdAt,
      firstName: users.firstName, lastName: users.lastName,
    })
    .from(activityLog).leftJoin(users, eq(activityLog.userId, users.id))
    .orderBy(desc(activityLog.createdAt)).limit(8),
  ])

  return { total: total[0].n, active: active[0].n, pending: pending[0].n, inactive: inactive[0].n, recent }
})
