# Designer pack

This folder is everything you need to deliver assets for the Auverta website.

## What is here

- `ASSET_SPEC.md`: the full spec. One table per section of the site: slot ID, where it appears, purpose, ratio, pixel size, format, maximum file size, transparency, exact file name and path, notes.
- `placeholders/`: one labeled placeholder image for **every slot**, at its **exact pixel size**, with the slot ID, size and format written on it. The folder structure matches the website's `public/` folder.
- `slots.json`: the same list in machine-readable form.

## How to deliver

1. Open `ASSET_SPEC.md` and find the slot.
2. Find its placeholder in `placeholders/` (same name, same folder). That image shows the exact size and shape to design to.
3. Export your artwork with the **same file name**, using the format and extension the spec lists (for example `cover.webp` where the placeholder is `cover.png`).
4. Keep the **same folder structure** (`assets/work/nano-banana/cover.webp`) and send it back as a zip, or place it under `public/` in the repository.
5. The next build of the site picks every file up automatically. The preview link always shows which slots are still empty: they are the labeled boxes.

## Rules (short version)

No text inside images. sRGB. WebP or AVIF for photos and illustration, SVG for logos. Auva on a transparent background. Respect each slot's maximum file size, and keep the home page's images under 1200 KB in total. People only with written consent. Details are in `ASSET_SPEC.md`.

## Fonts

The site uses Bricolage Grotesque and Inter (Google Fonts). Any other typeface must be sent as a licensed `.woff2` with its licence.
