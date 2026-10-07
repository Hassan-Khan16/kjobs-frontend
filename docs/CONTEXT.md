# KJobs context snapshot

Snapshot date: 2026-10-07. Use this when opening the repo in a new IDE. Visual rules stay in `FRONTEND-STANDARDS.md`. Prompt constraints stay in `docs/FRONTEND-PROMPT-GUIDE.md`.

The repo is two apps:

- `kjobs-backend` — Laravel 12, PHP 8.2, Sanctum, SQLite by default, l5-swagger.
- `kjobs-frontend` — Next.js 16 App Router, React 19, TypeScript, Tailwind v4, NextAuth v4.

Auth is real. Job browsing, applications, saved jobs, the employer portal, contact, and the public seeker directory are mocked in the frontend. Admin screens call Laravel paths that mostly do not exist yet.

## Roles

One `users` table. `role` is `user`, `employer`, or `admin`. `is_active` defaults to true. Inactive accounts get HTTP 403 with "Your account has been deactivated."

| Role | Meaning | Login the UI uses |
| --- | --- | --- |
| `user` | Job seeker | `POST /api/auth/user/login` |
| `employer` | Company account | `POST /api/auth/employer/login` |
| `admin` | Staff | `POST /api/admin/login` |

Each login rejects the other roles. A job seeker cannot sign in on the employer form, and an admin cannot sign in on the public form.

Seeded admin (local only): `admin@kjobs.com` / `Password`. The `User` model hashes passwords on write.

## Auth flow

1. The browser calls NextAuth (`/api/auth/[...nextauth]`).
2. Providers in `src/lib/auth-options.ts`: `user-credentials`, `employer-credentials`, `admin-credentials`.
3. `src/lib/auth-credentials.ts` POSTs to Laravel and checks the returned role.
4. Laravel returns a Sanctum plain-text token. NextAuth stores it on the JWT as `accessToken` and the mapped user on `token.user`.
5. `src/fetch/fetch.ts` sends `Authorization: Bearer <token>`.
6. Logout deletes the current Sanctum token (`POST /api/auth/logout` or `POST /api/admin/logout`), then clears the NextAuth session.

The returned NextAuth user must include `id`. `authorizeCredentials` sets `id` from the mapped API user.

Public `/login` and `/register` are the real screens (`PublicLoginForm`, `PublicRegisterForm`). `/user/login`, `/user/register`, `/employer/login`, and `/employer/register` redirect there with `?role=`.

`src/proxy.ts` is the Next.js 16 request proxy (this project does not use `middleware.ts`):

- `/` sends a signed-in user to their role dashboard.
- Signed-in users are bounced off public auth pages.
- `/admin/**` requires `admin`.
- `/user/**` (except the old login/register URLs) requires `user`.
- `/employer/**` (except the old login/register URLs) requires `employer`.

## What Laravel actually implements

Routes live in `kjobs-backend/routes/api.php`. Every JSON body uses `App\Helpers\ApiResponse`:

```json
{ "status": true, "message": "...", "data": {}, "errors": null }
```

Failures set `status` false, `data` null, and put the detail in `errors`. Unauthenticated API calls return 401 `{ message: "Unauthenticated." }`.

| Method | Path | Behavior |
| --- | --- | --- |
| POST | `/api/register` | Legacy. Accepts `role` of `user` or `employer`. Does **not** create an employer profile. |
| POST | `/api/login` | Legacy. Rejects admins. Does not check role beyond that. |
| POST | `/api/auth/user/register` | Creates `role=user`. Password must be `confirmed`. |
| POST | `/api/auth/user/login` | Only `user`. |
| POST | `/api/auth/employer/register` | Transaction: user (`name` = contact person) plus `employer_profiles` row. |
| POST | `/api/auth/employer/login` | Only `employer`. Loads the profile. |
| POST | `/api/admin/login` | Only `admin`. |
| GET | `/api/user` | Sanctum. Legacy current user. |
| POST | `/api/logout` | Sanctum. Legacy logout. |
| GET | `/api/auth/me` | Sanctum. Adds `employer_profile` for employers. |
| POST | `/api/auth/logout` | Sanctum. Deletes current token. |
| GET | `/api/admin/me` | Sanctum and `isAdmin()`. |
| POST | `/api/admin/logout` | Sanctum and `isAdmin()`. |
| GET | `/api/admin/users` | Sanctum. Paginated users with `role=user`. Query: `search`, `status` (`active` / inactive), `role`, `limit`. |

