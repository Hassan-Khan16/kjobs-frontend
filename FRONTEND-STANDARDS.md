# KJobs Frontend Standards

Use this file as the source of truth for future user-facing frontend work.

## Stack (do not change)

The existing frontend is **Next.js + React + TypeScript + Tailwind CSS + existing `src/components/ui` primitives**.

- Do **not** introduce Bootstrap, Tailwind alternatives, or another UI kit.
- Do **not** add a second CSS framework.
- The Figma marketing file is also Tailwind-based. Match it with Tailwind utilities and the KJobs tokens below.
- The admin panel is off-limits. Do not redesign, move, or share-mutate admin components.

## Brand tokens

| Token | Value |
| --- | --- |
| Brand Navy | `#191C33` |
| Brand Navy Secondary | `#243B6B` |
| Brand Royal | `#2F5BDE` |
| Brand Sky | `#38BDF8` |
| Brand Indigo | `#6366F1` |
| Page background | `#F8FAFC` |
| Card / white | `#FFFFFF` |
| Muted background | `#F1F5F9` |
| Accent tint | `#E8EEF9` |
| Info tint | `#E0EDFF` |
| Text primary | `#191C33` |
| Text secondary | `#64748B` |
| Text support | `#475569` |
| Border | `#E5E7EB` |
| Error | `#DC2626` |

Do not introduce green, orange, yellow, pink, or magenta unless a functional state already requires it. Application statuses use navy / royal / indigo / error tints only.

## Typography

- **Inter** (`font-inter`): body and UI copy
- **Poppins** (`font-ui` / `font-poppins`): buttons, labels, auth UI
- **Anton** (`font-display` / `font-anton`): large marketing / dashboard headings

Do not add more font families.

## Architecture

```text
src/app/(pages)/(public)     Public marketing + auth
src/app/(pages)/user         Job seeker portal (existing prefix)
src/app/(pages)/employer     Employer portal (existing prefix)
src/app/(pages)/admin        DO NOT TOUCH
src/components/public        Marketing/shared user UI
src/components/portal        Authenticated dashboard chrome
src/components/auth          Public login/register
src/components/jobs          Jobs listing/details
src/components/seekers       Public job-seeker directory
src/components/home          Landing composition
src/services                 API / mock boundaries
src/data                     Temporary public catalog
```

Reuse `src/components/ui/*` only when a change cannot affect admin. If a shared primitive is risky, create a user-facing component under `public/` or `portal/`.

## Routing

Keep existing prefixes. Do not invent a second `/dashboard` tree.

- Public: `/`, `/jobs`, `/jobs/[id]`, `/job-seekers`, `/about`, `/contact`, `/login`, `/register`, `/forgot-password`, `/reset-password`, `/employers/[id]`
- Job seeker: `/user/dashboard`, `/user/profile`, `/user/applications`, `/user/saved-jobs`, `/user/settings`, `/user/notifications`
- Employer: `/employer/dashboard`, `/employer/profile`, `/employer/jobs`, `/employer/applications`, `/employer/settings`
- Admin stays under `/admin`

`/user/login` and `/employer/login` redirect to `/login`. Same for register.

## API rules

- Auth register/login uses the existing Laravel endpoints through `src/services/auth-service.ts` and NextAuth.
- Public jobs, saved jobs, applications, contact, and employer portal CRUD currently use **service wrappers** with structured mock/local data.
- Do not scatter fetch calls inside presentational components.
- When a public Laravel API exists, replace the body of the matching service. Keep the function signatures.

## UI states

Every list/detail page must handle loading, empty, and error. Forms must show validation and API errors. Do not assume data always exists.

## Icons

Use `lucide-react`. Do not use emoji or raw Unicode as UI icons.

## Responsive

Public nav collapses on mobile. Dashboards use a horizontal chip nav on small screens and a sidebar from `lg` up. Job cards, filters, and application tables must stack cleanly.

## Visual language

- Cards: `rounded-2xl`, `border-border-default`, white surface
- Primary CTA: royal → navy gradient or solid `bg-brand-royal`
- Marketing heroes: navy gradient `#243B6B → #191C33`
- Display headings: Anton, wide tracking, often uppercase
- Section eyebrows: small Poppins, royal or sky
