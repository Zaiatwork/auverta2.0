# Asset spec

Generated from `content/assets.ts` by `npm run assets`. Do not edit by hand: change the registry and regenerate.
**93 slots** in 9 groups.

## How it works

- Every image or video on the site is a numbered **slot** with an ID, a size and a path. Until a file exists, the live preview shows a labeled box with that ID, size and format.
- To fill a slot, export your file with the **exact file name** below (one of the listed extensions) and put it at the **exact path** under `public/`. The next build shows it automatically. No code changes.
- Sizes are the **delivery size** (the @2x size for raster). The site serves smaller versions itself, so do not export a separate @1x.
- A real file always fills the slot's shape. Keep key content inside the central 80% (some slots are cropped to cover on small screens).

## Rules for every file

- **No text baked into images.** Headlines and labels are live text over the image. Keep the text-overlay areas named in the notes calm.
- sRGB colour. WebP (or AVIF) for raster, SVG for logos. PNG only where the table allows it or transparency is needed.
- **Auva stays on a transparent background**, never on a flat colour box. No cast shadow baked in.
- Each file must be at or under its **max file size**. Compress before delivery.
- Logos are single-colour SVG with outlined text and a tight viewBox. Only use a client's logo with their permission.
- Fonts: the site uses Bricolage Grotesque and Inter from Google Fonts. Any other typeface must come as a licensed `.woff2` with the licence.
- Only include people (team, clients) with their written consent.

## Performance budget

- **Total weight of the images the home page loads must stay at or under 1200 KB** for a first view plus scrolling to the end, with below-the-fold images loaded lazily.
- Counted: the three Auva poses on the page (hero, story, closing), the six proof logos, and the four "One idea. Every format." images of the default audience. If all of those shipped at their maximum size the total would be **1170 KB** (13 slots), so the slot maxima already fit the budget. Do not go over a slot's maximum.
- Not counted because they load on demand: the work hover cards, the other two audiences (loaded on click) and all videos.

## Auva (9)

| Slot ID | Where it appears | Purpose | Count | Ratio | Size to deliver | Shown at (@1x) | Format | Max size | Transparent | File name and path | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `AUVA-HAPPY` | Hero, story, closing screen (default mood) | Auva, happy mood | 1 | 1:1 | 2000×2000 | 1000×1000 | WebP or PNG, transparent | 150 KB | Yes | `public/assets/auva/happy.webp` (also accepted: .avif, .png, .jpg) | Square 2000px canvas, Auva centred with 8% padding, transparent background, no cast shadow baked in. An SVG version is welcome but optional. |
| `AUVA-WOW` | Preloader, speech bubble, work peek, wipe | Auva, wow mood | 1 | 1:1 | 2000×2000 | 1000×1000 | WebP or PNG, transparent | 150 KB | Yes | `public/assets/auva/wow.webp` (also accepted: .avif, .png, .jpg) | Square 2000px canvas, Auva centred with 8% padding, transparent background, no cast shadow baked in. An SVG version is welcome but optional. |
| `AUVA-WINK` | One idea: social post mock | Auva, wink mood | 1 | 1:1 | 2000×2000 | 1000×1000 | WebP or PNG, transparent | 150 KB | Yes | `public/assets/auva/wink.webp` (also accepted: .avif, .png, .jpg) | Square 2000px canvas, Auva centred with 8% padding, transparent background, no cast shadow baked in. An SVG version is welcome but optional. |
| `AUVA-COOL` | Closing screen, one idea: banner | Auva, cool mood | 1 | 1:1 | 2000×2000 | 1000×1000 | WebP or PNG, transparent | 150 KB | Yes | `public/assets/auva/cool.webp` (also accepted: .avif, .png, .jpg) | Square 2000px canvas, Auva centred with 8% padding, transparent background, no cast shadow baked in. An SVG version is welcome but optional. |
| `AUVA-SLEEP` | Preloader (asleep), 404 | Auva, sleep mood | 1 | 1:1 | 2000×2000 | 1000×1000 | WebP or PNG, transparent | 150 KB | Yes | `public/assets/auva/sleep.webp` (also accepted: .avif, .png, .jpg) | Square 2000px canvas, Auva centred with 8% padding, transparent background, no cast shadow baked in. An SVG version is welcome but optional. |
| `AUVA-HERO` | Home, hero | Hero pose (larger gesture than the happy mood) | 1 | 1:1 | 2000×2000 | 1000×1000 | WebP or PNG, transparent | 150 KB | Yes | `public/assets/auva/hero.webp` (also accepted: .avif, .png, .jpg) | Keep the right 35% of the canvas free of detail: the hero headline sits to the left. |
| `AUVA-404` | 404 page | Lost pose | 1 | 1:1 | 2000×2000 | 1000×1000 | WebP or PNG, transparent | 150 KB | Yes | `public/assets/auva/404.webp` (also accepted: .avif, .png, .jpg) | Calm, a little confused. Never alarming. |
| `AUVA-LOOP-BLINK` | Home, hero (optional replacement for the still) | Optional alpha loop: a short blink loop | 1 file | 1:1 | 800×800 (video) | — | WebM with alpha (VP9) | 1 MB | Yes | `public/assets/auva/loop-blink.webm` | Optional. 1 to 2 seconds, seamless loop, 24 fps. Provide the matching still for the first frame. |
| `AUVA-LOOP-WAVE` | Home, hero (optional replacement for the still) | Optional alpha loop: a short wave loop | 1 file | 1:1 | 800×800 (video) | — | WebM with alpha (VP9) | 1 MB | Yes | `public/assets/auva/loop-wave.webm` | Optional. 1 to 2 seconds, seamless loop, 24 fps. Provide the matching still for the first frame. |

