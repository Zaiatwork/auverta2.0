# Assumptions

Decisions made at M0 (2026-11-14). Change one here and the matching code, not just the doc.

| # | Assumption | Source |
|---|-----------|--------|
| 1 | Hosting is Vercel, server-rendered. `output: 'export'` is removed; nonce CSP lives in `proxy.ts`; forms are route handlers. | Owner answer |
| 2 | The Blackout Rave site is replaced in place on branch `blackout-rave`. Snapshot commit `8468fb6` is the restore point. | Owner answer |
| 3 | Contact form validates, honeypots and rate-limits, then logs only. No email is sent until a provider is chosen; the adapter reads env keys. | Owner answer |
| 4 | `reference/prototype.html` is supplied by the owner. Design work (M1 onward) waits for it; M0 does not need it. | Owner answer |
| 5 | Fonts are Bricolage Grotesque 800 and Inter 400/500 through `next/font/google`, which self-hosts them at build. GHIGA and Grift files are removed. | CLAUDE.md |
| 6 | Rate limiting is in-memory per instance. Good enough to start; move to a shared store (Vercel KV / Upstash) before real traffic. | Ponytail shortcut |
| 7 | Turnstile is optional: active only when `TURNSTILE_SECRET_KEY` and the site key are set. | Brief |
| 8 | Old Hostinger artifacts (`public/api/*.php`, `php/`, `public/.htaccess`) and the Supabase/API code are deleted when the shell is replaced (M1). | Assumption 1 |
| 9 | Motion loads as islands on first user interaction (scroll, pointer, key, touch). Static HTML and CSS carry first paint; reduced motion never loads them. | Performance gate |
| 10 | The preloader is CSS-only, home page only, first visit only (cookie `auverta-seen`, 24 h). Auva wakes up in under 2 s and the overlay never blocks clicks. | Performance gate |
| 11 | Headlines were shortened to 6 words or fewer: "A roof for every size." (was "Whatever your size, we've got a roof for you."), "Your idea's ready. Your brand isn't.", "Be found. Be chosen.", "One brand. Everywhere.", "Scale has three levers.", "Two divisions. One team." | CLAUDE.md voice rule |
| 12 | Lime is only the primary button, once per screen. Prototype lime accents became Soft or Pink; Auva's mouth and glasses are Soft. The preloader and wipe bands keep a lime layer for under two seconds as part of the transition. | CLAUDE.md |
| 13 | Home content that is not final is flagged and listed in `content/PLACEHOLDERS.md`. FAQ answers, method timelines and social links are treated as owner-provided. | Owner answer |
| 14 | `ImageResponse` cannot read CSS variables, so the Open Graph image repeats the brand hex values as literals. | Next.js limit |
