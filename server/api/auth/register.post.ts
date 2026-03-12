import { z }          from 'zod'
import { useDb }      from '../../db'
import { users }      from '../../db/schema'
import { hashPassword } from '../../utils/auth'
import { emailRegistrationReceived } from '../../utils/email'
import { eq }         from 'drizzle-orm'

const schema = z.object({
  firstName:      z.string().min(2).max(100),
  lastName:       z.string().min(2).max(100),
  email:          z.string().email(),
  phone:          z.string().min(7).max(30),
  password:       z.string().min(8),
  membershipType: z.enum(['advocate','supporter','volunteer','honorary']).default('advocate'),
  position:       z.enum(['advocate','coordinator','volunteer','ambassador','supporter']).default('advocate'),
  country:        z.string().min(2).max(100),
  city:           z.string().optional(),
  gender:         z.string().optional(),
  dateOfBirth:    z.string().optional(),
  occupation:     z.string().optional(),
  motivation:     z.string().optional(),
  referredBy:     z.string().optional(),
  photoUrl:       z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const body   = await readBody(event)
  const parsed = schema.safeParse(body)
  if (!parsed.success)
    throw createError({ statusCode: 422, message: parsed.error.errors[0]?.message || 'Validation error' })

  const db = useDb()
  const { password, ...data } = parsed.data

  const exists = await db.select({ id: users.id }).from(users).where(eq(users.email, data.email)).limit(1)
  if (exists.length)
    throw createError({ statusCode: 409, message: 'An account with this email already exists.' })

  const [u] = await db.insert(users).values({
    ...data,
    passwordHash: await hashPassword(password),
    role:   'member',
    status: 'pending',
  }).returning({ id: users.id, firstName: users.firstName, email: users.email })

  emailRegistrationReceived(u.email, u.firstName).catch(() => {})
  return { success: true }
})
