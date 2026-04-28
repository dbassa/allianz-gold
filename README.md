# Allianz Gold — Institutional web

Next.js 15 · Tailwind CSS · Framer Motion · next-intl · Resend · Docker

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styles | Tailwind CSS v3 |
| Animations | Framer Motion |
| Icons | Lucide React |
| i18n | next-intl (EN / ES / AR — RTL) |
| Email | Resend + react-email |
| Container | Docker (multi-stage, `node:20-alpine`) |

## Quick start with Docker (recommended)

```bash
# 1. Clone / copy the project
cd allianz-gold

# 2. Create your local env file
cp .env.example .env.local
# Then edit .env.local and add your RESEND_API_KEY

# 3. Development — hot reload on http://localhost:3000
docker compose up web-dev

# 4. Production build
docker compose up --build web
```

## Quick start without Docker

Requires Node.js ≥ 20.

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY
npm run dev                   # → http://localhost:3000
npm run build && npm start    # production
```

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Get one at resend.com (free tier: 3,000 mails/month) |
| `CONTACT_TO` | No | Recipient inbox (default: `corporate@allianzgold.com`) |
| `CONTACT_FROM` | No | Sender address. Use `onboarding@resend.dev` until the domain is verified in Resend. |
| `NEXT_PUBLIC_SITE_URL` | No | Full URL of the deployed site (default: `http://localhost:3000`) |

## Verifying your domain in Resend (production)

1. Go to [resend.com/domains](https://resend.com/domains) and add `allianzgold.com`.
2. Add the DNS records shown (DKIM, SPF, DMARC).
3. Once verified, set `CONTACT_FROM=Allianz Gold <noreply@allianzgold.com>` in your production env.

## Locales

| Code | Language | Direction |
|------|----------|-----------|
| `en` | English | LTR |
| `es` | Spanish | LTR |
| `ar` | Arabic | RTL |

To add a new locale: add it to `i18n/routing.ts` → `locales`, create `messages/<code>.json`, and add the label to `LanguageSwitcher.tsx`.

## Images

See [`IMAGES.md`](./IMAGES.md) for the full list of image assets and their specifications.

## Project structure

```
app/
  [locale]/           # All locale-aware routes
    page.tsx          # Home
    about/
    capitalization/
    contact/
    legal/{notice,privacy,cookies,disclaimer}/
  api/contact/        # POST — Resend email handler
components/
  layout/             # Nav, Footer, Logo, LanguageSwitcher
  motion/             # Reveal, Stagger (Framer Motion wrappers)
  sections/           # Page-level section blocks
  ui/                 # Primitives: Container, Button, Accordion, Rule…
emails/               # react-email templates
i18n/                 # next-intl routing + request config
lib/                  # cn, rate-limit
messages/             # en.json, es.json, ar.json
public/images/        # Static assets (see IMAGES.md)
```

## Legal pages

The four legal pages (`/legal/notice`, `/privacy`, `/cookies`, `/disclaimer`) contain placeholder text marked **"Pending legal review."** Replace with final text drafted and reviewed by qualified legal counsel before going live.
