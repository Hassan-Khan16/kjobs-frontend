# KJobs context snapshot

Snapshot date: 7 October 2026. Use this file first when opening the repo in a new IDE.

KJobs is a job platform with three roles: **job seeker** (`user`), **employer**, and **admin**. The repo is two apps:

| Folder | Stack | What it does today |
| --- | --- | --- |
| `kjobs-backend` | Laravel 12, PHP 8.2, Sanctum, SQLite by default, l5-swagger | Auth and one admin list endpoint. Domain tables exist; most job/application APIs do not. |
| `kjobs-frontend` | Next.js 16 App Router, React 19, TypeScript, Tailwind v4, NextAuth v4 | Public marketing site, seeker portal, employer portal, and admin CRUD UI. Only auth (and the admin user list client) talk to Laravel. Everything else is mocked in the browser. |

Design source for the public site is the Figma Make file `iSe3K9bSS0OjyfxHCzP8Ey` (KJobs Website Design). The admin panel was not restyled to that file. Keep Tailwind. Do not add Bootstrap.

## How to run

Backend, from `kjobs-backend`:

```bash
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

API origin is `http://127.0.0.1:8000`. Routes are under `/api`. Health check is `/up`. Swagger UI comes from l5-swagger.

Frontend, from `kjobs-frontend`:

```bash
npm install
npm run dev
```

`.env.example`:

```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me-in-production
```

Seeded admin (password is hashed by the User model cast): `admin@kjobs.com` / `Password`.

## Business model

```text
users (role: admin | employer | user, is_active)
  └── employer_profiles (1:1, only for employers)
        └── job_listings
              └── applications (unique per job + user)
```

- A **user** is a job seeker. Registration sets `role = user` and `is_active = true`.
- An **employer** registration creates the user and an `employer_profiles` row in one DB transaction. `users.name` is the contact person name. Profile fields: `company_name`, `contact_person_name`, `phone`, plus optional `company_description`, `website`, `logo`.
- An **admin** cannot use the public login. Public login rejects admins. Admin login rejects everyone else. Role-specific logins (`/api/auth/user/login`, `/api/auth/employer/login`) also reject the other role.
- Inactive accounts get HTTP 403: "Your account has been deactivated."
- Passwords are hashed via the `password => hashed` cast. Register payloads require `password_confirmation`.
- Job listings belong to an employer profile. Slug is generated from the title on create, and again when the title changes. Status: `draft` (default), `open`, `closed`. Job type: `full-time`, `part-time`, `contract`, `internship`, `remote`. Experience: `junior`, `mid`, `senior`.
- An application is one user per job (`unique job_listing_id + user_id`). Status: `applied` (default), `reviewing`, `shortlisted`, `rejected`, `hired`. Optional `resume_path` and `cover_letter`. `applied_at` defaults to now.
- Deleting a user cascades to their employer profile and applications. Deleting an employer profile cascades to its jobs. Deleting a job cascades to its applications.

Seeders: `AdminSeeder`, `JobListingSeeder`, `ApplicationSeeder`, called from `DatabaseSeeder`.

## What is real vs mocked

