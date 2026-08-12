# Clinic Management System UI (Community)

A clinic management system frontend: appointments, patient records, prescriptions, billing, reports, user management, and role-based dashboards (doctor / admin / patient).

The original Figma project is available at https://www.figma.com/design/9674O8SEbVZBz3RdFFFu6S/Clinic-Management-System-UI--Community-.

## Tech stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 7
- Tailwind CSS v4 + tw-animate-css (CSS-first config in `src/app/globals.css`)
- shadcn/ui components under `src/components/ui`
- next-themes (dark mode), sonner (toasts), recharts (charts), zod (validation), lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Sign in with any of the Doctor / Admin / Patient roles to see the role-specific dashboards.

## Scripts

- `npm run dev` – start the development server (Turbopack)
- `npm run build` – create an optimized production build
- `npm run start` – serve the production build
- `npm run typecheck` – run the TypeScript compiler (`tsc --noEmit`)

## Project structure

- `src/app` – App Router routes (`/login`, and `/dashboard`, `/appointments`, `/patients`, `/prescription`, `/billing`, `/reports`, `/users`, `/settings`, `/design-system`)
- `src/components/pages` – page components
- `src/components/layout` – app shell (Sidebar, Topbar)
- `src/components/common` – shared presentational components
- `src/components/ui` – shadcn/ui primitives
- `src/providers` – `AuthProvider` (role state) and `ThemeProvider` (dark mode)
- `src/lib/utils.ts` – `cn()` class-merge helper
