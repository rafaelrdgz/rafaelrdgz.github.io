# Rafael Rodriguez — Portfolio

Personal portfolio site built with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4.
Fully bilingual (English / Spanish) with static generation for both locales.

## Tech Stack

| Layer     | Technology                         |
| --------- | ---------------------------------- |
| Framework | Next.js 15 (App Router, Turbopack) |
| Language  | TypeScript 5 (strict mode)         |
| Styling   | Tailwind CSS v4                    |
| i18n      | next-intl v4.8.3                   |
| Runtime   | React 19                           |
| Font      | Fira Code (Google Fonts)           |
| Contact   | Formspree                          |

## Features

- Bilingual — English and Spanish via sub-path routing (`/en`, `/es`)
- Light / Dark theme toggle, persisted in `localStorage`
- Typewriter effect in the hero section
- Projects, Experience, and Contact sections
- Contact form with server-side validation (Formspree)
- SEO: `sitemap.xml`, `robots.txt`, Open Graph and Twitter card images
- Fully statically generated at build time

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_FORM_ACTION_URL=https://formspree.io/f/your-form-id
```

- `NEXT_PUBLIC_SITE_URL` — used for canonical URLs, Open Graph, and the sitemap.
- `CONTACT_FORM_ACTION_URL` — Formspree endpoint. Create a form at [formspree.io](https://formspree.io) and paste the endpoint here.

### 3. Start the development server

```bash
pnpm dev
```

The site runs at `http://localhost:3000`. It redirects automatically to `/en` or `/es` based on the browser language.

## Project Structure

```
messages/
  en.json               All English UI strings
  es.json               All Spanish UI strings

content/
  projects/             Project data (JSON, bilingual fields)
  experience/           Experience data (JSON, bilingual fields)

src/
  actions/              Server actions (contact form)
  app/[locale]/         Next.js App Router pages and layout
  appData/              Static data: skills, themes, footer links
  assets/               SVG icons and images
  components/           UI components organized by feature
  hooks/                Custom React hooks
  i18n/                 next-intl routing and request config
  lib/types.d.ts        Shared TypeScript types
  services/             Data fetching from content/ via Node fs
  utils/                Icon components and image exports
```

## Content

### Adding or editing a project

Create or edit a JSON file in `content/projects/`. All text fields that appear in the UI use a bilingual object:

```json
{
  "title": { "en": "Project Name", "es": "Nombre del proyecto" },
  "shortDescription": { "en": "...", "es": "..." },
  "cover": "https://...",
  "livePreview": "https://...",
  "githubLink": "https://..."
}
```

### Adding or editing an experience entry

Same bilingual pattern in `content/experience/`. Dates use ISO 8601 format (`YYYY-MM-DD`). Set `"endDate": null` for the current role.

## Scripts

```bash
pnpm dev          # Development server (Turbopack)
pnpm build        # Production build + type check
pnpm start        # Start production server
pnpm lint         # ESLint (next/core-web-vitals)
npx tsc --noEmit  # Type check only
npx prettier --write .  # Format all files
```

## Deployment

Set the following environment variables on your hosting platform:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
CONTACT_FORM_ACTION_URL=https://formspree.io/f/your-form-id
```

The build outputs fully static HTML for `/en` and `/es` — compatible with any platform that supports Next.js (Vercel, Netlify, etc.).
