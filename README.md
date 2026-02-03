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
- `DATABASE_URL`: URL Postgres (Neon/Supabase), mis. `postgresql://user:pass@host:5432/db?sslmode=require`. Dipakai oleh `prisma.config.ts` untuk migrate dan oleh app saat runtime.
- TikTok (optional for demo): `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_REDIRECT_URI`, `TIKTOK_SCOPES`.  
  If app is not approved yet, set `MOCK_TIKTOK=true` so the connect flow still runs (mock token).

### 2. Database

Project ini memakai **Postgres** (schema + `prisma.config.ts`). Set `DATABASE_URL` di `.env` ke connection string Postgres (Neon/Supabase).

```bash
# Generate Prisma client
npx prisma generate

# Buat tabel (migrate)
npx prisma migrate deploy

# Seed user demo: username `demo`, password `demo1234`
npm run db:seed
```

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### Yang diperlukan

1. **Akun**  
   - [Vercel](https://vercel.com) (login pakai GitHub).
   - **Database Postgres** (wajib): pakai [Neon](https://neon.tech) atau [Supabase](https://supabase.com) (free tier cukup). Dapatkan connection string (URI) dari dashboard.

2. **Env di Vercel**  
   Di project Vercel → Settings → Environment Variables, isi:

   | Variable | Nilai | Wajib |
   |----------|--------|--------|
   | `NEXTAUTH_URL` | `https://<domain-vercel-kamu>.vercel.app` (ganti setelah deploy jika pakai custom domain) | ✅ |
   | `NEXTAUTH_SECRET` | String acak (mis. `openssl rand -base64 32`) | ✅ |
   | `DATABASE_URL` | Connection string Postgres dari Neon/Supabase, contoh: `postgresql://user:pass@host/db?sslmode=require` | ✅ |
   | `TIKTOK_CLIENT_KEY` | Dari TikTok for Developers | Opsional |
   | `TIKTOK_CLIENT_SECRET` | Dari TikTok for Developers | Opsional |
   | `TIKTOK_REDIRECT_URI` | `https://<domain-vercel-kamu>.vercel.app/api/tiktok/callback` | Opsional |
   | `TIKTOK_SCOPES` | Mis. `user.info.basic,video.list` | Opsional |
   | `MOCK_TIKTOK` | `true` jika app belum approved (demo flow tetap jalan) | Opsional |

3. **Build**  
   - Build command: **`npm run build`** (sudah include `prisma generate`).  
   - Output: **Next.js** (default).  
   - Install command: **`npm install`** (default).

### Langkah deploy

1. **Push ke GitHub**  
   Repo ini harus ada di GitHub (bisa fork atau repo baru).

2. **Import di Vercel**  
   - [vercel.com/new](https://vercel.com/new) → Import Git Repository → pilih repo.  
   - Framework Preset: **Next.js** (terdeteksi otomatis).  
   - Tambahkan env vars di atas (bisa juga nanti di Settings).

3. **Deploy**  
   Klik Deploy. Build akan jalankan `prisma generate` lalu `next build`.  
   Setelah selesai, catat URL (mis. `https://tiktokapp-xxx.vercel.app`).

4. **Update NEXTAUTH_URL**  
   Kalau tadi pakai placeholder:  
   - Settings → Environment Variables → edit `NEXTAUTH_URL` = `https://tiktokapp-xxx.vercel.app`.  
   - Redeploy (Deployments → ⋮ → Redeploy) supaya cookie auth pakai URL yang benar.

5. **Database: migrate + seed (sekali saja)**  
   Di **local** (dengan `.env` yang isi `DATABASE_URL` = Postgres production):

   ```bash
   # Pastikan DATABASE_URL di .env mengarah ke Postgres production
   npx prisma migrate deploy
   npm run db:seed
   ```

   Atau jalankan migrate dari dashboard Neon/Supabase (SQL dari `prisma/migrations`) lalu seed lewat script/local.

6. **Cek**  
   Buka URL Vercel → daftar/login (demo: `demo` / `demo1234` setelah seed) → dashboard.  
   Pastikan HTTPS dan `NEXTAUTH_URL` sama dengan domain yang dipakai agar cookie session jalan.

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