## Brand (8)

| Slot ID | Where it appears | Purpose | Count | Ratio | Size to deliver | Shown at (@1x) | Format | Max size | Transparent | File name and path | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `BRAND-LOGO-MARK-LIGHT` | Navigation, footer, preloader | Logo mark, for light text on dark backgrounds | 1 | 1:1 | 256×256 | — | SVG | 20 KB | Yes | `public/assets/brand/logo-mark-light.svg` | Outlined shapes (no live fonts), one colour, tight viewBox with no padding. |
| `BRAND-LOGO-MARK-DARK` | Navigation, footer, preloader | Logo mark, for dark text on light backgrounds | 1 | 1:1 | 256×256 | — | SVG | 20 KB | Yes | `public/assets/brand/logo-mark-dark.svg` | Outlined shapes (no live fonts), one colour, tight viewBox with no padding. |
| `BRAND-WORDMARK-LIGHT` | Navigation, footer, preloader | Wordmark, for light text on dark backgrounds | 1 | ≈5.33:1 | 1534×288 | — | SVG | 20 KB | Yes | `public/assets/brand/wordmark-light.svg` | Outlined shapes (no live fonts), one colour, tight viewBox with no padding. |
| `BRAND-WORDMARK-DARK` | Navigation, footer, preloader | Wordmark, for dark text on light backgrounds | 1 | ≈5.33:1 | 1534×288 | — | SVG | 20 KB | Yes | `public/assets/brand/wordmark-dark.svg` | Outlined shapes (no live fonts), one colour, tight viewBox with no padding. |
| `BRAND-FAVICON-32` | Browser tab, home-screen icon, PWA | Favicon 32px | 1 | 1:1 | 32×32 | — | PNG | 15 KB | No | `public/assets/brand/favicon-32.png` | Keep the mark readable at 16px. |
| `BRAND-FAVICON-180` | Browser tab, home-screen icon, PWA | Favicon 180px | 1 | 1:1 | 180×180 | — | PNG | 15 KB | No | `public/assets/brand/favicon-180.png` | Apple touch icon: full-bleed square, no transparency. |
| `BRAND-FAVICON-512` | Browser tab, home-screen icon, PWA | Favicon 512px | 1 | 1:1 | 512×512 | — | PNG | 40 KB | No | `public/assets/brand/favicon-512.png` | Keep the mark readable at 16px. |
| `BRAND-OG-DEFAULT` | Link previews for pages without their own image | Default Open Graph / Twitter image | 1 | ≈1.90:1 | 1200×630 | 600×315 | PNG or JPG | 300 KB | No | `public/assets/brand/og-default.png` (also accepted: .jpg) | Keep key content inside the central 1000x500. No text baked into the image. (The site adds none; if you want the promise on the image, tell us and we will overlay it as live text.) |

## Work (40)

