import { neon }    from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { users }   from './schema'
import bcrypt      from 'bcryptjs'
import 'dotenv/config'

async function seed() {
  const sql  = neon(process.env.DATABASE_URL as string)
  const db   = drizzle(sql)
  const hash = await bcrypt.hash('Admin@TasForce2026', 12)

  await db.insert(users).values({
    firstName:      'Super',
    lastName:       'Admin',
    email:          'admin@tas-force.org',
    passwordHash:   hash,
    role:           'superadmin',
    status:         'active',
    membershipType: 'honorary',
    position:       'coordinator',
    memberId:       'TF-2026-0001',
    country:        'Ghana',
    emailVerified:  true,
    memberSince:    '2024',
  }).onConflictDoNothing()

  console.log('✅  Seeded: admin@tas-force.org / Admin@TasForce2026')
  process.exit(0)
}

seed().catch(e => { console.error(e); process.exit(1) })
