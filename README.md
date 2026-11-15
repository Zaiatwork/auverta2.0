# Auverta Studio

Next.js (App Router) + Tailwind v4 + Framer Motion + React Three Fiber + Supabase.

## Run
```bash
npm install
cp .env.example .env.local   # fill in the Supabase values (optional for local UI work)
npm run dev
```
Without Supabase env the site runs on seed projects, and `/api/contact` and `/api/newsletter` answer 503.

## Database
`supabase/migrations/001_init.sql` creates `inquiries`, `projects` and `subscribers` with RLS (anon can only read `projects`). Review and run it in the Supabase SQL editor. Leads are written server-side with `SUPABASE_SERVICE_ROLE_KEY`, which must never be exposed to the browser.

## Notes
- Needs a Node host (API routes). It does not deploy as a static export or to PHP-only shared hosting.
- Rate limiting is in-memory per instance (`lib/rate-limit.ts`); use a shared store if you scale out.
- CSP lives in `next.config.ts`.
- Brand fonts (GHIGA, Grift) are not redistributed; place them in `app/fonts`.
