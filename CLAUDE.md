@AGENTS.md

# Auverta 2.0

Marketing site for Auverta Studio. Redesign in progress, built section by section from Figma.

## Source of truth
- Figma file `Qh1zXpU1ROMGVd7lY0Llqi`, frame "Auverta Desktop" (node `3:2`). Ignore frame `10:1219` (another company's page).
- Read sizes, colours and text styles from the Figma MCP (load figma-design-to-code first). Never guess fonts.
- Status: hero + "Super Powers" (`components/ServicesTunnel.tsx`, 3D scroll cards, each a link to `/services/<slug>/`). The Figma sticky-stack bands (nodes 51:2779 to 51:2784) are NOT built. Other sections are added one at a time when the user asks.

## Stack
Next.js App Router, TypeScript strict, Tailwind v4, next/font/google. Light JS: no smooth-scroll library. framer-motion only for `ServicesTunnel` (its one pinned section); `MaskedHeading` (hero title) uses GSAP.

## Tokens
Only in `app/globals.css` `@theme`. Components use utilities (`bg-violet`, `text-night`), never raw hex.
Palette (Figma): violet #5a1cff, night #130d2a, logo-ink #1a0a4a, pink #ff3fa4, fog #efefef, lime #c8ff00, white base.
Fonts (Figma): Boldonse display, Inter UI. Host Grotesk appears in later sections, not loaded yet.
Licensed fonts (GHIGA, Grift) are not used and must never be committed to this public repo.

## Structure (keep every file small)
- One component per file. Sections in `components/<section>/`, shared pieces in `components/ui/`.
- Copy and links live in `content/`, not inside components.
- A change to one thing is a one-file edit. Do not search the whole project: use `graphify-out/` or a targeted grep in one folder.

## Motion
Only `FadeIn`, `Magnet`, the hero `MaskedHeading` reveal and the `ServicesTunnel` scroll cards. Each has a `prefers-reduced-motion` fallback. Animate transform and opacity only.

## Preview and checks
- Push to `main` builds the GitHub Pages preview (`.github/workflows/pages.yml`). Not deployed to Hostinger yet.
- Before saying done: `npm run typecheck`, `npm run lint`, `PAGES=1 npm run build`, screenshots at 390, 768 and 1440 next to the Figma screenshot.
- Placeholder content must be visibly marked. No invented clients, stats or prices.
