# AGENTS.md

Guidelines for AI agents working in this repository.

## Project Overview

Next.js 15 (App Router) portfolio site built with React 19, TypeScript 5, and Tailwind CSS v4.
Uses Turbopack for development. Only 3 production dependencies: `next`, `react`, `react-dom`.

## Build / Lint / Test Commands

```bash
npm run dev        # Start dev server (Turbopack)
npm run build      # Production build (also runs type checking)
npm run start      # Start production server
npm run lint       # ESLint via Next.js (next lint)
npx prettier --write .              # Format all files
npx prettier --check .              # Check formatting without writing
npx tsc --noEmit                    # Type check only
```

There is **no test framework** configured. No Jest, Vitest, or other test runner exists.
If adding tests, the project has no existing test infrastructure to follow.

## Environment Variables

Two env vars are expected (not committed to repo):

- `NEXT_PUBLIC_SITE_URL` -- used in layout.tsx, robots.ts, sitemap.ts
- `CONTACT_FORM_ACTION_URL` -- used in the server action for Formspree integration

These are accessed with non-null assertions (`process.env.VAR_NAME!`).

## Project Structure

```
src/
  actions/        Server actions ('use server')
  app/            Next.js App Router pages and layouts
  appData/        Static data arrays (services, skills, themes, footer links)
  assets/         SVG icons and images (static imports)
  components/     React components organized by feature (PascalCase dirs)
  hooks/          Custom React hooks (5 hooks)
  lib/            Type definitions (types.d.ts)
  services/       Data fetching (reads JSON from content/ via fs)
  utils/          Utility functions, icon components, image exports
content/
  projects/       Project data JSON files
  testimonials/   Testimonial data JSON files
```

## Code Style

### Formatting (Prettier)

- No semicolons
- Single quotes
- 2-space indentation
- 100 character print width
- Bracket spacing enabled
- JSX closing bracket on same line as last prop
- Tailwind class auto-sorting via `prettier-plugin-tailwindcss`

### TypeScript

- Strict mode is enabled (`"strict": true` in tsconfig)
- Path alias: `@/*` maps to `./src/*` -- prefer `@/` imports over deep relative paths
- Use `import type { ... }` for type-only imports where possible
- Types/interfaces defined in the same file immediately above the component that uses them
- Shared types go in `src/lib/types.d.ts`

### Imports

- External packages first (`react`, `next/*`), then internal `@/` imports, then relative imports
- Use `@/` alias for cross-module imports: `import { skillList } from '@/appData'`
- Use relative imports only for same-directory siblings: `import Ellipse from './Ellipse'`
- Named exports for multi-export modules (icons, appData, services, utils)
- Default exports for components, hooks, and server actions
- Barrel exports exist in `appData/index.ts`, `services/index.ts`

### Naming Conventions

| Element            | Convention   | Example                              |
|--------------------|-------------|--------------------------------------|
| Component files    | PascalCase  | `ProjectCard.tsx`, `ContactForm.tsx` |
| Component dirs     | PascalCase  | `Contact/`, `Projects/`             |
| Hook files         | camelCase   | `useRoleSwitcher.ts`                 |
| Util/service files | camelCase   | `icons.tsx`, `images.ts`             |
| Server actions     | kebab-case  | `contact-form.ts`                    |
| Components         | PascalCase  | `Hero`, `ProjectCard`                |
| Functions/vars     | camelCase   | `toggleMenu`, `isPending`            |
| Hooks              | `use` prefix| `useOutsideClick`, `useIsLargeScreen`|
| Interfaces/Types   | PascalCase  | `ProjectCardProps`, `ServiceCardTypes`|
| Data constants     | camelCase   | `navItems`, `serviceData`            |

### Component Patterns

- All components are functional (arrow functions): `const Hero = () => { ... }`
- Type with `React.FC<Props>` or `FC<Props>`: `const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => ...`
- Export default at bottom of file: `export default Hero`
- Add `'use client'` directive only for components needing interactivity (state, effects, event handlers)
- Server components are the default -- do not add `'use client'` unless required
- Props interfaces defined immediately above the component in the same file

### Error Handling

- Server actions: try/catch with `console.error()`, return `{ success: boolean, message: string }`
- Data services: try/catch, log with `console.error('Error:', error)`, return empty array `[]` as fallback
- No global error boundaries exist (no `error.tsx` files)

### Styling

- Tailwind CSS v4 with CSS-based configuration (no `tailwind.config.js`)
- Theme values defined via `@theme` directive in `src/app/globals.css`
- CSS custom properties for theming (`--p`, `--pc`, `--s`, `--sc`, `--tc`, `--a`, `--n`, `--b`)
- Four themes: Light, Dark, Aqua, Retro -- toggled via `data-theme` attribute on `<html>`
- Use `next/image` for all images with explicit `width`/`height` or `fill`
- Use `next/link` for internal navigation
- Use `next/dynamic` with `{ ssr: false }` for client-only components

### ESLint

Extends `next/core-web-vitals` and `next/typescript`. Custom overrides:
- `react/no-unescaped-entities`: off
- `react/no-children-prop`: off

## Key Patterns

- **Data loading**: Server components in `page.tsx` call async functions from `src/services/` that read JSON files from `content/` via Node `fs`
- **Server actions**: Form handling uses `'use server'` actions with React 19's `useActionState`
- **Theme persistence**: `localStorage` in `ThemeMenu.tsx`, sets `data-theme` on `<html>`
- **Icons**: SVG icons defined as React components in `src/utils/icons.tsx`, exported as named exports
- **Images**: Static image imports centralized in `src/utils/images.ts`
- **No external state management**: Local `useState` only, no Context/Redux/Zustand

## Remote Image Domains

Configured in `next.config.ts` via `images.remotePatterns`:
- `images.unsplash.com`
- `ik.imagekit.io`
- `res.cloudinary.com`
- `i.pravatar.cc`