| Slot ID | Where it appears | Purpose | Count | Ratio | Size to deliver | Shown at (@1x) | Format | Max size | Transparent | File name and path | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `WORK-NANO-BANANA-COVER` | /work (project card), related work on service pages | Cover for "Nano Banana 2.1 vs Pro" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/nano-banana/cover.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. Subject centred. No text baked into the image. |
| `WORK-NANO-BANANA-HERO` | /work/nano-banana (hero) | Hero image for "Nano Banana 2.1 vs Pro" | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/nano-banana/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9. The title sits over the lower left: keep that area calm. No text baked into the image. |
| `WORK-NANO-BANANA-GALLERY-1` | /work/nano-banana (gallery) | Gallery image 1 for "Nano Banana 2.1 vs Pro" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/nano-banana/gallery-1.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-NANO-BANANA-GALLERY-2` | /work/nano-banana (gallery) | Gallery image 2 for "Nano Banana 2.1 vs Pro" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/nano-banana/gallery-2.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-NANO-BANANA-GALLERY-3` | /work/nano-banana (gallery) | Gallery image 3 for "Nano Banana 2.1 vs Pro" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/nano-banana/gallery-3.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-NANO-BANANA-PEEK` | / (selected work, hover peek card) | Peek-card image for "Nano Banana 2.1 vs Pro" | 1 | 4:5 | 800×1000 | 400×500 | WebP | 120 KB | No | `public/assets/work/nano-banana/peek.webp` (also accepted: .avif, .png, .jpg) | 4:5. Shown at about 300px wide on a tinted card with the project tags top-left and the title bottom-left as live text over it, so keep those two corners calm. |
| `WORK-NANO-BANANA-VIDEO-POSTER` | /work/nano-banana (video poster) | Poster frame for the "Nano Banana 2.1 vs Pro" loop | 1 | 16:9 | 1920×1080 | 960×540 | WebP | 200 KB | No | `public/assets/work/nano-banana/video-poster.webp` (also accepted: .avif, .png, .jpg) | First frame of the video, so there is no jump on play. |
| `WORK-NANO-BANANA-VIDEO` | /work/nano-banana (video, optional) | Looping video for "Nano Banana 2.1 vs Pro" | 2 files | 16:9 | 1920×1080 (video) | — | MP4 (H.264) and WebM (VP9), both | 3 MB | No | `public/assets/work/nano-banana/video.mp4` + `public/assets/work/nano-banana/video.webm` | Muted, no audio track, 6 to 12 seconds, seamless loop, 24 or 30 fps. Optional per project. |
| `WORK-MEET-AUVA-COVER` | /work (project card), related work on service pages | Cover for "Meet Auva" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/meet-auva/cover.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. Subject centred. No text baked into the image. |
| `WORK-MEET-AUVA-HERO` | /work/meet-auva (hero) | Hero image for "Meet Auva" | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/meet-auva/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9. The title sits over the lower left: keep that area calm. No text baked into the image. |
| `WORK-MEET-AUVA-GALLERY-1` | /work/meet-auva (gallery) | Gallery image 1 for "Meet Auva" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/meet-auva/gallery-1.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-MEET-AUVA-GALLERY-2` | /work/meet-auva (gallery) | Gallery image 2 for "Meet Auva" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/meet-auva/gallery-2.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-MEET-AUVA-GALLERY-3` | /work/meet-auva (gallery) | Gallery image 3 for "Meet Auva" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/meet-auva/gallery-3.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-MEET-AUVA-PEEK` | / (selected work, hover peek card) | Peek-card image for "Meet Auva" | 1 | 4:5 | 800×1000 | 400×500 | WebP | 120 KB | No | `public/assets/work/meet-auva/peek.webp` (also accepted: .avif, .png, .jpg) | 4:5. Shown at about 300px wide on a tinted card with the project tags top-left and the title bottom-left as live text over it, so keep those two corners calm. |
| `WORK-MEET-AUVA-VIDEO-POSTER` | /work/meet-auva (video poster) | Poster frame for the "Meet Auva" loop | 1 | 16:9 | 1920×1080 | 960×540 | WebP | 200 KB | No | `public/assets/work/meet-auva/video-poster.webp` (also accepted: .avif, .png, .jpg) | First frame of the video, so there is no jump on play. |
| `WORK-MEET-AUVA-VIDEO` | /work/meet-auva (video, optional) | Looping video for "Meet Auva" | 2 files | 16:9 | 1920×1080 (video) | — | MP4 (H.264) and WebM (VP9), both | 3 MB | No | `public/assets/work/meet-auva/video.mp4` + `public/assets/work/meet-auva/video.webm` | Muted, no audio track, 6 to 12 seconds, seamless loop, 24 or 30 fps. Optional per project. |
| `WORK-ZERO-JUGGLING-COVER` | /work (project card), related work on service pages | Cover for "Zero Juggling" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/zero-juggling/cover.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. Subject centred. No text baked into the image. |
| `WORK-ZERO-JUGGLING-HERO` | /work/zero-juggling (hero) | Hero image for "Zero Juggling" | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/zero-juggling/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9. The title sits over the lower left: keep that area calm. No text baked into the image. |
| `WORK-ZERO-JUGGLING-GALLERY-1` | /work/zero-juggling (gallery) | Gallery image 1 for "Zero Juggling" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/zero-juggling/gallery-1.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-ZERO-JUGGLING-GALLERY-2` | /work/zero-juggling (gallery) | Gallery image 2 for "Zero Juggling" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/zero-juggling/gallery-2.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-ZERO-JUGGLING-GALLERY-3` | /work/zero-juggling (gallery) | Gallery image 3 for "Zero Juggling" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/zero-juggling/gallery-3.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-ZERO-JUGGLING-PEEK` | / (selected work, hover peek card) | Peek-card image for "Zero Juggling" | 1 | 4:5 | 800×1000 | 400×500 | WebP | 120 KB | No | `public/assets/work/zero-juggling/peek.webp` (also accepted: .avif, .png, .jpg) | 4:5. Shown at about 300px wide on a tinted card with the project tags top-left and the title bottom-left as live text over it, so keep those two corners calm. |
| `WORK-ZERO-JUGGLING-VIDEO-POSTER` | /work/zero-juggling (video poster) | Poster frame for the "Zero Juggling" loop | 1 | 16:9 | 1920×1080 | 960×540 | WebP | 200 KB | No | `public/assets/work/zero-juggling/video-poster.webp` (also accepted: .avif, .png, .jpg) | First frame of the video, so there is no jump on play. |
| `WORK-ZERO-JUGGLING-VIDEO` | /work/zero-juggling (video, optional) | Looping video for "Zero Juggling" | 2 files | 16:9 | 1920×1080 (video) | — | MP4 (H.264) and WebM (VP9), both | 3 MB | No | `public/assets/work/zero-juggling/video.mp4` + `public/assets/work/zero-juggling/video.webm` | Muted, no audio track, 6 to 12 seconds, seamless loop, 24 or 30 fps. Optional per project. |
| `WORK-EXECUTION-COVER` | /work (project card), related work on service pages | Cover for "Ideas Don't Go Viral" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/execution/cover.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. Subject centred. No text baked into the image. |
| `WORK-EXECUTION-HERO` | /work/execution (hero) | Hero image for "Ideas Don't Go Viral" | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/execution/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9. The title sits over the lower left: keep that area calm. No text baked into the image. |
| `WORK-EXECUTION-GALLERY-1` | /work/execution (gallery) | Gallery image 1 for "Ideas Don't Go Viral" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/execution/gallery-1.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-EXECUTION-GALLERY-2` | /work/execution (gallery) | Gallery image 2 for "Ideas Don't Go Viral" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/execution/gallery-2.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-EXECUTION-GALLERY-3` | /work/execution (gallery) | Gallery image 3 for "Ideas Don't Go Viral" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/execution/gallery-3.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-EXECUTION-PEEK` | / (selected work, hover peek card) | Peek-card image for "Ideas Don't Go Viral" | 1 | 4:5 | 800×1000 | 400×500 | WebP | 120 KB | No | `public/assets/work/execution/peek.webp` (also accepted: .avif, .png, .jpg) | 4:5. Shown at about 300px wide on a tinted card with the project tags top-left and the title bottom-left as live text over it, so keep those two corners calm. |
| `WORK-EXECUTION-VIDEO-POSTER` | /work/execution (video poster) | Poster frame for the "Ideas Don't Go Viral" loop | 1 | 16:9 | 1920×1080 | 960×540 | WebP | 200 KB | No | `public/assets/work/execution/video-poster.webp` (also accepted: .avif, .png, .jpg) | First frame of the video, so there is no jump on play. |
| `WORK-EXECUTION-VIDEO` | /work/execution (video, optional) | Looping video for "Ideas Don't Go Viral" | 2 files | 16:9 | 1920×1080 (video) | — | MP4 (H.264) and WebM (VP9), both | 3 MB | No | `public/assets/work/execution/video.mp4` + `public/assets/work/execution/video.webm` | Muted, no audio track, 6 to 12 seconds, seamless loop, 24 or 30 fps. Optional per project. |
| `WORK-FOUNDERS-COVER` | /work (project card), related work on service pages | Cover for "Quick Question for Founders" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/founders/cover.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. Subject centred. No text baked into the image. |
| `WORK-FOUNDERS-HERO` | /work/founders (hero) | Hero image for "Quick Question for Founders" | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/founders/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9. The title sits over the lower left: keep that area calm. No text baked into the image. |
| `WORK-FOUNDERS-GALLERY-1` | /work/founders (gallery) | Gallery image 1 for "Quick Question for Founders" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/founders/gallery-1.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-FOUNDERS-GALLERY-2` | /work/founders (gallery) | Gallery image 2 for "Quick Question for Founders" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/founders/gallery-2.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-FOUNDERS-GALLERY-3` | /work/founders (gallery) | Gallery image 3 for "Quick Question for Founders" | 1 | 4:5 | 1600×2000 | 800×1000 | WebP (AVIF welcome) | 250 KB | No | `public/assets/work/founders/gallery-3.webp` (also accepted: .avif, .png, .jpg) | 4:5 portrait. |
| `WORK-FOUNDERS-PEEK` | / (selected work, hover peek card) | Peek-card image for "Quick Question for Founders" | 1 | 4:5 | 800×1000 | 400×500 | WebP | 120 KB | No | `public/assets/work/founders/peek.webp` (also accepted: .avif, .png, .jpg) | 4:5. Shown at about 300px wide on a tinted card with the project tags top-left and the title bottom-left as live text over it, so keep those two corners calm. |
| `WORK-FOUNDERS-VIDEO-POSTER` | /work/founders (video poster) | Poster frame for the "Quick Question for Founders" loop | 1 | 16:9 | 1920×1080 | 960×540 | WebP | 200 KB | No | `public/assets/work/founders/video-poster.webp` (also accepted: .avif, .png, .jpg) | First frame of the video, so there is no jump on play. |
| `WORK-FOUNDERS-VIDEO` | /work/founders (video, optional) | Looping video for "Quick Question for Founders" | 2 files | 16:9 | 1920×1080 (video) | — | MP4 (H.264) and WebM (VP9), both | 3 MB | No | `public/assets/work/founders/video.mp4` + `public/assets/work/founders/video.webm` | Muted, no audio track, 6 to 12 seconds, seamless loop, 24 or 30 fps. Optional per project. |

