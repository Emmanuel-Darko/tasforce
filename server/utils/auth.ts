import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import type { H3Event } from 'h3'

export const hashPassword   = (p: string) => bcrypt.hash(p, 12)
export const verifyPassword = (p: string, h: string) => bcrypt.compare(p, h)

function secret() {
  return new TextEncoder().encode(useRuntimeConfig().jwtSecret)
}

export async function signToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret())
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret())
    return payload as { id: number; email: string; role: string }
  } catch { return null }
}

export function getToken(event: H3Event) {
  const c = getCookie(event, 'tf_token')
  if (c) return c
  const a = getHeader(event, 'authorization')
  return a?.startsWith('Bearer ') ? a.slice(7) : null
}

export async function requireAuth(event: H3Event) {
  const token = getToken(event)
  if (!token) throw createError({ statusCode: 401, message: 'Not authenticated' })
  const p = await verifyToken(token)
  if (!p)  throw createError({ statusCode: 401, message: 'Invalid or expired session' })
  return p
}

export async function requireAdmin(event: H3Event) {
  const u = await requireAuth(event)
  if (!['admin','superadmin'].includes(u.role))
    throw createError({ statusCode: 403, message: 'Admin access required' })
  return u
}