The frontend also calls admin employer, job, application, and dashboard routes. Those controllers and routes are not in Laravel yet. Do not invent them unless asked.

OpenAPI annotations live under `app/OpenApi/`. Swagger UI is l5-swagger.

## Database

Default connection is SQLite (`kjobs-backend/.env.example`).

`users`: name, unique email, `role` enum, password, `is_active`, email verification timestamp.

`employer_profiles`: `user_id` (cascade), `company_name`, `contact_person_name`, `phone`, nullable description, website, logo.

`job_listings`: `employer_profile_id` (cascade), title, unique `slug`, description, location, nullable `salary_min` / `salary_max` (decimal 10,2), `job_type` (`full-time`, `part-time`, `contract`, `internship`, `remote`; default `full-time`), `experience_level` (`junior`, `mid`, `senior`; default `junior`), `status` (`draft`, `open`, `closed`; default `draft`), nullable `deadline`. Slug is generated from the title on create, and regenerated when the title changes.

`applications`: `job_listing_id`, `user_id` (both cascade), nullable `resume_path` and `cover_letter`, `status` (`applied`, `reviewing`, `shortlisted`, `rejected`, `hired`; default `applied`), `applied_at`. Unique pair of job + user, so a seeker applies once.

`personal_access_tokens` is Sanctum. `jobs` is Laravel's queue table, not job listings.

Seeders: `AdminSeeder`, `JobListingSeeder`, `ApplicationSeeder`.

Known model bug: `EmployerProfile::jobs()` points at `Job::class`. The listing model is `JobListing`.

## Frontend response shape

`src/helper/api-response.ts` maps the Laravel envelope to:

- success: `{ success: true, message, data }`
- failure: `{ success: false, statusCode, message, error }`

Services return that shape. Pages branch on `success`. They do not call `fetch` directly.

`src/utils/endpoint.ts` holds `apiEndpoint` (Laravel paths) and `appRoutes` (Next routes). `replacePathParams` fills `:id`.

`NEXT_PUBLIC_BACKEND_URL` is the Laravel origin with no trailing slash. Requests go to `{origin}/api{path}`.

## Real vs mocked services

Real Laravel calls:

- `auth-service.ts` — register, me, logout
- `user-service.ts`, `employer-service.ts`, `job-listing-service.ts`, `application-service.ts`, `admin-dashboard-service.ts` — admin UI. Only `GET /api/admin/users` exists on the server.

Mocked. Keep the function signatures and swap the body when an API exists. Do not move this data into JSX.

| Service | Storage |
| --- | --- |
| `public-job-service.ts` | `src/data/public-jobs.ts` |
| `public-seeker-service.ts` | `src/data/public-seekers.ts` |
| `saved-jobs-service.ts` | `localStorage` `kjobs.saved-jobs.{userId}` |
| `user-application-service.ts` | `localStorage` `kjobs.user-applications.{userId}` |
| `employer-portal-service.ts` | `localStorage` `kjobs.employer-jobs` and `kjobs.employer-applications`, plus seed jobs |
| `contact-service.ts` | Validates, waits, returns success. Nothing is stored. |

`src/helper/local-store.ts` is the localStorage helper (`readStore`, `writeStore`, `delay`).

## Status words do not match yet

Backend application status: `applied`, `reviewing`, `shortlisted`, `rejected`, `hired`.

Frontend `src/enum/status.ts` uses `pending`, `reviewed`, `shortlisted`, `rejected`, `hired`.

Backend job status includes `draft`. The frontend job enum is only `open` and `closed`.

Do not silently rename one side. Map them when the portal stops using mocks.

## Pages

Public layout (`PublicNavbar` + `PublicFooter`), dark hero navbar:

`/`, `/about`, `/contact`, `/jobs`, `/jobs/[id]`, `/job-seekers`, `/employers/[id]`, `/login`, `/register`, `/forgot-password`, `/reset-password`.

