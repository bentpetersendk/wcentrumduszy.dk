# Vercel Deployment

The Phase 3 target deployment is Vercel with Supabase for Auth, Database, and Storage.

## Project Settings

- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm ci`
- Output directory: `.next`
- Production branch: `main`
- Development branch: `develop`
- Preview deployments: enabled for pull requests
- Automatic deployments: enabled for pushes to `develop`

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL=https://wcentrumduszy.dk`
- `CMS_E2E_EMAIL` for Playwright CMS verification
- `CMS_E2E_PASSWORD` for Playwright CMS verification

## Supabase Setup

Apply migrations in order:

1. `supabase/migrations/001_cms_foundation.sql`
2. `supabase/migrations/002_seed_initial_content.sql`

Then create the first admin user in Supabase Auth. Add a matching row in `public.admin_profiles`.

## Development Deployment

Connect the GitHub repository to Vercel and set `develop` as the active development branch. Every push to `develop` should create or update the live development deployment. Keep `main` protected for production review.

## Legacy GitHub Pages

The previous GitHub Pages export can still be produced by setting `NEXT_OUTPUT=export` and `NEXT_BASE_PATH=/wcentrumduszy.dk`, but the CMS target is Vercel.
