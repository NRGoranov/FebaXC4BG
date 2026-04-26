# Strategic Finance Forum & Gala Website

Premium bilingual informational website for:

- **Strategic Finance Forum & Gala**
- **Date:** May 21
- **Location:** Hyatt Regency Sofia

## Tech Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- Framer Motion (subtle reveal animations)
- Static-first architecture with locale JSON content

## Project Structure

- `app/[locale]/page.tsx` - localized main landing page
- `app/[locale]/layout.tsx` - locale-level wrapper
- `components/event-landing.tsx` - reusable section-based page composition
- `components/sticky-nav.tsx` - sticky nav with active section highlighting
- `components/language-switcher.tsx` - EN/BG switcher
- `components/section.tsx` - reusable section shell
- `locales/en/common.json` - English content
- `locales/bg/common.json` - Bulgarian content
- `lib/i18n.ts` - locale definitions
- `lib/dictionaries.ts` - translation loading
- `proxy.ts` - locale routing (`/` -> `/en`)

## Internationalization

- Localized routes:
  - `/en`
  - `/bg`
- English is default locale
- Content is organized in JSON dictionaries for easy CMS migration later

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (auto-redirects to `/en`).

## Build & Validation

```bash
npm run lint
npm run build
```

## Deployment (Recommended: Vercel)

1. Push project to GitHub.
2. Import repository in [Vercel](https://vercel.com/).
3. Framework preset: **Next.js** (auto-detected).
4. Deploy.

Why Vercel:

- Global CDN and edge caching
- Excellent static performance for informational websites
- Native Next.js optimization and smooth CI/CD

Alternative: Netlify (works, but Vercel is preferred for App Router parity).

## Corporate Email Recommendation

- Google Workspace or Microsoft 365
- Suggested aliases:
  - `office@...`
  - `partners@...`
  - `media@...`

## Notes for Production Content

- Replace placeholder logos and speaker visuals in `public/images/*`.
- Update Formspree endpoint in `components/event-landing.tsx` if needed.
- Replace sample YouTube IDs in Multimedia section with official interview links.
