import { useDb }  from '../../db'
import { users }  from '../../db/schema'
import { eq }     from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const memberId = getRouterParam(event, 'memberId')
  if (!memberId) throw createError({ statusCode: 400, message: 'Member ID required' })

  const db  = useDb()
  const row = await db.select({
    firstName: users.firstName, lastName: users.lastName,
    memberId:  users.memberId,  membershipType: users.membershipType,
    position:  users.position,  country: users.country,
    status:    users.status,    memberSince: users.memberSince,
    photoUrl:  users.photoUrl,  approvedAt:  users.approvedAt,
  }).from(users).where(eq(users.memberId, memberId)).limit(1)

  if (!row[0])                    return { valid: false, message: 'Member not found' }
  if (row[0].status !== 'active') return { valid: false, message: 'Membership is not active' }
  return { valid: true, member: row[0] }
})
