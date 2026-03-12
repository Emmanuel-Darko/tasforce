# TAS-FORCE Member Platform

**Truth and Advocacy for Serwah & Women Empowerment**

A full-stack Nuxt 4 membership platform with:
- Public website (Home, About, Campaigns, News, Contact)
- Member registration with 3-step form
- Admin approval workflow
- Auto-generated digital membership card (front + back with QR + barcode)
- Public QR verification portal at `/verify/:memberId`

---

## Tech Stack

| Layer      | Tech                              |
|------------|-----------------------------------|
| Framework  | Nuxt 4 (Vue 3 + Vite)             |
| Database   | Neon (PostgreSQL serverless)      |
| ORM        | Drizzle ORM                       |
| Auth       | JWT (jose) + bcryptjs             |
| QR Code    | qrcode (server-side)              |
| Barcode    | bwip-js (server-side)             |
| Email      | Resend API                        |
| Hosting    | Vercel                            |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env — fill in DATABASE_URL and JWT_SECRET at minimum

# 3. Push schema to database
npm run db:push

# 4. Seed admin account
npm run db:seed

# 5. Run development server
npm run dev
# → http://localhost:3000
```

**Admin login:** `admin@tas-force.org` / `Admin@TasForce2026`

---

## Database Setup (Neon — Free Tier)

1. Go to **https://console.neon.tech** → Sign Up (free, no credit card needed)
2. Click **New Project** → name it `tasforce` → choose region → **Create Project**
3. Copy the **Connection string** from Connection Details
4. Paste it as `DATABASE_URL` in your `.env` file
5. Run `npm run db:push` to create all tables
6. Run `npm run db:seed` to create the admin account
7. Optional: `npm run db:studio` for visual database browser

---

## Environment Variables

```bash
APP_URL=http://localhost:3000
JWT_SECRET=                    # openssl rand -base64 32

# Neon PostgreSQL
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require

# Resend (optional — email notifications)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@tas-force.org

# Cloudinary (optional — member photo uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Deploying to Vercel

```bash
npm i -g vercel
vercel login
vercel

# Add env vars in Vercel dashboard:
# Project → Settings → Environment Variables
# Add: DATABASE_URL, JWT_SECRET, RESEND_API_KEY, EMAIL_FROM, APP_URL

vercel --prod
```

---

## Project Structure

```
tasforce-platform/
├── server/
│   ├── db/
│   │   ├── schema.ts          # Database schema (users, activityLog)
│   │   ├── index.ts           # Drizzle + Neon connection
│   │   └── seed.ts            # Admin account seeder
│   ├── middleware/
│   │   └── auth.ts            # JWT → event.context.user
│   ├── utils/
│   │   ├── auth.ts            # JWT, password hashing, requireAuth/Admin
│   │   ├── memberId.ts        # TF-YYYY-XXXX generator
│   │   ├── card.ts            # QR code + barcode generation
│   │   └── email.ts           # Resend email templates
│   └── api/
│       ├── auth/              # register, login, logout, me
│       ├── admin/
│       │   ├── stats.get.ts
│       │   └── members/
│       │       ├── index.get.ts
│       │       └── [id]/
│       │           ├── approve.post.ts
│       │           └── reject.post.ts
│       └── verify/
│           └── [memberId].get.ts
└── app/
    ├── assets/css/main.css    # All global styles
    ├── composables/
    │   └── useAuth.ts
    ├── plugins/auth.ts
    ├── middleware/
    │   ├── auth.ts, admin.ts, guest.ts
    ├── layouts/
    │   ├── default.vue        # Public header + footer
    │   ├── dashboard.vue      # Sidebar layout
    │   └── auth.vue           # Split brand + form
    ├── components/
    │   └── MembershipCard.vue # Card front + back with QR/barcode
    └── pages/
        ├── index.vue          # Homepage
        ├── about.vue          # About TAS-FORCE
        ├── campaigns.vue
        ├── get-involved.vue
        ├── news.vue
        ├── contact.vue
        ├── donate.vue
        ├── auth/
        │   ├── login.vue
        │   ├── register.vue   # 3-step registration
        │   └── register/success.vue
        ├── dashboard/
        │   ├── index.vue      # Member portal
        │   └── card.vue       # Digital card view
        ├── admin/
        │   ├── index.vue      # Dashboard overview
        │   ├── registrations.vue  # Approve/reject applications
        │   ├── members.vue
        │   ├── cards.vue
        │   ├── reports.vue
        │   └── settings.vue
        └── verify/
            └── [memberId].vue  # Public verification page
```

---

## Membership Card

When an admin approves a member:
1. A unique Member ID is generated: `TF-2026-XXXX`
2. A QR code is generated linking to `/verify/:memberId`
3. A Code 128 barcode is generated with the Member ID
4. An approval email is sent to the member
5. The digital card (front + back) is available in `/dashboard/card`

The verification page at `/verify/:memberId` is publicly accessible — anyone can scan the QR code to confirm membership validity.

---

## Design

- **Brand colours:** Deep Crimson `#6B0F1A`, Gold `#C9A84C`, Cream `#F5E6D0`
- **Typography:** Playfair Display (headings) + Crimson Pro (body)
- **Card design:** Burgundy textured background, gold accents, diagonal "MEMBER" ribbon

---

*TAS-FORCE — Truth and Advocacy for Serwah & Women Empowerment*
