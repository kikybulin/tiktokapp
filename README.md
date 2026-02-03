# ClipDash

Sandbox web app for TikTok for Developers (app review). Fully developed-looking site with public pages, internal auth (username/password), and a dashboard that demos end-to-end account-linking flow.

## Tech stack

- **Framework:** Next.js 14 (App Router), TypeScript
- **UI:** TailwindCSS, shadcn/ui
- **Auth:** NextAuth with Credentials (username + password), bcrypt
- **DB:** Prisma — SQLite (dev), Postgres (production/Vercel)
- **Validation:** Zod; CSRF via NextAuth defaults

## Setup

### 1. Env

```bash
cp .env.example .env
```

Edit `.env`:

- `NEXTAUTH_URL`: dev `http://localhost:3000`; production your site URL (e.g. `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET`: random string (e.g. `openssl rand -base64 32`)
- `DATABASE_URL`:  
  - **Dev (SQLite):** `file:./dev.db` (use schema as-is with `provider = "sqlite"`)  
  - **Production (Postgres):** Neon/Supabase URL, e.g. `postgresql://user:pass@host:5432/db?sslmode=require`  
  For Postgres you must switch Prisma to Postgres: in `prisma/schema.prisma` set `provider = "postgresql"` and run migrations (see below).
- TikTok (optional for demo): `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_REDIRECT_URI`, `TIKTOK_SCOPES`.  
  If app is not approved yet, set `MOCK_TIKTOK=true` so the connect flow still runs (mock token).

### 2. Database

```bash
# Generate Prisma client
npx prisma generate

# Dev (SQLite): create DB and tables
npx prisma db push

# Seed demo user: username `demo`, password `demo1234`
npm run db:seed
```

**Production (Postgres):**  
Change `prisma/schema.prisma` datasource to `provider = "postgresql"` and `url = env("DATABASE_URL")`, then:

```bash
npx prisma migrate deploy
npm run db:seed
```

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push repo to GitHub and import in Vercel.
2. **Environment variables** in Vercel:
   - `NEXTAUTH_URL` = `https://<your-vercel-domain>`
   - `NEXTAUTH_SECRET` = strong random secret
   - `DATABASE_URL` = your Postgres URL (Neon/Supabase free tier)
   - TikTok vars and `MOCK_TIKTOK` if needed
3. **Prisma (Postgres):** In `prisma/schema.prisma` set:
   - `provider = "postgresql"`
   - `url = env("DATABASE_URL")`
   Then run migrations (e.g. locally against prod DB or in a one-off script):
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```
4. Build: `npm run build` runs `prisma generate` then `next build`. No hardcoded domain; use `NEXTAUTH_URL` everywhere.

After deploy, ensure cookies work (HTTPS + correct `NEXTAUTH_URL`).

## Public pages

- `/` — Home (product + CTA; footer has Privacy & Terms links)
- `/features` — Features
- `/docs` — Docs + App Review Notes
- `/docs/scopes` — Scopes explanation
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- `/contact` — Contact form

## App flow

1. **Register** (`/register`) → username + password.
2. **Login** (`/login`) → credentials (internal only; no TikTok Login Kit).
3. **Dashboard** (`/dashboard`) → overview + “TikTok Integration Demo Flow” and link to connect.
4. **Connect account** (`/dashboard/tiktok`) → “Connect TikTok Account (Sandbox)” → OAuth redirect → callback (`/api/tiktok/callback`) → status “connected” and placeholder profile/videos (real after approval).

Demo user: **demo** / **demo1234** (after seed).