## One idea. Every format. (15)

| Slot ID | Where it appears | Purpose | Count | Ratio | Size to deliver | Shown at (@1x) | Format | Max size | Transparent | File name and path | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `IDEA-STARTUP-WEB` | / (One idea. Every format.), "Startups & founders" tab | Website mock | 1 | 8:5 | 1600×1000 | 800×500 | WebP | 180 KB | No | `public/assets/idea/startup/web.webp` (also accepted: .avif, .png, .jpg) | 16:10. A browser-window mock of a generic brand for this audience. Same idea, palette and type as the other three formats. No text baked into the image. |
| `IDEA-STARTUP-POST` | / (One idea. Every format.), "Startups & founders" tab | Social post | 1 | 1:1 | 1080×1080 | 540×540 | WebP | 150 KB | No | `public/assets/idea/startup/post.webp` (also accepted: .avif, .png, .jpg) | 1:1. No text baked into the image. |
| `IDEA-STARTUP-REEL-POSTER` | / (One idea. Every format.), "Startups & founders" tab | Reel poster frame | 1 | 9:16 | 1080×1920 | 540×960 | WebP | 150 KB | No | `public/assets/idea/startup/reel-poster.webp` (also accepted: .avif, .png, .jpg) | 9:16. First frame of the reel. |
| `IDEA-STARTUP-REEL` | / (One idea. Every format.), "Startups & founders" tab | Short vertical video | 1 file | 9:16 | 1080×1920 (video) | — | MP4 (H.264) | 5 MB | No | `public/assets/idea/startup/reel.mp4` | 9:16, muted loop, 5 to 10 seconds. |
| `IDEA-STARTUP-BANNER` | / (One idea. Every format.), "Startups & founders" tab | Banner ad | 1 | ≈1.91:1 | 1200×628 | 600×314 | WebP | 120 KB | No | `public/assets/idea/startup/banner.webp` (also accepted: .avif, .png, .jpg) | About 1.91:1. No text baked into the image. |
| `IDEA-SMALL-WEB` | / (One idea. Every format.), "Small businesses" tab | Website mock | 1 | 8:5 | 1600×1000 | 800×500 | WebP | 180 KB | No | `public/assets/idea/small/web.webp` (also accepted: .avif, .png, .jpg) | 16:10. A browser-window mock of a generic brand for this audience. Same idea, palette and type as the other three formats. No text baked into the image. |
| `IDEA-SMALL-POST` | / (One idea. Every format.), "Small businesses" tab | Social post | 1 | 1:1 | 1080×1080 | 540×540 | WebP | 150 KB | No | `public/assets/idea/small/post.webp` (also accepted: .avif, .png, .jpg) | 1:1. No text baked into the image. |
| `IDEA-SMALL-REEL-POSTER` | / (One idea. Every format.), "Small businesses" tab | Reel poster frame | 1 | 9:16 | 1080×1920 | 540×960 | WebP | 150 KB | No | `public/assets/idea/small/reel-poster.webp` (also accepted: .avif, .png, .jpg) | 9:16. First frame of the reel. |
| `IDEA-SMALL-REEL` | / (One idea. Every format.), "Small businesses" tab | Short vertical video | 1 file | 9:16 | 1080×1920 (video) | — | MP4 (H.264) | 5 MB | No | `public/assets/idea/small/reel.mp4` | 9:16, muted loop, 5 to 10 seconds. |
| `IDEA-SMALL-BANNER` | / (One idea. Every format.), "Small businesses" tab | Banner ad | 1 | ≈1.91:1 | 1200×628 | 600×314 | WebP | 120 KB | No | `public/assets/idea/small/banner.webp` (also accepted: .avif, .png, .jpg) | About 1.91:1. No text baked into the image. |
| `IDEA-BRAND-WEB` | / (One idea. Every format.), "Established brands" tab | Website mock | 1 | 8:5 | 1600×1000 | 800×500 | WebP | 180 KB | No | `public/assets/idea/brand/web.webp` (also accepted: .avif, .png, .jpg) | 16:10. A browser-window mock of a generic brand for this audience. Same idea, palette and type as the other three formats. No text baked into the image. |
| `IDEA-BRAND-POST` | / (One idea. Every format.), "Established brands" tab | Social post | 1 | 1:1 | 1080×1080 | 540×540 | WebP | 150 KB | No | `public/assets/idea/brand/post.webp` (also accepted: .avif, .png, .jpg) | 1:1. No text baked into the image. |
| `IDEA-BRAND-REEL-POSTER` | / (One idea. Every format.), "Established brands" tab | Reel poster frame | 1 | 9:16 | 1080×1920 | 540×960 | WebP | 150 KB | No | `public/assets/idea/brand/reel-poster.webp` (also accepted: .avif, .png, .jpg) | 9:16. First frame of the reel. |
| `IDEA-BRAND-REEL` | / (One idea. Every format.), "Established brands" tab | Short vertical video | 1 file | 9:16 | 1080×1920 (video) | — | MP4 (H.264) | 5 MB | No | `public/assets/idea/brand/reel.mp4` | 9:16, muted loop, 5 to 10 seconds. |
| `IDEA-BRAND-BANNER` | / (One idea. Every format.), "Established brands" tab | Banner ad | 1 | ≈1.91:1 | 1200×628 | 600×314 | WebP | 120 KB | No | `public/assets/idea/brand/banner.webp` (also accepted: .avif, .png, .jpg) | About 1.91:1. No text baked into the image. |

