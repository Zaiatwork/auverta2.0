@AGENTS.md

# Auverta website: project rules

## What this is
Multi-page marketing site for Auverta Studio, a full-service digital agency with two divisions: Brand & Web, and AI Content & Growth.
Promise: "One Studio. Zero Juggling." Method name: "The One-Roof Method".
Goal: Awwwards-level craft with professional consistency. This is NEVER a single-page site.

## Stack
Next.js App Router, TypeScript (strict), GSAP + ScrollTrigger via @gsap/react (useGSAP), Lenis, CSS variables for tokens,
next/font (self-hosted), next/image, MDX for Journal, zod for validation. Content lives in /content as typed data (CMS-ready).

## Brand tokens (single source: styles/tokens.css)
Violet #5a1cff (surface ~50%), Ink #0b0b12 (depth), Soft #f3efff (calm), Lime #c8ff00 (action/emphasis only, one lime element per screen),
Pink #ff3fa4 (small accent; use ink text on pink). Display: Bricolage Grotesque 800, tight tracking. Body: Inter 400/500.
Type scale 14/16/20/28/40/64 + fluid display. 12-col grid (4 on mobile), 8px spacing steps, 28px card radius, pill buttons.

## Motion rules
Two easings only (expo.out for entrances, expo.inOut for transitions); elastic reserved for Auva.
One signature effect per section, max two pinned sections per page, nothing may delay reading.
Every effect has a prefers-reduced-motion fallback. All ScrollTriggers are created in useGSAP and cleaned up on route change.
Lenis is a single instance. Call ScrollTrigger.refresh after route mount and fonts ready.

## Auva (mascot) rules
Allowed: preloader, hero, story, work hover, page transitions, CTA, 404. Static and calm on pricing, forms, legal.
Never covers content or buttons. Moods: happy default, wow news, wink tips, cool proof, sleep loading.

## Content rules
No invented clients, stats, testimonials, or prices. Anything unknown is a visible PLACEHOLDER and is listed in content/PLACEHOLDERS.md.
Voice: headlines <= 6 words, plain sentences, numbers over adjectives.
Do not copy any other studio's layout, flow, wording, or assets. References are for principles only.

## Quality gates (all must pass)
Typecheck, lint, build; every route returns 200 with no console errors; Lighthouse mobile on key routes: Performance >= 90, Accessibility >= 95,
Best Practices >= 95, SEO >= 95; LCP < 2.5s, CLS < 0.1; axe: zero serious/critical; npm audit --omit=dev: no high/critical;
no broken internal links; sitemap and robots valid; security headers present.

## Working style
Plan first, commit per milestone, log progress in docs/progress.md and assumptions in docs/assumptions.md.
Run `npm run verify` before claiming anything is done.