**Implemented on the API** (`kjobs-backend/routes/api.php`):

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/api/register` | Legacy. Accepts `role` of `user` or `employer` but does **not** create an employer profile. Frontend does not use this. |
| POST | `/api/login` | Legacy. Rejects admins. Frontend does not use this. |
| POST | `/api/auth/user/register` | Seeker. Body: `name`, `email`, `password`, `password_confirmation`. |
| POST | `/api/auth/user/login` | Seeker only. |
| POST | `/api/auth/employer/register` | Creates user + profile. Body: `company_name`, `email`, `contact_person_name`, `phone` (optional), `password`, `password_confirmation`. |
| POST | `/api/auth/employer/login` | Employer only. |
| POST | `/api/admin/login` | Admin only. |
| GET | `/api/user` | Sanctum. Legacy current user. |
| POST | `/api/logout` | Sanctum. Deletes current token. |
| GET | `/api/auth/me` | Sanctum. User resource; employers also get `employer_profile`. |
| POST | `/api/auth/logout` | Sanctum. |
| GET | `/api/admin/me` | Sanctum + must be admin. |
| POST | `/api/admin/logout` | Sanctum + must be admin. |
| GET | `/api/admin/users` | Sanctum. Job seekers only (`role = user`). Query: `search`, `status` (`active` maps to `is_active`), `role`, `limit`. |

There are **no** API routes yet for job listings, applications, employer management, or admin dashboard stats, even though the tables, models, and frontend clients exist.

**Frontend calls Laravel** for login, register, `/auth/me`, logout, and the admin user list client.

**Frontend is local-only** (see `src/helper/local-store.ts`, keys under `kjobs.*`) for:

- Public job browse and job detail (`public-job-service`, data in `src/data/public-jobs.ts`)
- Public job seekers (`public-seeker-service`, `src/data/public-seekers.ts`)
- Contact form (`contact-service`) — validates and returns a success message, stores nothing
- Seeker applications and saved jobs (`user-application-service`, `saved-jobs-service`)
- Employer jobs, applicants, and status changes (`employer-portal-service`)

Admin screens for employers, job listings, applications, and dashboard stats call `apiEndpoint` paths that the backend does not serve yet. Those calls fail and the UI shows the unavailable-API message.

## Auth flow

1. The public login form picks NextAuth provider `user-credentials` or `employer-credentials`. Admin uses `admin-credentials`.
2. `src/lib/auth-credentials.ts` POSTs to Laravel, checks the returned role, and returns `{ id, user, token: { accessToken } }`.
3. The JWT callback stores `token.user` and `token.accessToken`. The session callback copies them onto `session`.
4. `src/fetch/fetch.ts` sends `Authorization: Bearer <accessToken>` and `Accept: application/json`.
5. `src/proxy.ts` is the Next.js 16 request gate (this project does not use `middleware.ts`):
   - `/` sends a signed-in user to their role dashboard.
   - Signed-in users are bounced off login/register pages.
   - `/admin/*` requires an admin (login page is public).
   - `/user/*` except login/register requires a seeker.
   - `/employer/*` except login/register requires an employer.
   - A wrong role is redirected to that role's login or dashboard.

## API contract

Every JSON response from `App\Helpers\ApiResponse`:

```json
{ "status": true, "message": "…", "data": {}, "errors": null }
```

Failures set `status` false, `data` null, and put details in `errors`. Codes: 401 unauthorized, 403 forbidden, 404 not found, 422 validation.

The frontend maps that envelope in `src/helper/api-response.ts` to:

- success: `{ success: true, message, data }`
- failure: `{ success: false, statusCode, message, error }`

Paginated admin lists use `PaginatedResource`:

```json
{ "items": [], "pagination": { "page": 1, "per_page": 10, "total": 0, "last_page": 1, "has_more": false } }
```

OpenAPI annotations live in `kjobs-backend/app/OpenApi`. Generated spec is `storage/api-docs/api-docs.json`.

## Practices

Backend:

- Controllers stay thin. Validation is a Form Request. Output is an API Resource. Envelope is `ApiResponse`, not ad-hoc `response()->json()`.
- Role checks are `User::isAdmin()`, `isEmployer()`, `isUser()`.
- Multi-row writes use `DB::transaction` (employer register).
- API exceptions render JSON. Unauthenticated API calls return `ApiResponse::unauthorized`, not an HTML redirect (`bootstrap/app.php`).
- Sanctum personal access tokens. Logout deletes the current token only.

Frontend:

- Route and API path constants live in `src/utils/endpoint.ts`. Build URLs with `replacePathParams`. Do not hardcode `/api/...` in components.
- Server talk goes through `src/fetch/fetch.ts` (`get`, `post`, `put`, `patch`) and a function in `src/services/*`. Components do not call `fetch` directly.
- Mocked features keep the same `{ success, message, data }` shape and `delay()` so a later swap to HTTP does not change the page.
- Portal data is per user when a `userId` is passed (`kjobs.user-applications.<id>`).
- Public pages use explicit brand hexes (`#191C33`, `#2F5BDE`, `#64748B`, `#475569`, `#F8FAFC`, `#E5E7EB`, `#E0EDFF`) because some Tailwind token utilities (`text-text-secondary`, `bg-surface-info`) were missing from the compiled CSS during the design pass.
- Admin UI is a separate shell (`AdminSidebar`, shadcn `Sidebar`). Seeker and employer portals use `PortalSidebar` (hidden below `lg`) plus `PortalMobileNav`.
- Toasts go through `handleOpenToast` (`sonner`).

## Known mismatches (do not "fix" blindly)

- `EmployerProfile::jobs()` points at `App\Models\Job`, which does not exist. The model is `JobListing`.
- Frontend `applicationStatus` uses `pending` / `reviewed`. The database uses `applied` / `reviewing`. Frontend `jobListingStatus` omits `draft`.
- `src/helper/meal.ts`, `school.ts`, `subscription.ts`, `subscription-display.ts`, `subscription-history-mapper.ts`, `course-module.ts`, `billing-invoice.ts`, and `src/types/school.ts` are leftovers from another product. They are unused by KJobs and some import missing modules. Same for WellSnax images under `kjobs-frontend/public/images`.
- `GET /api/admin/users` filters `role = user` and then optionally filters `role` again, so an employer/admin role query returns nothing.
- `src/proxy.ts` allows `/forgot-password` through the admin branch via `isAdminAuthPath`, but that page is public, not an admin page.

## Frontend map

| Area | Routes | Main code |
| --- | --- | --- |
| Public | `/`, `/jobs`, `/jobs/[id]`, `/job-seekers`, `/employers/[id]`, `/about`, `/contact`, `/login`, `/register`, `/forgot-password`, `/reset-password` | `src/app/(pages)/(public)`, `src/components/public`, `src/components/home`, `src/components/jobs`, `src/components/seekers`, `src/components/auth` |
| Seeker | `/user/dashboard`, `profile`, `applications`, `saved-jobs`, `notifications`, `settings` | `src/app/(pages)/user`, `src/components/portal` |
| Employer | `/employer/dashboard`, `profile`, `jobs`, `applications`, `settings` | `src/app/(pages)/employer` |
| Admin | `/admin/login`, `dashboard`, `users`, `employers`, `job-listings`, `applications` | `src/app/(pages)/admin`, `src/components/admin-*` |
| Legacy role URLs | `/user/login`, `/user/register`, `/employer/login`, `/employer/register` | `src/app/(pages)/(auth)` |

Brand tokens (also in `src/app/globals.css`): navy `#191C33`, navy-2 `#243B6B`, royal `#2F5BDE`, sky `#38BDF8`, indigo `#6366F1`, surface `#F8FAFC`, secondary text `#64748B`, support text `#475569`.