## Services (5)

| Slot ID | Where it appears | Purpose | Count | Ratio | Size to deliver | Shown at (@1x) | Format | Max size | Transparent | File name and path | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `SERVICE-WEB-DESIGN-DEVELOPMENT-HERO` | /services (card) and /services/web-design-development (hero) | Hero for Web design & development | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/services/web-design-development/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9. The headline sits over the left third on the service page. No text baked into the image. |
| `SERVICE-BRANDING-IDENTITY-HERO` | /services (card) and /services/branding-identity (hero) | Hero for Branding & identity | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/services/branding-identity/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9. The headline sits over the left third on the service page. No text baked into the image. |
| `SERVICE-AI-CONTENT-HERO` | /services (card) and /services/ai-content (hero) | Hero for AI content | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/services/ai-content/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9. The headline sits over the left third on the service page. No text baked into the image. |
| `SERVICE-DIGITAL-MARKETING-HERO` | /services (card) and /services/digital-marketing (hero) | Hero for Digital marketing | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/services/digital-marketing/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9. The headline sits over the left third on the service page. No text baked into the image. |
| `SERVICE-GRAPHIC-DESIGN-VIDEO-HERO` | /services (card) and /services/graphic-design-video (hero) | Hero for Graphic design & video | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/services/graphic-design-video/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9. The headline sits over the left third on the service page. No text baked into the image. |

