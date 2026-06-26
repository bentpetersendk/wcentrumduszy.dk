# Phase 3.1 Release Notes

Date: 2026-06-26

## Summary

Phase 3.1 converts the CMS foundation into a Supabase-backed publishing platform on the `develop` branch. Production `main` remains untouched.

## Vercel Configuration

- Framework: Next.js
- Build command: `npm run build`
- Install command: `npm ci`
- Output: `.next`
- Development branch: `develop`
- Production branch: `main`
- Pull request previews: enabled
- Automatic development deployments: every push to `develop`

The repository is prepared with `vercel.json`. Live Vercel project linking and deployment still require Vercel account access from the project owner.

## Supabase Configuration

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `CMS_E2E_EMAIL`
- `CMS_E2E_PASSWORD`

Apply migrations:

- `supabase/migrations/001_cms_foundation.sql`
- `supabase/migrations/002_seed_initial_content.sql`

## Database Schema

Core tables:

- `admin_profiles`
- `content_entries`
- `media_assets`
- `contact_messages`
- `newsletter_subscribers`
- `site_settings`

Storage buckets:

- `media`
- `private-media`

Content supports `draft`, `scheduled`, `published`, and `archived` states, language keys for future translation work, metadata JSON for offer-specific fields, and structured rich text blocks.

## Authentication Flow

- `/admin/login` signs in through Supabase Auth.
- `/admin/reset-password` sends Supabase password reset emails.
- `/admin` routes are protected by Next proxy middleware when Supabase env vars are configured.
- Admin shell includes logout.
- Sessions persist through Supabase SSR cookies.

## Publishing Flow

Homepage and content editors now save through Supabase server actions:

1. Save Draft
2. Preview
3. Publish
4. Unpublish

Autosave writes to Supabase and displays `Saving...`, `Saved`, or `Error`.

## Implemented Supabase Writes

- Homepage/page content save and publish state
- Workshop/article/meditation CRUD drafts
- Contact form submissions
- Newsletter subscribers
- Media uploads/deletes through Supabase Storage

## Deployment URL

Pending. Vercel project linking and environment variables require account credentials not present in this workspace.

## Verification

Passed locally:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Blocked locally:

- `npm run test:playwright` could not be started because the approval system rejected browser execution due to the current usage-limit gate.

The Playwright suite now includes live CMS E2E coverage for login, homepage editing, publishing, content creation, gallery access, and logout. Those tests run when Supabase test credentials are configured.

## Remaining Work

- Connect the GitHub repository to Vercel.
- Set `develop` as the live development deployment branch.
- Add Supabase env vars to Vercel development and preview environments.
- Apply Supabase migrations and create the admin user.
- Run Playwright with `CMS_E2E_EMAIL` and `CMS_E2E_PASSWORD`.
- Verify the live development deployment manually before considering a production merge.
