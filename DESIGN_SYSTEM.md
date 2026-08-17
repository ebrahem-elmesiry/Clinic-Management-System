# Clinic Management System — Design System Documentation

> **Single source of truth for the current UI design system.**
> Generated strictly from the codebase as it exists today. This document describes the design system in use — it does not define a new one.

**Stack:** React 18 + TypeScript + Vite 6 + Tailwind CSS v4 (`@tailwindcss/vite`) + shadcn/ui-style primitives (Radix) + lucide-react icons + recharts.
**Entry points:** `src/main.tsx` → `src/app/App.tsx` → `src/styles/index.css`.
**Config:** `vite.config.ts` (aliases `@` → `src/app`).

---

## 1. Design System Overview

- **Visual style:** Clean, professional healthcare admin dashboard. Light, airy, card-based "software back-office" aesthetic built from white surfaces on a light gray canvas (`bg-gray-50`).
- **Design philosophy visible in code:** Card-per-section layout, heavy use of a white `Card` + thin border (`border-gray-200`) + `shadow-sm`, gradient accents (blue→teal) used as the **only** brand color moment, pastel tint backgrounds (`*-100`) with matching dark text (`*-700`) for status indicators, and rounded corners everywhere (`rounded-lg`/`rounded-xl`).
- **Primary brand treatment:** Blue (Tailwind `blue-500`/`blue-600`) as the action color, Teal (`teal-500`/`teal-600`) as a secondary accent. These two appear together as a repeated `bg-gradient-to-br from-blue-500 to-teal-500` / `from-blue-600 to-teal-600` brand gradient on logos, avatars, hero banners, and summary cards.
- **Light/Dark:** Both are *defined*. `:root` (light) and `.dark` tokens exist in the CSS theme files and `next-themes` is referenced by the sonner toaster, but **no theme provider or toggle is wired up in the app** — `.dark` is never applied at runtime. The rendered app is effectively **light mode only**, and all page styling is hard-coded light (`bg-white`, `text-gray-900`, etc.).
- **Consistency:** High at the visual level (shared card/table/badge/form patterns), but with notable inconsistencies documented inline in §18 (e.g. theme token vs. actual palette mismatch, duplicated theme CSS files, mixed usage of shadcn components and raw HTML elements, and one dynamic Tailwind class bug).

---

## 2. Color System

There are **two distinct color systems** in the codebase:

1. **CSS design tokens** (`src/styles/globals.css`, `theme.css`, `default_theme.css`, root `default_shadcn_theme.css`) — shadcn-style CSS variables in OKLCH/HEX, referenced through `@theme inline`.
2. **De-facto page palette** — hard-coded Tailwind color classes (`bg-blue-600`, `text-gray-900`, `border-gray-200`, …) used directly in every page. **This is the palette the UI actually renders with.**

> ⚠️ **Inconsistency:** The CSS token `--primary` is near-black (`#030213`) while every real UI action color is Tailwind `blue-600`. The tokens are effectively unused by the pages (which do not reference `bg-primary` / `text-primary` etc.).

### 2.1 CSS Design Tokens (defined, mostly unused by pages)

Defined identically in `src/styles/globals.css`, `src/styles/theme.css`, `src/styles/default_theme.css`, and root `default_shadcn_theme.css`.

| Token | Light value | Dark value | Where used |
| --- | --- | --- | --- |
| `--background` | `#ffffff` | `oklch(0.145 0 0)` | `body` base (`bg-background`) |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | default text (`text-foreground`) |
| `--card` | `#ffffff` | `oklch(0.145 0 0)` | `ui/card.tsx` surface |
| `--card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | card text |
| `--popover` | `oklch(1 0 0)` | `oklch(0.145 0 0)` | `Select` dropdown / sonner toast bg |
| `--popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | dropdown text |
| `--primary` | `#030213` | `oklch(0.985 0 0)` | `ui/button.tsx` default / `ui/badge.tsx` |
| `--primary-foreground` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | text on primary |
| `--secondary` | `oklch(0.95 0.0058 264.53)` | `oklch(0.269 0 0)` | secondary surfaces |
| `--secondary-foreground` | `#030213` | `oklch(0.985 0 0)` | text on secondary |
| `--muted` | `#ececf0` | `oklch(0.269 0 0)` | `TabsList` track |
| `--muted-foreground` | `#717182` | `oklch(0.708 0 0)` | placeholder / description text |
| `--accent` | `#e9ebef` | `oklch(0.269 0 0)` | hover surfaces (`hover:bg-accent`) |
| `--accent-foreground` | `#030213` | `oklch(0.985 0 0)` | hover text |
| `--destructive` | `#d4183d` | `oklch(0.396 0.141 25.723)` | destructive button |
| `--destructive-foreground` | `#ffffff` | `oklch(0.637 0.237 25.331)` | text on destructive |
| `--border` | `rgba(0, 0, 0, 0.1)` | `oklch(0.269 0 0)` | `* { @apply border-border }` base |
| `--input` | `transparent` | `oklch(0.269 0 0)` | `ui/input.tsx` border (`border-input`) |
| `--input-background` | `#f3f3f5` | *(not redefined — falls back to light)* | `ui/input.tsx` / `ui/select.tsx` field fill |
| `--switch-background` | `#cbced4` | *(not redefined)* | switch track (defined, unused) |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.439 0 0)` | focus rings (`outline-ring/50`) |
| `--sidebar` / `--sidebar-foreground` | `oklch(0.985 0 0)` / `oklch(0.145 0 0)` | `oklch(0.205 0 0)` / `oklch(0.985 0 0)` | `ui/sidebar.tsx` (file exists, unused) |
| `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border`, `--sidebar-ring` | dark ink variants | light variants | `ui/sidebar.tsx` (unused) |
| `--chart-1 … --chart-5` | 5 OKLCH series (warm red → teal → blue → olive) | re-mapped for dark | recharts defaults (unused; charts hard-code HEX) |
| `--radius` | `0.625rem` (10px) | same | base radius token |

`@theme inline` exposes these to Tailwind as `--color-{name}` and radius as `--radius-sm/-md/-lg/-xl`:
`radius-sm = calc(var(--radius) - 4px) = 6px`, `radius-md = -2px = 8px`, `radius-lg = 10px`, `radius-xl = +4px = 14px`.

### 2.2 De-facto Page Palette (what the UI actually renders)

All values below are the standard Tailwind v4 palette classes used across pages. HEX values are the well-known Tailwind defaults (the `DesignSystemPage.tsx` also lists these exact HEX values).

#### Primary Colors
| Role | Class used | HEX | Usage |
| --- | --- | --- | --- |
| Primary action | `bg-blue-600` | `#2563EB` | Primary buttons, active nav, active view toggle, Pay Now, focus ring |
| Primary hover | `hover:bg-blue-700` | `#1D4ED8` | Button hover state |
| Primary strong | `bg-blue-500` | `#3B82F6` | Gradient start (`from-blue-500`), chart line, focus ring |
| Primary light fill | `bg-blue-50` | `#EFF6FF` | Active nav/sidebar item, selected filter, service chips (patient view) |
| Primary light text | `text-blue-600` / `text-blue-700` | `#2563EB` / `#1D4ED8` | Links, invoice IDs, "View all" links, status pills |
| Active indicator | `bg-blue-600`, `ring-blue-500`, `border-blue-500`, `border-l-blue-600` | `#2563EB` / `#3B82F6` | Selected states across nav, filters, calendar "today", selected patient |