## Audience pages (3)

| Slot ID | Where it appears | Purpose | Count | Ratio | Size to deliver | Shown at (@1x) | Format | Max size | Transparent | File name and path | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `START-STARTUP-HERO` | /start/startups (hero) | Hero illustration for Startups & founders | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/start/startups/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9 illustration, same family as the Auva moods. No text baked into the image. |
| `START-SMALL-HERO` | /start/small-business (hero) | Hero illustration for Small businesses | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/start/small-business/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9 illustration, same family as the Auva moods. No text baked into the image. |
| `START-BRAND-HERO` | /start/established-brands (hero) | Hero illustration for Established brands | 1 | 16:9 | 2400×1350 | 1200×675 | WebP (AVIF welcome) | 250 KB | No | `public/assets/start/established-brands/hero.webp` (also accepted: .avif, .png, .jpg) | 16:9 illustration, same family as the Auva moods. No text baked into the image. |

## Studio (5)

| Slot ID | Where it appears | Purpose | Count | Ratio | Size to deliver | Shown at (@1x) | Format | Max size | Transparent | File name and path | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `STUDIO-TEAM-1` | /studio (team) | Team portrait 1 | 1 | 4:5 | 1200×1500 | 600×750 | WebP | 200 KB | No | `public/assets/studio/team-1.webp` (also accepted: .avif, .png, .jpg) | 4:5. Only with the person's written consent. Same lighting and crop for all portraits. |
| `STUDIO-TEAM-2` | /studio (team) | Team portrait 2 | 1 | 4:5 | 1200×1500 | 600×750 | WebP | 200 KB | No | `public/assets/studio/team-2.webp` (also accepted: .avif, .png, .jpg) | 4:5. Only with the person's written consent. Same lighting and crop for all portraits. |
| `STUDIO-TEAM-3` | /studio (team) | Team portrait 3 | 1 | 4:5 | 1200×1500 | 600×750 | WebP | 200 KB | No | `public/assets/studio/team-3.webp` (also accepted: .avif, .png, .jpg) | 4:5. Only with the person's written consent. Same lighting and crop for all portraits. |
| `STUDIO-TEAM-4` | /studio (team) | Team portrait 4 | 1 | 4:5 | 1200×1500 | 600×750 | WebP | 200 KB | No | `public/assets/studio/team-4.webp` (also accepted: .avif, .png, .jpg) | 4:5. Only with the person's written consent. Same lighting and crop for all portraits. |
| `STUDIO-ROOM` | /studio (studio shot) | Studio / workspace photo | 1 | 16:9 | 2400×1350 | 1200×675 | WebP | 250 KB | No | `public/assets/studio/room.webp` (also accepted: .avif, .png, .jpg) | 16:9. Only if it shows no client work or people without consent. |

## Journal (2)

