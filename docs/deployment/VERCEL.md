# Vercel Deployment

The Phase 3 target deployment is Vercel with Supabase for Auth, Database, and Storage.

## Project Settings

- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm ci`
- Output directory: `.next`

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL=https://wcentrumduszy.dk`

## Supabase Setup

Apply `supabase/migrations/001_cms_foundation.sql`, then create the first admin user in Supabase Auth. Add a matching row in `public.admin_profiles`.

## Legacy GitHub Pages

The previous GitHub Pages export can still be produced by setting `NEXT_OUTPUT=export` and `NEXT_BASE_PATH=/wcentrumduszy.dk`, but the CMS target is Vercel.