#### Secondary Colors
| Role | Class used | HEX | Usage |
| --- | --- | --- | --- |
| Secondary accent | `bg-teal-600` | `#0D9488` | Teal action button (Export PDF), gradient end, icon accents |
| Secondary accent light | `bg-teal-500` | `#14B8A6` | Gradient start for avatars/logo, chart bars |
| Teal light fills | `bg-teal-50` / `teal-100` | `#F0FDFA` / `#CCFBF1` | Gradient-tinted panels, role badge (patient/doctor tags) |
| Teal text | `text-teal-600` / `text-teal-700` | `#0D9488` / `#0F766E` | Icons, role pills, health tip |

#### Background Colors
| Role | Class used | HEX | Usage |
| --- | --- | --- | --- |
| Page background | `bg-gray-50` | `#F9FAFB` | App shell (`App.tsx`), Login right panel, Design System page |
| Card / surface | `bg-white` | `#FFFFFF` | All cards, tables, dialogs, sidebar, topbar |
| Muted surface | `bg-gray-50`, `bg-gray-100` | `#F9FAFB` / `#F3F4F6` | Table header, calendar day headers, info tiles, admin service chips |
| Input field background | `bg-input-background` (`#f3f3f5`) or `bg-gray-50` | `#F3F3F5` | shadcn `Input`/`Select`; raw inputs are transparent on white |
| Sidebar background | `bg-white` | `#FFFFFF` | `layout/Sidebar.tsx` |
| Header (topbar) | `bg-white` | `#FFFFFF` | `layout/Topbar.tsx` |
| Brand gradient bg | `bg-gradient-to-r/b from-blue-500/600 to-teal-500/600` | — | Logo tiles, avatars, hero banners, summary cards |

#### Text Colors
| Role | Class used | HEX | Usage |
| --- | --- | --- | --- |
| Primary text | `text-gray-900` | `#111827` | Headings, names, values, emphasis |
| Secondary text | `text-gray-600` / `text-gray-700` | `#4B5563` / `#374151` | Body copy, table cells, descriptions |
| Muted text | `text-gray-500` | `#6B7280` | Sub-labels, timestamps, helper text, placeholders |
| Faint text | `text-gray-400` / `text-gray-300` | `#9CA3AF` / `#D1D5DB` | Inline icons, empty-state icons |
| White-on-gradient | `text-white` / `text-blue-100` | `#FFFFFF` / `#DBEAFE` | Text on blue→teal gradients |
| Brand text | `text-blue-600` | `#2563EB` | Links, active nav |
| Placeholder | `placeholder:text-muted-foreground` (token) or `text-gray-400`/`text-gray-500` (raw inputs) | `#717182` / `#9CA3AF` | Input placeholders |
| Disabled | `disabled:opacity-50` | — | Shadcn Button/Input/Select disabled state |

#### Border Colors
| Role | Class used | HEX | Usage |
| --- | --- | --- | --- |
| Default border | `border-gray-200` | `#E5E7EB` | Cards, inputs, tables, sidebar, topbar, dialogs |
| Hairline divider | `border-gray-100`, `divide-gray-100`, `divide-gray-200` | `#F3F4F6` / `#E5E7EB` | List/tabular dividers, card headers |
| Input border (raw) | `border-gray-200` (or `border-input`) | `#E5E7EB` | All inputs/selects/textareas |
| Focus border/ring | `focus:ring-blue-500`, `focus:border-transparent`, `focus-visible:ring-ring/50`, `focus-visible:border-ring` | `#3B82F6` (ring) | Focus states on raw inputs; shadcn inputs use `--ring` |
| Accent hover border | `hover:border-blue-300` | `#93C5FD` | Hoverable cards (appointment, prescription, templates) |
| Brand border | `border-blue-200`, `border-red-200`, `border-teal-200`, `border-purple-200` | `#BFDBFE` / `#FECACA` / `#99F6E4` / `#E9D5FF` | Tinted callout cards |

#### Semantic Colors
| Role | Class used | HEX | Usage |
| --- | --- | --- | --- |
| Success | `bg-green-100` + `text-green-700`, `bg-green-500/600` | `#DCFCE7` + `#15803D`; `#22C55E`/`#16A34A` | Paid/confirmed/completed/controlled/normal status pills, check icons, Mark Paid, green stat tiles |
| Warning | `bg-orange-100` + `text-orange-700`, `bg-orange-500/600` | `#FFEDD5` + `#C2410C`; `#F97316`/`#EA580C` | Pending, ongoing, moderate severity, overdue-ish |
| Error / destructive | `bg-red-100` + `text-red-700`, `bg-red-500/600`, `text-red-600` | `#FEE2E2` + `#B91C1C`; `#EF4444`/`#DC2626` | Cancelled, overdue, severe, delete actions, unread dot, danger zone |
| Info | `bg-blue-100` + `text-blue-700`, `bg-blue-50` + `border-blue-200` | `#DBEAFE` + `#1D4ED8`; `#EFF6FF` + `#BFDBFE` | Completed status, info notices, visit/condition tags, prescription preview |
| Neutral status | `bg-gray-100` + `text-gray-700` | `#F3F4F6` + `#374151` | Upcoming badge, unknown/other statuses |

---

## 3. Typography System

- **Font family:** `Not defined` in code. `fonts.css` is empty, no `@import` of web fonts, no `--font-*` family token, and no `font-family` declaration anywhere. Pages render in the **browser/system default sans-serif**. (`DesignSystemPage.tsx` labels it "System sans-serif (Inter recommended)".)
- **Base font size:** `html { font-size: var(--font-size) }` where `--font-size: 16px`.
- **Weights used:** `400` (`--font-weight-normal`) and `500` (`--font-weight-medium`). No weights above 500 appear.

### Base element styles (`@layer base` in `theme.css` / `globals.css`)

These apply to elements **without** an ancestor Tailwind `text-*` class:

| Element | Size (Tailwind var → px) | Weight | Line-height |
| --- | --- | --- | --- |
| `h1` | `var(--text-2xl)` → 24px | 500 | 1.5 |
| `h2` | `var(--text-xl)` → 20px | 500 | 1.5 |
| `h3` | `var(--text-lg)` → 18px | 500 | 1.5 |
| `h4` | `var(--text-base)` → 16px | 500 | 1.5 |
| `p` | `var(--text-base)` → 16px | 400 | 1.5 |
| `label` | `var(--text-base)` → 16px | 500 | 1.5 |
| `button` | `var(--text-base)` → 16px | 500 | 1.5 |
| `input` | `var(--text-base)` → 16px | 400 | 1.5 |

