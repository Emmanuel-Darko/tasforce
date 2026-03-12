import {
  pgTable, serial, text, timestamp, boolean,
  pgEnum, varchar, integer, index
} from 'drizzle-orm/pg-core'

export const roleEnum           = pgEnum('role',            ['member','admin','superadmin'])
export const memberStatusEnum   = pgEnum('member_status',   ['pending','active','inactive','suspended'])
export const membershipTypeEnum = pgEnum('membership_type', ['advocate','supporter','volunteer','honorary'])
export const positionEnum       = pgEnum('position',        ['advocate','coordinator','volunteer','ambassador','supporter'])

export const users = pgTable('users', {
  id:             serial('id').primaryKey(),
  firstName:      varchar('first_name',   { length: 100 }).notNull(),
  lastName:       varchar('last_name',    { length: 100 }).notNull(),
  email:          varchar('email',        { length: 255 }).notNull().unique(),
  phone:          varchar('phone',        { length: 30  }),
  passwordHash:   text('password_hash').notNull(),
  role:           roleEnum('role').notNull().default('member'),
  status:         memberStatusEnum('member_status').notNull().default('pending'),
  membershipType: membershipTypeEnum('membership_type').notNull().default('advocate'),
  position:       positionEnum('position').notNull().default('advocate'),
  memberId:       varchar('member_id',    { length: 30 }).unique(),
  country:        varchar('country',      { length: 100 }),
  city:           varchar('city',         { length: 100 }),
  photoUrl:       text('photo_url'),
  qrCode:         text('qr_code'),
  barcode:        text('barcode'),
  cardIssuedAt:   timestamp('card_issued_at'),
  bio:            text('bio'),
  gender:         varchar('gender',       { length: 20 }),
  dateOfBirth:    varchar('date_of_birth',{ length: 20 }),
  occupation:     varchar('occupation',   { length: 150 }),
  referredBy:     varchar('referred_by',  { length: 30 }),
  motivation:     text('motivation'),
  emailVerified:  boolean('email_verified').notNull().default(false),
  approvedBy:     integer('approved_by'),
  approvedAt:     timestamp('approved_at'),
  memberSince:    varchar('member_since', { length: 10 }),
  createdAt:      timestamp('created_at').notNull().defaultNow(),
  updatedAt:      timestamp('updated_at').notNull().defaultNow(),
}, t => [
  index('users_email_idx').on(t.email),
  index('users_status_idx').on(t.status),
  index('users_member_id_idx').on(t.memberId),
])

export const activityLog = pgTable('activity_log', {
  id:        serial('id').primaryKey(),
  userId:    integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  actorId:   integer('actor_id').references(() => users.id, { onDelete: 'set null' }),
  action:    varchar('action',  { length: 100 }).notNull(),
  detail:    text('detail'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type User    = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
