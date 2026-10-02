# Frontend prompt guide

Copy this into future prompts when asking the agent to change the KJobs user-facing website.

## Always include

1. Read `FRONTEND-STANDARDS.md` first.
2. Inspect the existing file before editing.
3. Keep the admin panel untouched.
4. Keep Tailwind. Do not add Bootstrap or another UI framework.
5. Reuse `src/components/public`, `src/components/portal`, and existing services.
6. If an API exists, use the service layer. If it does not, keep the mock behind the service and do not hardcode data in JSX.
7. Match the Figma marketing language: navy heroes, Anton display headings, Poppins UI, royal CTAs, `rounded-2xl` cards.
8. Every new list/detail page needs loading, empty, and error states.
9. Use Lucide icons.
10. Verify desktop and mobile if the change is visual.

## Safe to change

- `src/app/(pages)/(public)/**`
- `src/app/(pages)/user/**`
- `src/app/(pages)/employer/**`
- `src/components/public/**`
- `src/components/portal/**`
- `src/components/auth/**`
- `src/components/home/**`
- `src/components/jobs/**`
- `src/components/seekers/**`
- `src/components/employers/**`
- `src/services/public-job-service.ts`
- `src/services/saved-jobs-service.ts`
- `src/services/user-application-service.ts`
- `src/services/employer-portal-service.ts`
- `src/services/contact-service.ts`
- `src/services/public-seeker-service.ts`

## Do not change unless explicitly requested

- `src/app/(pages)/admin/**`
- `src/components/admin-*`
- `src/components/ui/*` shared primitives used by admin
- Laravel backend routes or admin APIs

## Design source

Figma Make: [KJobs Marketing Website Design](https://www.figma.com/make/iSe3K9bSS0OjyfxHCzP8Ey/KJobs-Marketing-Website-Design)

The Figma file covers public marketing + login/register. Authenticated dashboards follow the same visual system because those screens were not in the file.

## Example prompt

```text
Follow FRONTEND-STANDARDS.md.
Add a filters drawer to /jobs.
Reuse JobCard, JobSearchBar, and public-job-service.
Do not touch admin.
Do not introduce Bootstrap.
Handle loading, empty, and error states.
```