| Slot ID | Where it appears | Purpose | Count | Ratio | Size to deliver | Shown at (@1x) | Format | Max size | Transparent | File name and path | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `JOURNAL-WHY-ONE-STUDIO-COVER` | /journal (card) and /journal/why-one-studio (cover) | Cover for "Why one studio beats five freelancers" | 1 | 16:9 | 1600×900 | 800×450 | WebP | 180 KB | No | `public/assets/journal/why-one-studio/cover.webp` (also accepted: .avif, .png, .jpg) | 16:9. No text baked into the image. |
| `JOURNAL-AI-WITH-A-HUMAN-COVER` | /journal (card) and /journal/ai-with-a-human (cover) | Cover for "AI content with a human in charge" | 1 | 16:9 | 1600×900 | 800×450 | WebP | 180 KB | No | `public/assets/journal/ai-with-a-human/cover.webp` (also accepted: .avif, .png, .jpg) | 16:9. No text baked into the image. |

## Proof (6)

| Slot ID | Where it appears | Purpose | Count | Ratio | Size to deliver | Shown at (@1x) | Format | Max size | Transparent | File name and path | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `PROOF-LOGO-1` | / (proof strip) | Client logo 1 (only with the client's permission) | 1 | 5:1 | 240×48 | — | SVG | 20 KB | Yes | `public/assets/proof/logo-1.svg` | Single colour (the site tints it), 48px tall, tight viewBox, outlined text. |
| `PROOF-LOGO-2` | / (proof strip) | Client logo 2 (only with the client's permission) | 1 | 5:1 | 240×48 | — | SVG | 20 KB | Yes | `public/assets/proof/logo-2.svg` | Single colour (the site tints it), 48px tall, tight viewBox, outlined text. |
| `PROOF-LOGO-3` | / (proof strip) | Client logo 3 (only with the client's permission) | 1 | 5:1 | 240×48 | — | SVG | 20 KB | Yes | `public/assets/proof/logo-3.svg` | Single colour (the site tints it), 48px tall, tight viewBox, outlined text. |
| `PROOF-LOGO-4` | / (proof strip) | Client logo 4 (only with the client's permission) | 1 | 5:1 | 240×48 | — | SVG | 20 KB | Yes | `public/assets/proof/logo-4.svg` | Single colour (the site tints it), 48px tall, tight viewBox, outlined text. |
| `PROOF-LOGO-5` | / (proof strip) | Client logo 5 (only with the client's permission) | 1 | 5:1 | 240×48 | — | SVG | 20 KB | Yes | `public/assets/proof/logo-5.svg` | Single colour (the site tints it), 48px tall, tight viewBox, outlined text. |
| `PROOF-LOGO-6` | / (proof strip) | Client logo 6 (only with the client's permission) | 1 | 5:1 | 240×48 | — | SVG | 20 KB | Yes | `public/assets/proof/logo-6.svg` | Single colour (the site tints it), 48px tall, tight viewBox, outlined text. |

## Index by slot ID

- `AUVA-HAPPY` · 2000×2000 · Auva
- `AUVA-WOW` · 2000×2000 · Auva
- `AUVA-WINK` · 2000×2000 · Auva
- `AUVA-COOL` · 2000×2000 · Auva
- `AUVA-SLEEP` · 2000×2000 · Auva
- `AUVA-HERO` · 2000×2000 · Auva
- `AUVA-404` · 2000×2000 · Auva
- `AUVA-LOOP-BLINK` · 800×800 · Auva
- `AUVA-LOOP-WAVE` · 800×800 · Auva
- `BRAND-LOGO-MARK-LIGHT` · 256×256 · Brand
- `BRAND-LOGO-MARK-DARK` · 256×256 · Brand
- `BRAND-WORDMARK-LIGHT` · 1534×288 · Brand
- `BRAND-WORDMARK-DARK` · 1534×288 · Brand
- `BRAND-FAVICON-32` · 32×32 · Brand
- `BRAND-FAVICON-180` · 180×180 · Brand
- `BRAND-FAVICON-512` · 512×512 · Brand
- `BRAND-OG-DEFAULT` · 1200×630 · Brand
- `WORK-NANO-BANANA-COVER` · 1600×2000 · Work
- `WORK-NANO-BANANA-HERO` · 2400×1350 · Work
- `WORK-NANO-BANANA-GALLERY-1` · 1600×2000 · Work
- `WORK-NANO-BANANA-GALLERY-2` · 1600×2000 · Work
- `WORK-NANO-BANANA-GALLERY-3` · 1600×2000 · Work
- `WORK-NANO-BANANA-PEEK` · 800×1000 · Work
- `WORK-NANO-BANANA-VIDEO-POSTER` · 1920×1080 · Work
- `WORK-NANO-BANANA-VIDEO` · 1920×1080 · Work
- `WORK-MEET-AUVA-COVER` · 1600×2000 · Work
- `WORK-MEET-AUVA-HERO` · 2400×1350 · Work
- `WORK-MEET-AUVA-GALLERY-1` · 1600×2000 · Work
- `WORK-MEET-AUVA-GALLERY-2` · 1600×2000 · Work
- `WORK-MEET-AUVA-GALLERY-3` · 1600×2000 · Work
- `WORK-MEET-AUVA-PEEK` · 800×1000 · Work
- `WORK-MEET-AUVA-VIDEO-POSTER` · 1920×1080 · Work
- `WORK-MEET-AUVA-VIDEO` · 1920×1080 · Work
- `WORK-ZERO-JUGGLING-COVER` · 1600×2000 · Work
- `WORK-ZERO-JUGGLING-HERO` · 2400×1350 · Work
- `WORK-ZERO-JUGGLING-GALLERY-1` · 1600×2000 · Work
- `WORK-ZERO-JUGGLING-GALLERY-2` · 1600×2000 · Work
- `WORK-ZERO-JUGGLING-GALLERY-3` · 1600×2000 · Work
- `WORK-ZERO-JUGGLING-PEEK` · 800×1000 · Work
- `WORK-ZERO-JUGGLING-VIDEO-POSTER` · 1920×1080 · Work
- `WORK-ZERO-JUGGLING-VIDEO` · 1920×1080 · Work
- `WORK-EXECUTION-COVER` · 1600×2000 · Work
- `WORK-EXECUTION-HERO` · 2400×1350 · Work
- `WORK-EXECUTION-GALLERY-1` · 1600×2000 · Work
- `WORK-EXECUTION-GALLERY-2` · 1600×2000 · Work
- `WORK-EXECUTION-GALLERY-3` · 1600×2000 · Work
- `WORK-EXECUTION-PEEK` · 800×1000 · Work
- `WORK-EXECUTION-VIDEO-POSTER` · 1920×1080 · Work
- `WORK-EXECUTION-VIDEO` · 1920×1080 · Work
- `WORK-FOUNDERS-COVER` · 1600×2000 · Work
- `WORK-FOUNDERS-HERO` · 2400×1350 · Work
- `WORK-FOUNDERS-GALLERY-1` · 1600×2000 · Work
- `WORK-FOUNDERS-GALLERY-2` · 1600×2000 · Work
- `WORK-FOUNDERS-GALLERY-3` · 1600×2000 · Work
- `WORK-FOUNDERS-PEEK` · 800×1000 · Work
- `WORK-FOUNDERS-VIDEO-POSTER` · 1920×1080 · Work
- `WORK-FOUNDERS-VIDEO` · 1920×1080 · Work
- `IDEA-STARTUP-WEB` · 1600×1000 · One idea. Every format.
- `IDEA-STARTUP-POST` · 1080×1080 · One idea. Every format.
- `IDEA-STARTUP-REEL-POSTER` · 1080×1920 · One idea. Every format.
- `IDEA-STARTUP-REEL` · 1080×1920 · One idea. Every format.
- `IDEA-STARTUP-BANNER` · 1200×628 · One idea. Every format.
- `IDEA-SMALL-WEB` · 1600×1000 · One idea. Every format.
- `IDEA-SMALL-POST` · 1080×1080 · One idea. Every format.
- `IDEA-SMALL-REEL-POSTER` · 1080×1920 · One idea. Every format.
- `IDEA-SMALL-REEL` · 1080×1920 · One idea. Every format.
- `IDEA-SMALL-BANNER` · 1200×628 · One idea. Every format.
- `IDEA-BRAND-WEB` · 1600×1000 · One idea. Every format.
- `IDEA-BRAND-POST` · 1080×1080 · One idea. Every format.
- `IDEA-BRAND-REEL-POSTER` · 1080×1920 · One idea. Every format.
- `IDEA-BRAND-REEL` · 1080×1920 · One idea. Every format.
- `IDEA-BRAND-BANNER` · 1200×628 · One idea. Every format.
- `SERVICE-WEB-DESIGN-DEVELOPMENT-HERO` · 2400×1350 · Services
- `SERVICE-BRANDING-IDENTITY-HERO` · 2400×1350 · Services
- `SERVICE-AI-CONTENT-HERO` · 2400×1350 · Services
- `SERVICE-DIGITAL-MARKETING-HERO` · 2400×1350 · Services
- `SERVICE-GRAPHIC-DESIGN-VIDEO-HERO` · 2400×1350 · Services
- `START-STARTUP-HERO` · 2400×1350 · Audience pages
- `START-SMALL-HERO` · 2400×1350 · Audience pages
- `START-BRAND-HERO` · 2400×1350 · Audience pages
- `STUDIO-TEAM-1` · 1200×1500 · Studio
- `STUDIO-TEAM-2` · 1200×1500 · Studio
- `STUDIO-TEAM-3` · 1200×1500 · Studio
- `STUDIO-TEAM-4` · 1200×1500 · Studio
- `STUDIO-ROOM` · 2400×1350 · Studio
- `JOURNAL-WHY-ONE-STUDIO-COVER` · 1600×900 · Journal
- `JOURNAL-AI-WITH-A-HUMAN-COVER` · 1600×900 · Journal
- `PROOF-LOGO-1` · 240×48 · Proof
- `PROOF-LOGO-2` · 240×48 · Proof
- `PROOF-LOGO-3` · 240×48 · Proof
- `PROOF-LOGO-4` · 240×48 · Proof
- `PROOF-LOGO-5` · 240×48 · Proof
- `PROOF-LOGO-6` · 240×48 · Proof
