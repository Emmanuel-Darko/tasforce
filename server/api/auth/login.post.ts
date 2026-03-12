import { useDb }          from '../../db'
import { users }          from '../../db/schema'
import { verifyPassword, signToken } from '../../utils/auth'
import { eq }             from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  if (!email || !password)
    throw createError({ statusCode: 422, message: 'Email and password required.' })

  const db  = useDb()
  const row = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (!row[0]) throw createError({ statusCode: 401, message: 'Invalid email or password.' })

  const user = row[0]
  if (!(await verifyPassword(password, user.passwordHash)))
    throw createError({ statusCode: 401, message: 'Invalid email or password.' })

  if (user.status === 'pending')
    throw createError({ statusCode: 403, message: 'Your application is pending approval.' })
  if (user.status === 'inactive' || user.status === 'suspended')
    throw createError({ statusCode: 403, message: 'Your account has been deactivated.' })

  const token = await signToken({ id: user.id, email: user.email, role: user.role })
  setCookie(event, 'tf_token', token, {
    httpOnly: true, secure: true, sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, path: '/'
  })

  const { passwordHash: _, qrCode: __, barcode: ___, ...safe } = user
  return { success: true, token, user: safe }
})
