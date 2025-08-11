# Dexiet (dexiet.com)

AI-enhanced expired domain searcher and analyzer. Built with Next.js 14, Prisma (SQLite), NextAuth, Stripe, Tailwind v4.

## Features
- Auth (GitHub, email magic links) with Prisma adapter
- Subscription billing (Stripe Checkout + Billing Portal), protected routes
- Domains pipeline: scraping providers, analysis, storage, search API
- Alerts: user-defined filters, email notifications on new matches
- AI summaries: optional OpenAI summaries for domains
- Responsive UI with Navbar, Footer, dark mode toggle

## Setup
1. Clone and enter project, then install:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill values:
   - NEXTAUTH_URL, NEXTAUTH_SECRET
   - EMAIL_SERVER, EMAIL_FROM
   - STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID_BASIC
   - CRON_SECRET (random secret for cron auth)
   - Optional: OPENAI_API_KEY
   - Optional sources:
     - DEXIET_SOURCES=expiredDomains
     - EXPIRED_DOMAINS_URL=https://example.com/expired.csv
3. Migrate and generate:
   ```bash
   npx prisma migrate dev
   ```
4. Seed admin user (optional):
   ```bash
   ADMIN_EMAIL=you@example.com npm run seed
   ```
5. Dev server:
   ```bash
   npm run dev
   ```

## Cron
- Trigger scraping:
  ```bash
  curl -X POST -H "x-cron-secret: $CRON_SECRET" http://localhost:3000/api/cron/scrape
  ```
- On Vercel, add a Cron Job to POST `/api/cron/scrape` with header `x-cron-secret`.

## Deployment (Vercel)
- Import project, set environment variables, add Vercel Cron
- Add Stripe webhook to `/api/webhooks/stripe`

## Notes
- Tailwind v4 via `@tailwindcss/postcss` and `@import 'tailwindcss'`
- Switch database to Postgres for production by updating `schema.prisma` and `DATABASE_URL`
