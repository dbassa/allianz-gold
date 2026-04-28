# Image assets

All images live in `public/images/`. The table below lists every reference used in the code and the specification for the final production asset.

| File | Used in | Specification |
|------|---------|---------------|
| `macro_minerals.webp` | Home hero background | Full-bleed, 2560×1440 min. Macro texture of gold-bearing quartz or auriferous vein. Desaturated 30–50%. The navy overlay in the component reduces brightness further; the photo needs mid-tone richness, not brightness. |
| `swiss_bank.webp` | Capitalization hero, GlobalPresence background | Institutional exterior — Swiss or London financial district, stone or glass facade, B/W or desaturated. 2560×1440. |
| `mining_steel_structures.webp` | About hero | Industrial mining structure, steel headframe or processing plant silhouette. Dramatic angle. Desaturated. 2560×1440. |
| `og-institutional.jpg` | OpenGraph / Twitter card | 1200×630 px. Composited with logo + headline on dark navy. Not used in-page. Must be JPEG for compatibility. |
| `favicon.ico` | Browser tab | 32×32 + 16×16 multi-size ICO. |
| `apple-touch-icon.png` | iOS home screen | 180×180 PNG. |

## Unsplash placeholders (development only)

While waiting for final assets, the components fall back to the CSS gradient overlay — no broken-image state occurs since `<Image>` with `fill` will simply not render if the file is absent and the overlay is present anyway.

To add temporary Unsplash references during development, add `NEXT_PUBLIC_` env vars pointing to Unsplash URLs and swap the `src` props accordingly. The `next.config.ts` already whitelists `images.unsplash.com`.
