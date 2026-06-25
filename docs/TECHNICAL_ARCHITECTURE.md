# Technical Architecture

## Recommended Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Framer Motion
- Supabase Postgres, Auth, Storage, and Edge Functions where needed
- Vercel hosting and previews
- GitHub source control and CI/CD

## Rationale

Next.js gives strong SEO, fast static and dynamic rendering, image optimization, routing, and Vercel deployment. TypeScript protects the content and admin codebase as the site grows. TailwindCSS supports a consistent design system. Framer Motion gives refined animation with reduced-motion support. Supabase provides a simple Postgres-backed CMS foundation with auth, storage, and future booking/payment data.

## Rendering Strategy

- Public marketing pages: static generation with revalidation.
- Articles: static with revalidation.
- Workshop listings: static with short revalidation.
- Admin: authenticated dynamic rendering.
- Preview mode: authenticated draft rendering.

## Authentication

Use Supabase Auth with email magic link for Joanna. Add role-based access control through a `profiles` table and Row Level Security.

## CMS Architecture

Custom Next.js admin routes read and write Supabase data through typed server actions or API routes. Joanna interacts only with the admin UI.

## Image Optimization

- Store originals in Supabase Storage.
- Generate optimized variants through Next.js Image.
- Require alt text for public images.
- Use responsive sizes and stable aspect ratios.

## SEO

- Editable metadata for every page.
- Open Graph and Twitter card images.
- XML sitemap.
- Robots configuration.
- Structured data for organization, articles, events, courses, and breadcrumbs.
- Per-language canonical and hreflang links.

## Caching

- Use Vercel edge caching for public pages.
- Use tag-based revalidation after publishing.
- Avoid caching admin data in public contexts.

## Deployment

- GitHub repository connected to Vercel.
- `main` deploys to production.
- Feature branches deploy to previews.
- Environment variables stored in Vercel and Supabase, not committed.

## CI/CD

Required checks before merge:

- TypeScript.
- Lint.
- Unit tests when added.
- Accessibility smoke tests for key pages.
- Build verification.

## Security

- Supabase Row Level Security on all tables.
- Admin routes require authenticated owner/editor roles.
- Contact forms need spam protection.
- Secrets never stored in code.
- Backups and export plan for CMS content.

