import { requireAdmin } from '../../../utils/auth'
import { useDb }        from '../../../db'
import { users }        from '../../../db/schema'
import { eq, ilike, or, and, desc, count } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const q      = getQuery(event)
  const page   = Math.max(1, parseInt(q.page as string || '1'))
  const limit  = Math.min(100, parseInt(q.limit as string || '20'))
  const offset = (page - 1) * limit
  const status = q.status as string | undefined
  const search = q.search as string | undefined

  const db    = useDb()
  const conds = []
  if (status) conds.push(eq(users.status, status as any))
  if (search) conds.push(or(
    ilike(users.firstName, `%${search}%`),
    ilike(users.lastName,  `%${search}%`),
    ilike(users.email,     `%${search}%`),
    ilike(users.memberId,  `%${search}%`),
  )!)

  const where = conds.length
    ? conds.reduce((a, b) => and(a, b)!)
    : undefined

  const [rows, [{ total }]] = await Promise.all([
    db.select({
      id: users.id, firstName: users.firstName, lastName: users.lastName,
      email: users.email, phone: users.phone, memberId: users.memberId,
      membershipType: users.membershipType, position: users.position,
      country: users.country, city: users.city, photoUrl: users.photoUrl,
      status: users.status, createdAt: users.createdAt, approvedAt: users.approvedAt,
      memberSince: users.memberSince, cardIssuedAt: users.cardIssuedAt,
      qrCode: users.qrCode, barcode: users.barcode,
    }).from(users).where(where).orderBy(desc(users.createdAt)).limit(limit).offset(offset),
    db.select({ total: count() }).from(users).where(where),
  ])

  return { data: rows, total, page, limit, pages: Math.ceil(total / limit) }
})
