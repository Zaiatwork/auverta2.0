# Progress

Loop per milestone: build, `npm run verify`, four reviewers in parallel, fix blockers and majors, re-run. Max 5 iterations.

| Milestone | Status |
|-----------|--------|
| M0 plan, scaffold, tokens, verify scripts, agents | Done |
| M1 shell: nav, footer, transitions, preloader, cursor, Auva, providers | Done |
| M2 Home | Built. **One gate open: Lighthouse performance and LCP** (see below). Waiting for owner review of screenshots. |
| M3 Work + case template | Not started |
| M4 Services + segment pages | Not started |
| M5 Pricing, Method, Studio, FAQ, Contact, legal, 404 | Not started |
| M6 Journal (MDX, two flagged drafts) | Not started |
| M7 SEO pass (JSON-LD, per-route OG images) | Not started |
| M8 Security pass (proxy.ts nonce CSP) | Not started |
| M9 Performance, accessibility, mobile polish | Not started |
| M10 Final review + deploy checklist | Not started |

## M2 gate results (final run)

| Gate | Result |
|------|--------|
| Typecheck, lint, build | Pass |
| Routes 200 / console errors / axe serious+critical / internal links | Pass (24 routes, 24 links, 0 errors) |
| Lighthouse accessibility, best practices, SEO (mobile, 5 key routes) | Pass (>= 0.95 each) |
| Lighthouse CLS | Pass |
| `npm audit --omit=dev` | Pass (0 vulnerabilities after `npm audit fix`; `source-map-js` was high) |
| Horizontal overflow 320 to 1920 px | 0 px |
| 11 route changes: heap, pin spacers, wipe, console | Flat 10 MB, 2 spacers on home and 0 elsewhere, wipe never stuck, 0 errors |
| **Lighthouse performance >= 0.9 and LCP <= 2.5 s** | **Fail locally**: home 0.67 / LCP 3.3 s, other routes 0.76-0.80 / LCP ~3.1 s |

### Why the performance gate is open
- This host measures a Lighthouse CPU benchmark of about 540-670 (very low) with ~1.8 GB RAM free.
- Same machine, same Next and React versions: a plain HTML page scores 0.97; a stock Next.js "hello world" scores **0.77 (TBT 1,108 ms)**. Our stub pages score 0.76-0.80, so they are not worse than stock Next here.
- Observed (real) LCP on stub pages is about 0.9-1.0 s; the 3.1 s figure is Lighthouse's simulated value.
- Home is the outlier (0.67). Its extra cost is not yet isolated; M9 owns that investigation.
- Nothing was loosened. Re-measure on Vercel or CI before treating it as a regression either way.

### What was done to protect performance
Motion code (GSAP, ScrollTrigger, Draggable, Lenis, cursor, wipe) loads as islands on first user interaction; the preloader, hero entrance, marquee, hover effects and speech bubble are CSS-only; links prefetch on hover instead of on load.

## M2 reviewer findings and disposition

Reviewers: design-critic, seo-auditor, security-reviewer and qa-perf. All four hit host process-limit errors (`fork: Resource temporarily unavailable`) because they ran at the same time, so they produced static reviews and no measurements. The lead re-ran every check serially (audit, git history scan, live HTML, screenshots, leak test).

| Reviewer | Finding | Disposition |
|----------|---------|-------------|
| design | Hero pill scrolls before pins exist (major) | Fixed: `lib/island.ts`, `ScrollTrigger.refresh()` in HomeEffects |
| design | Stickers over closing headline (major) | Fixed: stickers below headline, 3 on small screens |
| design | Auva can overlap content on mobile (major) | Fixed: Auva is in flow under 720 px |
| design | Hard-coded colors, third easing, signature-effect stacking, touch states, eyebrow/heading repeats, preloader length, WorkList aria | Fixed (tokens, `--ease-transition` on loops, skew only on Paths, focus/click on path cards, path-specific button labels, 0.95 s preloader that never blocks clicks) |
| design | Off-scale sizes (padding, min-heights) | Partly fixed (`--text-12`); the rest is deferred to M9 |
| seo | No canonical or page-level OG on home (major) | Fixed |
| seo | No OG/Twitter image (major) | Fixed: `app/opengraph-image.tsx`, `app/twitter-image.tsx`, explicit in `lib/seo.ts` |
| seo | Services missing from nav, `lastModified`, duplicate case title | Fixed |
| seo | Stub pages indexable | Accepted until M3-M6; site not public yet |
| security | No blockers; minors | Fixed: `Secure` cookie flag, `.lighthouseci` ignored, `.env.example` added; M5/M8 items stay scheduled |
| qa-perf | Could not run | Re-run by lead (table above) |

## Open questions for the owner
1. Public contact email (currently a flagged placeholder, `hello@auverta.studio`).
2. Whether the open performance gate should be re-measured on Vercel/CI before continuing to M3.
3. `public/images/founders/*.jpg`: real people, confirm they agreed to publication.
