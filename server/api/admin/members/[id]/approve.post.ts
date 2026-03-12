import { requireAdmin }     from '../../../../utils/auth'
import { useDb }            from '../../../../db'
import { users, activityLog } from '../../../../db/schema'
import { generateMemberId } from '../../../../utils/memberId'
import { generateQR, generateBarcode } from '../../../../utils/card'
import { emailApproved }    from '../../../../utils/email'
import { eq }               from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const admin = await requireAdmin(event)
  const id    = parseInt(getRouterParam(event, 'id') || '0')
  const db    = useDb()

  const row = await db.select().from(users).where(eq(users.id, id)).limit(1)
  if (!row[0])
    throw createError({ statusCode: 404, message: 'Member not found' })
  if (row[0].status !== 'pending')
    throw createError({ statusCode: 400, message: 'Only pending members can be approved' })

  const cfg      = useRuntimeConfig()
  const memberId = await generateMemberId()
  const qrCode   = await generateQR(memberId, cfg.public.appUrl)
  const barcode  = await generateBarcode(memberId)
  const year     = new Date().getFullYear().toString()

  await db.update(users).set({
    status: 'active', memberId, qrCode, barcode,
    memberSince: year, cardIssuedAt: new Date(),
    approvedBy: admin.id, approvedAt: new Date(), updatedAt: new Date(),
  }).where(eq(users.id, id))

  await db.insert(activityLog).values({
    userId: id, actorId: admin.id,
    action: 'approved', detail: `Member ID ${memberId} issued`,
  })

  emailApproved(row[0].email, `${row[0].firstName} ${row[0].lastName}`, memberId).catch(() => {})
  return { success: true, memberId }
})