### De-facto typography used in pages (Tailwind utility classes)

| Role | Classes used | Size | Weight | Where |
| --- | --- | --- | --- | --- |
| Page title | `text-2xl text-gray-900` | 24px | 500 (base) | Every staff page header (`AdminDashboard`, `PatientRecords`, `Billing`, …) |
| Hero page title | `text-2xl text-white` (some `text-3xl`) | 24–30px | 500 | Patient hero banners (`AppointmentsPage`, `BillingPage`, `PatientRecordsPage`), `PatientDashboard` "Welcome back" |
| Login hero heading | `text-4xl text-white` | 36px | 500 | `LoginPage` left panel |
| Section heading | `text-lg text-gray-900` | 18px | 500 | Card panel titles ("Revenue Overview", "Notifications", "Today's Appointments") |
| Larger section heading | `text-xl text-gray-900` | 20px | 500 | "Personal Information", calendar month name |
| Card title | `text-lg text-gray-900` | 18px | 500 | Standard across cards |
| Stat value | `text-3xl text-gray-900` (`StatsCard`), `text-2xl text-gray-900` (Billing inline stats) | 24–30px | 500 | Metric values |
| Body | `text-sm text-gray-600/700` | 14px | 400 | Card body, table cells, descriptions |
| Muted/helper | `text-sm text-gray-500` | 14px | 400 | Sub-descriptions under headings |
| Caption / timestamps | `text-xs text-gray-500` | 12px | 400 | Times, dates, badge text, sub-labels |
| Label | `text-sm` (shadcn `Label`) or base `label` 16px/500 | 14–16px | 500 | Form field labels (`LoginPage`, dialogs) |

---

## 4. Spacing System

Standard **Tailwind spacing scale (4px base)**. No custom spacing tokens exist beyond the default scale. The recurring values:

| Token | px | Common usage |
| --- | --- | --- |
| `p-1` | 4px | Tight icon-button padding |
| `p-2` | 8px | Icon buttons (topbar menu/bell/profile), row icon buttons |
| `p-3` | 12px | Role-selector buttons, patient list rows, small card padding |
| `p-4` | 16px | Table cells, notification items, service tags, compact card content, nav items padding |
| `p-5` | 20px | Filter bars, appointment rows (list view) |
| `p-6` | 24px | **Standard card inner padding** (most cards, headers, tables' wrapper) |
| `p-8` | 32px | **Standard page outer padding** (`p-8`) on every page |
| `p-12` | 48px | Login branding panel padding |
| `px-6 py-4` | 24px / 16px | Table header and cell padding (standard table rhythm) |
| `gap-1` / `space-y-1` | 4px | Nav item stack, tiny gaps |
| `gap-2` / `space-y-2` | 8px | Icon+label gaps, avatar lists, calendar cell spacing |
| `gap-3` | 12px | Avatar+text, action button clusters, form row gaps |
| `gap-4` | 16px | Form grid gaps, card grids, chip clusters |
| `gap-5` | 20px | Settings form grid gaps |
| `gap-6` | 24px | **Primary grid gap** between columns/cards |
| `space-y-4` | 16px | Vertical rhythm inside card content (lists, form fields) |
| `space-y-6` | 24px | **Standard vertical rhythm between page sections** |
| `space-y-8` | 32px | Larger page rhythm (dashboards, `LoginPage`) |

**Recurring section-spacing pattern:** Every page wraps content in `p-8 space-y-6` (staff pages) or `p-8 space-y-6 max-w-7xl mx-auto` (patient pages); dashboards use `p-8 space-y-8`.

---

## 5. Border Radius

Uses the standard Tailwind radius scale. Values below match the radii catalogued in `DesignSystemPage.tsx`.

| Token | Value | Usage |
| --- | --- | --- |
| `rounded` (via base `*`) | 4px | minor elements (rarely seen directly) |
| `rounded-md` | 6px | shadcn Button/Input/Select (from `ui/`) |
| `rounded-lg` | 8px | **Most common**: buttons, raw inputs, textareas, nav items, cards in lists, badges containers, calendar grid |
| `rounded-xl` | 12px | **Section cards**, stat cards, chart containers, sidebar logo tile, gradient icon tiles |
| `rounded-2xl` | 16px | Login form card, patient dashboard hero banner |
| `rounded-full` | 9999px | **Pills/badges**, avatar circles, notification dot, gradient icon circles, toggle knob |

> Note: The CSS `--radius` token (10px, `sm 6px / md 8px / lg 10px / xl 14px`) exists but the pages use the raw Tailwind classes above instead.

---

## 6. Shadows & Elevation

Only four shadow levels exist, all standard Tailwind classes (values catalogued in `DesignSystemPage.tsx`):

| Token | Value (Tailwind v4 default) | Usage |
| --- | --- | --- |
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | **Default card elevation** — every card/panel/table (with `bg-white border border-gray-200`) |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | Hover state of `StatsCard` (`hover:shadow-md transition-shadow`) |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | Floating dropdowns: notification panel, profile menu (`Topbar`) |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1)` | Login form card |

**Shadow model:** flat — only 4 elevation levels, no colored/gradient shadows, no custom shadow tokens. Elevation is communicated primarily via `border-gray-200` + `shadow-sm`; only floating surfaces go higher.

---

## 7. Reusable Components

### 7.1 Reusable UI primitives actually imported by the app (`src/app/components/ui/`)

These shadcn-style components are imported by pages. All render with the light-theme CSS tokens.

#### Button — `ui/button.tsx`
- **Purpose:** Primary action trigger; used in `LoginPage`, dialogs, list rows, `ReportsPage`, `SettingsPage`, `BillingPage`, `PrescriptionPage`, `AppointmentsPage`.
- **Variants (cva):** `default` (`bg-primary text-primary-foreground hover:bg-primary/90`), `destructive`, `outline` (`border bg-background hover:bg-accent`), `secondary`, `ghost`, `link`.
- **Sizes:** `default` (h-9), `sm` (h-8), `lg` (h-10), `icon` (9×9).
- **Common styling override:** Pages pass `className="bg-blue-600 hover:bg-blue-700"` to turn the token-default into the brand blue.
- **Important props:** `variant`, `size`, `asChild` (radix Slot).
- **Note:** The `default` variant renders `--primary` (#030213 near-black) unless overridden; the de-facto primary is the `bg-blue-600` override.

#### Input — `ui/input.tsx`
- **Purpose:** Text/date/time inputs in forms and filter bars.
- **Styling:** `h-9 w-full rounded-md border border-input bg-input-background px-3 py-1 text-base md:text-sm`, focus ring `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]`, `placeholder:text-muted-foreground`, disabled `opacity-50`.
- **Common usage:** Login/register forms, dialogs (patient, appointment, invoice, user), filter search boxes (with `pl-9`/`pl-10` when an icon is placed inside), date/time fields.

#### Label — `ui/label.tsx`
- **Purpose:** Form field labels.
- **Styling:** `text-sm leading-none font-medium` (flex, gap-2).
- **Usage:** Every form in the app (Login, Appointment, Patient, Invoice, User, Prescription, Settings). In `LoginPage` it is styled `text-gray-700`.

#### Select — `ui/select.tsx`
- **Purpose:** Dropdown selection (Radix).
- **Trigger:** `h-9 rounded-md border border-input bg-input-background px-3 py-2 text-sm` + chevron; sizes `default` h-9 / `sm` h-8.
- **Content:** popover panel `bg-popover border rounded-md shadow-md`, items `rounded-sm py-1.5 pr-8 pl-2 text-sm` with check indicator.
- **Common usage:** Filters (`w-[180px]` or `w-[160px]` triggers), prescription frequency/timing, dialogs (doctor, appointment type, role).
- **Note:** `SettingsPage` uses a **native `<select>`** instead (see §12 inconsistency).

#### Dialog — `ui/dialog.tsx`
- **Purpose:** Modal forms (Radix).
- **Overlay:** `fixed inset-0 z-50 bg-black/50` + fade animation.
- **Content:** `rounded-lg border bg-background p-6 shadow-lg`, centered, `max-w-[calc(100%-2rem)] sm:max-w-lg`, zoom/fade animations, `XIcon` close top-right.
- **Sizes in use:** `max-w-md` (appointment, user, invoice header forms), `max-w-2xl max-h-[90vh] overflow-y-auto` (add-patient, generate-invoice).
- **Parts used:** `Dialog`, `DialogTrigger` (asChild), `DialogContent`, `DialogHeader`, `DialogTitle`.

#### Tabs — `ui/tabs.tsx`
- **Purpose:** Tabbed content (Radix).
- **TabsList:** `h-9 rounded-xl bg-muted p-[3px]` (muted track).
- **TabsTrigger:** `rounded-xl border border-transparent px-2 py-1 text-sm font-medium`, active state `bg-card`.
- **De-facto override used in pages:** `<TabsList className="bg-white border border-gray-200">` (Login, Patient Records) so the track renders white with a border instead of the muted token.

#### Toaster — `ui/sonner.tsx`
- **Purpose:** Toast notifications (sonner + next-themes).
- **Mounting:** `<Toaster richColors position="top-right" />` in `App.tsx`.
- **API used:** `toast.success(...)`, `toast.info(...)`, `toast.error(...)` (Appointments, Billing, Settings).
- **Styling:** normal-bg/normal-text/normal-border mapped to `--popover`/`--popover-foreground`/`--border`.

### 7.2 Reusable layout components (`src/app/components/layout/`)

#### Sidebar — `layout/Sidebar.tsx`
- **Purpose:** App navigation, per-role nav configuration.
- **Styling:** `fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200`; slide transition `duration-300`; mobile overlay `bg-black/50 z-20 lg:hidden`.
- **Logo area:** `p-6 border-b border-gray-200` with 40px gradient tile (`w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl`) + brand name + `text-xs text-gray-500` tagline.
- **Nav item:** `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors`; active = `bg-blue-50 text-blue-600`, idle = `text-gray-700 hover:bg-gray-50`; icon `w-5 h-5`.
- **Role badge footer:** `p-4 border-t` with `bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg` panel ("Logged in as").
- **Variants:** 3 nav configs keyed by role — doctor / admin / patient (different item sets).
- **Props:** `userRole`, `currentPage`, `onNavigate`, `isOpen`, `onToggle`.

#### Topbar — `layout/Topbar.tsx`
- **Purpose:** Global header: menu toggle, global search, notifications, profile menu.
- **Styling:** `bg-white border-b border-gray-200 px-6 py-4`.
- **Search:** relative wrapper `w-full max-w-md`; `Search` icon absolute `left-3`; input `pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`.
- **Icon buttons:** `p-2 hover:bg-gray-100 rounded-lg`; bell with unread dot (`absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full`).
- **Profile button:** gradient avatar `w-8 h-8 rounded-full` + name (`text-sm text-gray-900`) + role (`text-xs text-gray-500`); name/role hidden below `md`.
- **Dropdowns:** `w-80` (notifications) / `w-56` (profile) `bg-white rounded-lg shadow-lg border border-gray-200`, header `p-4 border-b`, items `p-4 border-b border-gray-100 hover:bg-gray-50`; unread notification = `bg-blue-50`.
- **Props:** `userRole`, `onLogout`, `onMenuToggle`.

### 7.3 Reusable common components (`src/app/components/common/`)

#### StatsCard — `common/StatsCard.tsx`
- **Purpose:** Dashboard metric card.
- **Styling:** `bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow`; title `text-sm text-gray-600 mb-2`; value `text-3xl text-gray-900 mb-1`; change `text-xs text-gray-500`; icon tile `w-12 h-12 rounded-xl` gradient, icon `w-6 h-6 text-white`.
- **Variants:** 6 gradient colors — `blue`, `teal`, `orange`, `green`, `purple`, `red` (mapped to `from-{c}-500 to-{c}-600`).
- **Used in:** Doctor Dashboard, Admin Dashboard, (pattern copied inline in Billing/User/Reports pages).

#### AppointmentCard — `common/AppointmentCard.tsx`
- **Purpose:** Single appointment row (Doctor Dashboard "Today's Appointments").
- **Styling:** `flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/30 transition-all`; time tile `w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl`; meta lines `text-sm text-gray-600/500` with small icons; action buttons.
- **Variants (status):** `completed` (green pill), `in-progress` (blue pill), `upcoming` (gray pill, Start/Reschedule buttons), `cancelled` (red pill).
- **Props:** `time`, `patient`, `reason`, `status`.

### 7.4 Utility
- `ui/utils.ts` — `cn(...)` = `clsx` + `tailwind-merge` (used by all `ui/*` primitives).
- `figma/ImageWithFallback.tsx` — `<img>` wrapper with gray fallback tile (present in codebase; not referenced by any page).

### 7.5 UI primitive files that exist but are **not imported by the app**

`badge.tsx`, `card.tsx`, `avatar.tsx`, `skeleton.tsx`, `table.tsx`, `checkbox.tsx`, `switch.tsx`, `radio-group.tsx`, `tooltip.tsx`, `popover.tsx`, `dropdown-menu.tsx`, `sidebar.tsx`, `separator.tsx`, `scroll-area.tsx`, `accordion.tsx`, `alert.tsx`, `alert-dialog.tsx`, `sheet.tsx`, `drawer.tsx`, `menubar.tsx`, `navigation-menu.tsx`, `context-menu.tsx`, `collapsible.tsx`, `command.tsx`, `hover-card.tsx`, `calendar.tsx`, `carousel.tsx`, `chart.tsx`, `pagination.tsx`, `progress.tsx`, `resizable.tsx`, `slider.tsx`, `toggle.tsx`, `toggle-group.tsx`, `aspect-ratio.tsx`, `input-otp.tsx`, `breadcrumb.tsx`, `form.tsx`, `use-mobile.ts`. These exist in `src/app/components/ui/` but are **unused** — the pages build these UI patterns with raw HTML + Tailwind instead.

---

## 8. Component Variants & States

States observed in the actual page code:

| State | Implementation | Example |
| --- | --- | --- |
| **Default** | White surface, `border-gray-200`, `shadow-sm` (cards); `text-gray-700` (idle nav) | All cards, nav items |
| **Hover** | `hover:bg-gray-50` (neutral), `hover:bg-blue-50` (brand), `hover:bg-red-50` (destructive), `hover:border-blue-300` + `hover:bg-blue-50/30` (cards), `hover:shadow-md` (stats) | Buttons, table rows, cards, nav |
| **Active (nav/selected)** | `bg-blue-50 text-blue-600`; `border-l-4 border-l-blue-600 bg-blue-50` (selected patient); `bg-blue-600 text-white` (toggle/filter chips); `border-blue-500 bg-blue-50 text-blue-700` (role selector) | Sidebar, patient list, view toggles, login role cards |
| **Focus** | Raw inputs: `focus:outline-none focus:ring-2 focus:ring-blue-500` (+ `focus:border-transparent`); shadcn inputs: `focus-visible:border-ring focus-visible:ring-ring/50 ring-[3px]` | All inputs/selects/textareas |
| **Disabled** | `disabled:opacity-50 disabled:pointer-events-none` (shadcn Button/Input/Select); `text-gray-500` (inactive day chips) | Buttons, inputs |
| **Loading** | `Not found` — no loading/spinner/skeleton states are used anywhere in the pages | — |
| **Selected** | Blue accent as above (nav, filters, toggles, tabs, calendar today `bg-blue-600 text-white rounded-full`, "light" theme card `border-blue-500 bg-blue-50`) | — |
| **Error / destructive** | `text-red-600 hover:bg-red-50` (destructive actions), `bg-red-100 text-red-700` (badges), `bg-red-50 border border-red-200` (danger zone) | Cancel/delete buttons, badges |
| **Success** | `bg-green-100 text-green-700` (badges), `text-green-600` (positive values/trends), `bg-green-50 border-green-200` (save-success banner in Settings) | Status pills, amounts, banners |
| **Unread/notification** | `bg-blue-50` row + red dot | Topbar notification dropdown |
| **Empty state** | `text-center py-8 text-gray-500` with `w-12 h-12 text-gray-300` icon | Patient Dashboard lists, Billing invoices |

---

## 9. Icons

- **Library:** `lucide-react` (v0.487.0) — the single icon library used. Re-exported inside some `ui/*` files as `lucide-react@0.487.0`.
- **Style:** Lucide's default 24×24 stroke-based outline style; no fill icons, no custom icon set.
- **Common sizes (via Tailwind):** `w-4 h-4` (row/inline meta icons, table header meta, small actions), `w-5 h-5` (nav items, topbar buttons, stat tiles), `w-6 h-6` (stat tile icons, section header accents), `w-8 h-8` (hero/empty-state icons), `w-10 h-10`/`w-12 h-12` (avatar/logo tile icons).
- **Common usage patterns:**
  - Icon inside a gradient tile (`w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl` + `text-white`).
  - Icon absolutely positioned inside inputs (`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400`, input gets `pl-9`/`pl-10`).
  - Icon next to label text with `gap-2`/`gap-3` (table cells, meta lines, permission lists).
  - Icon buttons (printer/download in tables: `p-2 text-blue-600 hover:bg-blue-50 rounded`).
  - Icons as colored status accents (e.g. `text-blue-600`/`text-teal-600`/`text-purple-600` section header icons on patient dashboard).
- **Most-repeated icons:** `Search`, `Bell`, `User`, `Calendar`, `Plus`, `Download`, `Printer`, `Clock`, `Users`, `FileText`, `Activity`, `CheckCircle`, `XCircle`, `AlertCircle`, `Trash2`, `Settings`, `Stethoscope`.

---

## 10. Layout System

- **App shell (`App.tsx`):** `flex h-screen bg-gray-50` → `Sidebar` + `div.flex-1.flex.flex-col.overflow-hidden` → `Topbar` + `main.flex-1.overflow-auto`.
- **Sidebar width:** `w-64` = **256px**. White, `border-r border-gray-200`.
- **Topbar height:** Not fixed — `px-6 py-4` padding on white background with `border-b border-gray-200`.
- **Content padding:** `p-8` on all pages; inner page sections separated by `space-y-6` (or `space-y-8` on dashboards).
- **Page max-widths:** Patient-facing pages wrap in `max-w-7xl mx-auto` (`PatientDashboard`, `AppointmentsPage` patient view, `BillingPage` patient view, `PatientRecordsPage` patient view); `SettingsPage` uses `max-w-5xl mx-auto`.
- **Grid patterns (recurring):**
  - Stats: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`.
  - Two-up (charts, summaries): `grid-cols-1 lg:grid-cols-2 gap-6`.
  - Content + sidebar: `grid-cols-1 lg:grid-cols-3 gap-6` with `lg:col-span-2` main + `space-y-6` rail (Doctor/Admin/Patient dashboards, Prescriptions 2/3+1/3).
  - Master-detail: `grid-cols-1 lg:grid-cols-4 gap-6` with `lg:col-span-1` list + `lg:col-span-3` detail (Patient Records).
  - Three-up: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` (vitals, info tiles).
  - Login split: `flex` with `hidden lg:flex lg:w-1/2` (brand panel) + `flex-1` (form).
- **Flex patterns:** `flex items-center justify-between` for header rows; `flex items-center gap-3` for icon+text rows; `flex items-center gap-2` for chip clusters.
- **Common gaps:** `gap-6` (grids), `gap-4` (forms/cards), `gap-2/3` (inline), `space-y-4` (card content), `space-y-6` (sections).
- **Breakpoints used:** Tailwind defaults — `md` (768px), `lg` (1024px). No `sm`/`xl`/`2xl` breakpoint classes appear in pages.

---

## 11. Responsive Design

- **Sidebar / navigation:**
  - Below `lg`: sidebar is `fixed` (slides in/out with `-translate-x-full`), a full-screen `bg-black/50` overlay closes it, and a hamburger (`Menu`) appears in the topbar; clicking a nav item on mobile auto-closes the sidebar.
  - At `lg` and up: sidebar is `static`, always visible (`lg:translate-x-0`), hamburger hidden (`lg:hidden`).
- **Topbar:** hamburger only below `lg`; user name + role block hidden below `md` (profile becomes icon-only avatar).
- **Grids:** collapse to a single column on mobile, expand at `md`/`lg` (see §10 patterns).
- **Charts:** `ResponsiveContainer` with `width="100%"` — recharts re-flow automatically; chart cards stack 1-up on mobile, 2-up on `lg`.
- **Tables:** every table is wrapped in `overflow-x-auto` (Billing, Reports) or inside a card with horizontal scrolling; on small screens columns scroll horizontally.
- **Typography/spacing:** No responsive typography classes exist (no `text-sm md:text-base` etc.). Spacing uses the same `p-8`/`space-y-6` on all viewports.
- **Login page:** the left brand panel is `hidden lg:flex` (removed below `lg`); mobile shows a compact logo header instead.
- **Patient dashboards:** hero banner stats go `grid-cols-2 md:grid-cols-4`; info tiles `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
- **View toggles / filters:** `flex flex-wrap items-center gap-4`, with inputs `min-w-[200px]` so they wrap gracefully on small screens.

---

## 12. Forms

- **Input height:** shadcn `Input`/`Select` trigger = `h-9` (36px). Raw inputs use `px-3 py-2` (≈36–38px total).
- **Input radius:** `rounded-md` (shadcn primitives) vs `rounded-lg` (raw inputs used across most pages). Both appear in the UI.
- **Input border:** `border-gray-200` (raw) / `border-input` (shadcn, transparent in light mode). Field fill `bg-input-background` (`#f3f3f5`) on shadcn fields; raw inputs sit on white.
- **Label style:** shadcn `Label` = `text-sm font-medium`; page-specific overrides add `text-gray-700`. Base CSS also defines `label` at 16px/500. Labels are usually followed by a field wrapped in `<div className="relative mt-2">` (icon inputs) or directly `className="mt-2"` on the field.
- **Placeholder style:** shadcn `placeholder:text-muted-foreground` (`#717182`); raw inputs rely on browser default gray. Login uses `placeholder="••••••••"` for passwords.
- **Helper text:** `text-xs text-gray-500` below fields (Settings password strength, timestamps).
- **Error messages / validation states:** `Not found` — no inline validation UI; inputs/forms are not wired to react-hook-form (dependency installed but unused). Only `required` attributes exist.
- **Icon inputs:** wrapper `relative`, icon `absolute left-3 top-1/2 -translate-y-1/2 w-4/5 h-4/5 text-gray-400`, field `pl-9`/`pl-10` (email, lock, phone, search, password-with-eye toggle in Settings).
- **Selects:** Radix `Select` for filters/forms; native `<select className="... border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">` in `SettingsPage` (appearance/timezone/clinic prefs) — an inconsistency.
- **Textareas:** `w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500` with `text-sm` in some pages, `rows={2..4}`. Found in Appointments (reason/notes), Prescription (instructions/notes), Billing (notes), Settings (bio).
- **Checkboxes:** raw `<input type="checkbox" className="rounded border-gray-300">` (Login "Remember me", UserManagement "Send welcome email"). shadcn `Checkbox` exists but is unused.
- **Switches:** Custom inline toggle in `SettingsPage` (`NotificationToggle`): track `h-6 w-11 rounded-full` (`bg-blue-600` on / `bg-gray-200` off), knob `h-4 w-4 rounded-full bg-white shadow-sm` with `translate-x-1`/`translate-x-6`. shadcn `Switch` exists but is unused.
- **Form section pattern:** grouped fields in `space-y-4`, two-column rows via `grid grid-cols-2 gap-4` (or `grid-cols-3 gap-4`), action row `flex gap-3` with Cancel (`variant="outline"`) + Submit (`bg-blue-600 hover:bg-blue-700`), both `flex-1`.
- **Filter-bar pattern:** `bg-white rounded-xl shadow-sm border border-gray-200 p-6` (or `p-5`) containing `flex flex-wrap items-center gap-4`, a search input (`min-w-[200px] flex-1`), and one or two `Select` filters (typically `w-[180px]`).

---

## 13. Data Display

- **Tables:** Built with raw `<table className="w-full">` inside `bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden`. Header row `<thead className="bg-gray-50 border-b border-gray-200">`, headers `px-6 py-4 text-left text-sm text-gray-600`, body `divide-y divide-gray-200`, rows `hover:bg-gray-50`, cells `px-6 py-4` (`text-sm text-gray-900` values, `text-gray-600` secondary). Used in Appointments (list), Billing (invoices), Reports (department), User Management (users). Empty row: `colSpan={n} px-6 py-12 text-center` with icon.
- **Lists:** Card-panel lists with `divide-y divide-gray-100` rows that `hover:bg-gray-50` (notifications, appointment history) or bordered rows `p-3/4 border border-gray-200 rounded-lg` (transactions, templates, conditions).
- **Cards:** Standard `bg-white rounded-xl shadow-sm border border-gray-200 p-6`; optional header strip `p-6 border-b border-gray-200` containing `h2.text-lg.text-gray-900` + `p.text-sm.text-gray-500` subtitle; body `p-6 space-y-4`.
- **Badges / status pills (the dominant pattern):** `<span className="px-3 py-1 rounded-full text-xs bg-{c}-100 text-{c}-700">`. Colors by meaning — success green, warning orange, info blue, error red, neutral gray (see §2.2). Also small "tag" chips: `px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded` (service/visit tags).
- **Status indicators:** dot indicators — `w-2 h-2 rounded-full bg-{color}-500` (patient condition dots, login-activity dots, legend dots `w-3 h-3 rounded-full` with inline style background).
- **Avatars:** Circular gradient tiles `bg-gradient-to-br from-blue-500 to-teal-500 rounded-full` with a white `User` icon. Sizes: `w-8 h-8` (table rows), `w-10 h-10` (booking rows, patient list), `w-12 h-12`, `w-16 h-16` (hero banners), `w-20 h-20` (profile). Rounded-square variant `rounded-xl` for logo tiles (`w-10 h-10` / `w-12 h-12`).
- **Empty states:** Centered block: `text-center py-8 text-gray-500` with `<Icon className="w-12 h-12 mx-auto mb-3 text-gray-300" />` + message; Billing empty table row and Appointments empty state add a CTA button.
- **Loading states / skeletons:** `Not found` — no loading indicators or skeletons are used (the `ui/skeleton.tsx` file exists but is never imported).
- **Notifications:** Two patterns — dropdown list (Topbar: `w-80` panel, unread `bg-blue-50`) and inline list (Doctor Dashboard: `w-8 h-8 rounded-full bg-{c}-100` icon circle with `text-{c}-600` icon for info/warning/success).
- **Charts (recharts):** LineChart (`stroke="#3B82F6"`), AreaChart (blue gradient fill), BarChart (`fill="#14B8A6"`, `radius={[8,8,0,0]}` or `[4,4,0,0]`), PieChart (donut `innerRadius=60 outerRadius=80`, colors `#3B82F6 #14B8A6 #F59E0B #8B5CF6 #6B7280` / `#EF4444`). Shared chart styling: `CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB"`, axes `stroke="#6B7280"`, `Tooltip` contentStyle `{ backgroundColor:'#fff', border:'1px solid #E5E7EB', borderRadius:'8px' }`, container card `p-6` with title + `text-sm text-gray-500` subtitle.

---

## 14. Navigation

- **Sidebar** (`layout/Sidebar.tsx`): primary navigation; role-based menus (doctor/admin/patient). Active item = `bg-blue-50 text-blue-600`; hover = `bg-gray-50`. Mobile drawer + overlay behavior documented in §10/§11.
- **Header/Topbar** (`layout/Topbar.tsx`): global search (decorative), notifications bell with dropdown, profile menu with logout. Not part of page navigation but holds the menu toggle.
- **Navigation links:** All navigation is button-driven state (`onNavigate`), not router links (`react-router` is installed but unused).
- **Breadcrumbs:** `Not found` (breadcrumb ui file exists, unused).
- **Tabs:** Used for in-page navigation — Login/Register (`Tabs`), Patient Records tabs (Visit History / Vitals / Medical History / Prescriptions), Design System page tabs (Design Tokens / Components / Pages Overview), Settings sidebar tab list (`w-52` vertical tab nav with same active pattern `bg-blue-50 text-blue-600`).
- **View toggles (segmented):** `flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1` with `px-4 py-2 text-sm rounded-md` buttons; active = `bg-blue-600 text-white`, idle = `text-gray-600 hover:bg-gray-100` (Appointments Calendar/List, Login role selector, User Management role filter `rounded-lg` variant).
- **Mobile navigation:** via the slide-in sidebar overlay described above.

---

## 15. Page-Level Patterns

Recurring structural patterns across the 13 page components:

1. **Page header + actions** — `flex items-center justify-between` at top of page: left = `h1.text-2xl.text-gray-900.mb-2` + `p.text-gray-600` subtitle; right = action cluster (`Button bg-blue-600` like "Generate Report"/"New Appointment"/"Add New Patient", optional `Select`/outline buttons). Used on Admin Dashboard, Appointments, Patient Records, Billing, Reports, User Management.
2. **Stats/metrics grid** — `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` of StatCards (shared `StatsCard` or inline equivalents). Every dashboard + Billing + Reports + User Management.
3. **Filter bar** — white card `p-6` with search + selects (Appointments, Billing, User Management, patient views).
4. **Card-based sections** — content split into white cards with `p-6 border-b` headers (title + subtitle) and `p-6` bodies.
5. **Dashboard grid** — `lg:grid-cols-3` with a `lg:col-span-2` primary column + 1-column rail of stacked cards (Doctor/Admin/Patient dashboards).
6. **Master-detail (content + sidebar)** — `lg:grid-cols-4`: list panel (`lg:col-span-1`, scrollable, selectable rows) + detail panel (`lg:col-span-3`, profile + tabs) — Patient Records.
7. **Form + sidebar** — Prescriptions: `lg:grid-cols-3` form (`lg:col-span-2`, stacked cards) + reference rail (`Recent Prescriptions`, `Templates`, `Preview`).
8. **Table + filters** — Appointments/Billing/User Management: filters card above a full-width table card.
9. **Gradient hero banner (patient views)** — `bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 text-white` with white/20 avatar circle, `text-2xl text-white` title, `text-blue-100` subtitle, optional action button (Appointments, Billing, Patient Records, Patient Dashboard).
10. **Privacy/info notice** — `bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3` with blue circular icon badge — bottom of patient-facing pages.
11. **Form + sections dialogs** — `DialogContent max-w-md` or `max-w-2xl`, form `space-y-4 mt-4`, two-column grids, Cancel/Submit buttons.
12. **Gradient summary card** — `bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 text-white` with labeled totals and optional white CTA (Billing payment summary, Reports quick insights).

---

## 16. Design Tokens Reference

The most important tokens/classes used across the system (de-facto values; CSS-variable tokens noted where relevant).

| Category | Token | Value | Usage |
| --- | --- | --- | --- |
| Color | `bg-gray-50` (page bg) | `#F9FAFB` | App shell, page canvas |
| Color | `bg-white` (surface) | `#FFFFFF` | Cards, tables, sidebar, topbar, dialogs |
| Color | `bg-blue-600` (primary) | `#2563EB` | Primary buttons, active states, links |
| Color | `hover:bg-blue-700` | `#1D4ED8` | Primary hover |
| Color | `bg-teal-600` (secondary accent) | `#0D9488` | Teal actions, gradient end |
| Color | `text-gray-900` | `#111827` | Headings, names, values |
| Color | `text-gray-600` / `text-gray-500` | `#4B5563` / `#6B7280` | Body / muted text |
| Color | `border-gray-200` | `#E5E7EB` | Borders, dividers |
| Color | `bg-{c}-100` + `text-{c}-700` pills | e.g. `#DCFCE7`+`#15803D` | Semantic status badges (success/warn/info/error) |
| Color | `from-blue-600 to-teal-600` gradient | `#2563EB` → `#0D9488` | Hero banners, summary cards |
| Color | `--primary` (CSS token) | `#030213` | Defined but effectively unused by pages |
| Color | `--background` (CSS token) | `#ffffff` | Base body background |
| Color | `--input-background` (CSS token) | `#f3f3f5` | shadcn Input/Select fill |
| Typography | `h1` page title | `text-2xl` 24px / 500 / 1.5 | All page titles |
| Typography | `h2` section heading | `text-lg`–`text-xl` 18–20px / 500 / 1.5 | Card section headers |
| Typography | `h3` sub-heading | `text-lg` 18px / 500 / 1.5 | Sub-section titles |
| Typography | body | `text-sm` 14px / 400 / 1.5 | Table cells, card body |
| Typography | caption | `text-xs` 12px / 400 | Timestamps, badges |
| Typography | base font size | `--font-size: 16px` | Root HTML size |
| Typography | font family | `Not defined` (system sans-serif) | Everywhere |
| Spacing | page padding | `p-8` (32px) | Page outer padding |
| Spacing | section spacing | `space-y-6`/`space-y-8` (24/32px) | Between page sections |
| Spacing | card padding | `p-6` (24px) | Card inner padding |
| Spacing | grid gap | `gap-6` (24px) | Card grids |
| Spacing | form gap | `gap-4` (16px) / `space-y-4` | Form grids / stacks |
| Radius | `rounded-lg` | 8px | Buttons, inputs, list cards |
| Radius | `rounded-xl` | 12px | Section cards, stat cards |
| Radius | `rounded-2xl` | 16px | Login card, hero banner |
| Radius | `rounded-full` | 9999px | Badges, avatars |
| Radius | `--radius` (CSS token) | 0.625rem (10px) | Base radius token |
| Shadow | `shadow-sm` | 0 1px 2px rgb(0 0 0/0.05) | Standard cards |
| Shadow | `shadow-md` | 0 4px 6px rgb(0 0 0/0.1) | Card hover |
| Shadow | `shadow-lg` | 0 10px 15px rgb(0 0 0/0.1) | Dropdowns |
| Shadow | `shadow-xl` | 0 20px 25px rgb(0 0 0/0.1) | Login card |
| Layout | sidebar width | `w-64` (256px) | Sidebar |
| Layout | max content width | `max-w-7xl` (1280px) | Patient pages |
| Icon | lucide-react | v0.487.0 | All icons |

---

## 17. Reuse Guide

**When building a new page, reuse these existing components and tokens instead of creating new styles:**

1. **Page shell & layout:** Wrap content in `<div className="p-8 space-y-6">` (staff) or `p-8 space-y-6 max-w-7xl mx-auto` (patient). Add a page header row (`flex items-center justify-between` with `h1 text-2xl text-gray-900` + `p text-gray-600` + actions).
2. **Cards & sections:** Use the standard card: `bg-white rounded-xl shadow-sm border border-gray-200`, `p-6` content, and `p-6 border-b border-gray-200` header with `h2 text-lg text-gray-900` + `text-sm text-gray-500` subtitle.
3. **Stats:** Reuse `common/StatsCard` (title/value/change/icon/color) — 6 color variants available. For non-standard metrics, copy its exact markup.
4. **Buttons:** Reuse `ui/Button` with `className="bg-blue-600 hover:bg-blue-700"` for primary, `variant="outline"` for secondary, `bg-teal-600`/`bg-green-600`/`bg-red-600` overrides for semantic actions. For compact table actions, use the raw small-button pattern (`px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg`, `text-red-600 hover:bg-red-50`, or `px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50`).
5. **Forms:** Use `ui/Input`, `ui/Label`, `ui/Select`, `ui/Dialog` + `ui/Tabs`. Keep the field wrapper pattern (`div relative mt-2` + absolute icon + `pl-9/pl-10`), two-column `grid grid-cols-2 gap-4` rows, and the `Cancel`/`Submit` `flex gap-3` action row. Placeholder/sub-label styles: `text-sm text-gray-500`, `text-xs text-gray-500`.
6. **Search + filters:** Use the white filter card (`p-6`) with `flex flex-wrap items-center gap-4`, search input `min-w-[200px] flex-1` (icon left), and `Select` triggers `w-[180px]`.
7. **Status badges:** Use the pill pattern `<span className="px-3 py-1 rounded-full text-xs bg-{c}-100 text-{c}-700">` — green=confirmed/paid/completed, orange=pending, blue=info/completed, red=cancelled/overdue, gray=neutral. For tag chips use `px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded`.
8. **Tables:** Copy the standard table markup (§13): `bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden`, `thead bg-gray-50`, `th px-6 py-4 text-left text-sm text-gray-600`, `tbody divide-y divide-gray-200`, rows `hover:bg-gray-50`. Wrap in `overflow-x-auto` when wide.
9. **Gradient brand elements:** Use `bg-gradient-to-br from-blue-500 to-teal-500` (logo/avatars, `rounded-full` for avatars, `rounded-xl` for logo tiles) and `bg-gradient-to-r from-blue-600 to-teal-600` (hero banners, summary cards).
10. **Icons:** Import from `lucide-react` only. Use `w-4 h-4`/`w-5 h-5`/`w-6 h-6`/`w-8 h-8` conventions and the white-icon-on-gradient-tile pattern.
11. **Empty states:** `text-center py-8 text-gray-500` with `<Icon className="w-12 h-12 mx-auto mb-3 text-gray-300" />`.
12. **Charts:** Use recharts inside a standard card with the shared axis/grid/tooltip styling from §13 (grid `#E5E7EB` dashed, axes `#6B7280`, tooltip white with 8px radius, palette `#3B82F6`/`#14B8A6`/`#F59E0B`/`#8B5CF6`/`#6B7280`).
13. **Dialogs:** `ui/Dialog` — `max-w-md` for simple forms, `max-w-2xl max-h-[90vh] overflow-y-auto` for larger ones.
14. **Toasts:** `toast.success/info/error` from `sonner` (Toaster already mounted globally).
15. **Responsive defaults:** stats `1→2→4` (`md`/`lg`), two-up `1→2` at `lg`, master-detail `1→4` at `lg`, use `lg` as the sidebar breakpoint.
16. **Do NOT:** introduce new font families, new color palettes, new radius/shadow scales, or new component libraries — the above is the complete existing system.

---

## 18. Documented Inconsistencies (left as-is)

Per the project instructions, existing inconsistencies are documented rather than fixed:

1. **Theme token vs. actual palette mismatch:** CSS `--primary` is near-black `#030213` while the rendered primary color is `blue-600` (`#2563EB`) applied via utility overrides. The shadcn tokens are largely bypassed by the pages.
2. **Duplicated theme files:** `src/styles/theme.css`, `src/styles/globals.css`, and `src/styles/default_theme.css` are near-identical copies (only the base typography selector wrapper differs), and root `default_shadcn_theme.css` duplicates them again. `src/styles/index.css` imports `default_theme.css` + `globals.css`; `theme.css` and `tailwind.css` are not imported; `fonts.css` is empty.
3. **Dark mode defined but inert:** `.dark` tokens and the `dark` custom variant exist, but nothing toggles the `dark` class and no `ThemeProvider` is mounted — the app is effectively light-only while shipping dark tokens.
4. **Mixed form primitives:** shadcn `Input`/`Select`/`Label`/`Tabs` are used alongside raw `<input>`, `<textarea>`, `<select>`, and `<button>` elements with equivalent (sometimes slightly different) styling — e.g. native `<select>` in `SettingsPage` vs Radix `Select` elsewhere; `rounded-md` shadcn fields vs `rounded-lg` raw fields.
5. **Dynamic Tailwind class bug:** `DoctorDashboard.tsx:131` uses `` className={`w-2 h-2 rounded-full bg-${patient.status}-500`} `` — a template-literal class that Tailwind's compiler cannot generate; the status dots will not render colored. It was left untouched.
6. **Unused shadcn component set:** ~38 `ui/*` primitive files exist (Badge, Card, Avatar, Skeleton, Table, Checkbox, Switch, etc.) but are never imported; the same patterns are hand-rolled with raw HTML/Tailwind.
7. **Billing service-tag colors differ by role:** patient view uses `bg-blue-50 text-blue-600`, staff view uses `bg-gray-100 text-gray-600` for the same "services" chips.
8. **Unused dependencies:** `react-router`, `react-hook-form`, `next-themes` (except sonner), `react-dnd`, `react-slick`, `react-responsive-masonry`, `vaul`, `@mui/*`, `@popperjs/core`, `react-popper` are installed but not used by the pages.

---

*End of Design System documentation. Generated from the codebase as-is; no application code was modified.*
