import { useDb }  from '../db'
import { users }  from '../db/schema'
import { like, desc } from 'drizzle-orm'

export async function generateMemberId() {
  const db   = useDb()
  const year = new Date().getFullYear()
  const pre  = `TF-${year}-`
  const last = await db.select({ m: users.memberId }).from(users)
    .where(like(users.memberId, `${pre}%`))
    .orderBy(desc(users.memberId)).limit(1)
  let seq = 1000
  if (last[0]?.m) seq = parseInt(last[0].m.split('-')[2] ?? '1000') + 1
  return `${pre}${seq.toString().padStart(4,'0')}`
}