Job seeker portal (`PortalTopbar`, sidebar from `lg`, horizontal chips below):

`/user/dashboard`, `/user/profile`, `/user/applications`, `/user/applications/[id]`, `/user/saved-jobs`, `/user/notifications`, `/user/settings`.

Employer portal, same chrome:

`/employer/dashboard`, `/employer/profile`, `/employer/jobs`, `/employer/jobs/create`, `/employer/jobs/[id]`, `/employer/jobs/[id]/edit`, `/employer/jobs/[id]/applications`, `/employer/applications`, `/employer/applications/[id]`, `/employer/settings`.

Admin (do not restyle unless asked): `/admin/login`, `/admin/dashboard`, and CRUD under `/admin/users`, `/admin/employers`, `/admin/job-listings`, `/admin/applications`.

## Business rules already in the UI

- Registering as an employer sends `company_name`, `email`, `contact_person_name`, `password`, `password_confirmation`. The backend copies the contact name onto `users.name`.
- Registering as a job seeker sends `name`, `email`, `password`, `password_confirmation`.
- After register, the form signs in with the matching NextAuth provider and sends the user to that role's dashboard.
- Public "View profile" on a seeker card goes to `/login?role=employer`. There is no public seeker profile API.
- Applying and saving jobs writes localStorage for the current user id. It does not hit `applications`.
- Employer job create/edit and application status changes write the employer localStorage keys, not `job_listings`.
- Contact does not email anyone.
- Forgot / reset password pages exist in the UI. There is no reset API wired up.
- Home redirects authenticated users away, so marketing home is for guests.

## Practices

- Tailwind v4 via `@import "tailwindcss"` and `@theme inline` in `src/app/globals.css`. No Bootstrap.
- shadcn-style primitives in `src/components/ui`. Admin uses them. Public pages often use explicit hex classes (`text-[#64748B]`) because some token utilities were missing from the built CSS.
- Brand tokens: navy `#191C33`, navy-2 `#243B6B`, royal `#2F5BDE`, sky `#38BDF8`, indigo `#6366F1`, surface `#F8FAFC`, secondary text `#64748B`, support text `#475569`.
- Fonts: Inter body, Poppins (`font-ui`) labels and buttons, Anton (`font-display`) marketing headings.
- Public form classes live in `src/components/public/form-field.ts`.
- Role cards: `src/components/auth/AuthRoleSelector.tsx`. Selected card is `#E0EDFF` with a `#2F5BDE` icon tile. Contact uses compact buttons, not those cards.
- "View Job" and "View profile" use `bg-[rgba(47,91,222,0.08)]` and darken to `0.18` on hover.
- Lists need loading, empty, and error states.
- Icons: Lucide. Some marketing tiles still use the emoji from the Figma file.
- Admin confirm dialog variant for a destructive confirm is `danger` (renamed from `nla-delete`). `restore` is not a button variant; the dialog maps it to `default`.
- `src/components/ui/tabs.tsx` imports `@radix-ui/react-tabs`, not the `radix-ui` meta package.

## Leftovers from an older template

Do not build on these. They are not KJobs:

- `src/helper/meal.ts`, `school.ts`, `course-module.ts`, `subscription.ts`, `subscription-display.ts`, `subscription-history-mapper.ts`, `billing-invoice.ts` import types that are not in this repo.
- `src/types/school.ts` and several files under `public/images` (WellSnax artwork).
- Label variants that belonged to that template were removed. Do not add `nlaForm`, `schoolForm`, or `quizForm` back.

## Design source

Figma Make file `iSe3K9bSS0OjyfxHCzP8Ey` (KJobs marketing site). It covers public pages plus login and register. Dashboards reuse that visual system. The admin panel is a separate older UI.

## Local run

Frontend: `kjobs-frontend`, `npm run dev` → `http://localhost:3000`. Env: `NEXT_PUBLIC_BACKEND_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.

Backend: `kjobs-backend`, `php artisan serve` → `http://127.0.0.1:8000`. `composer run dev` also starts queue, logs, and Vite. API prefix is `/api`. Health check is `/up`.
