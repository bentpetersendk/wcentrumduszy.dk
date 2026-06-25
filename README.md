# W Centrum Duszy

Production website for Joanna Radek-Petersen and W Centrum Duszy, built with Next.js (App Router) and deployed as a static export to GitHub Pages.

## Repository Structure

- `docs/` - product, content, CMS, design, and technical specifications
- `assets/branding/` - catalogued brand source material and inventory
- `assets/photos/` - Joanna-owned photographs and approved imagery
- `assets/logo/` - supplied logo files and derivatives
- `design/` - design direction, mood boards, and visual explorations
- `wireframes/` - wireframes and admin diagrams
- `research/` - client notes, competitor references, and discovery material
- `src/` - Next.js application source
- `public/` - static assets served as-is (images, brand files)
- `.github/workflows/` - CI/CD: build, verify, and deploy to GitHub Pages

## Local Development

```bash
npm ci
npm run dev
```

The site runs at `http://localhost:3000`.

Useful checks during development:

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
```

## Production Build & Static Export

The site is configured for [Next.js static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) (`output: "export"` in [next.config.ts](next.config.ts)), so a regular production build already produces a fully static site — there's no separate export command in modern Next.js.

```bash
npm run build    # next build -> writes the static site to ./out
npm run export   # alias for npm run build, kept for parity with CI naming
```

Verify the exported site locally before deploying:

```bash
npx serve out
```

### Base path

A GitHub Pages *project* site (`https://bentpetersendk.github.io/wcentrumduszy.dk`) is served from a `/wcentrumduszy.dk` subpath, so the build needs to know its base path:

```bash
NEXT_BASE_PATH=/wcentrumduszy.dk npm run build
```

Leave `NEXT_BASE_PATH` unset for local development and for a custom-domain deployment, where the site is served from the domain root. See [next.config.ts](next.config.ts) and [src/lib/asset-path.ts](src/lib/asset-path.ts) — local images rendered through `next/image` (which runs `unoptimized` for static export) are explicitly prefixed with this base path, since Next does not do this automatically for unoptimized images.

## GitHub Pages Setup

One-time repository configuration (not required again after this):

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.

That's it. From then on, [.github/workflows/deploy.yml](.github/workflows/deploy.yml) handles every deployment automatically.

### What the workflow does

On every push to `main`:

1. Checkout the repository
2. Install dependencies (`npm ci`)
3. Run `npm run lint`
4. Run `npm run typecheck`
5. Run `npm run build` (production build + static export to `out/`)
6. Add `out/.nojekyll` so GitHub Pages serves the `_next/` directory as-is
7. Upload `out/` as the Pages artifact
8. Deploy the artifact to GitHub Pages

Any failing step (lint, typecheck, or build) stops the workflow before anything is deployed — there is no manual deploy step, and a broken `main` never publishes.

### Moving to a custom domain (wcentrumduszy.dk)

The site already targets `https://wcentrumduszy.dk` in its metadata (canonical URLs, sitemap, robots). To switch the live deployment from the GitHub Pages project URL to the custom domain:

1. Add a `public/CNAME` file containing `wcentrumduszy.dk`.
2. Remove the `NEXT_BASE_PATH` env var from the `build` job in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) (or set it to an empty string) so the site builds for the domain root.
3. Point the domain's DNS at GitHub Pages (`ALIAS`/`ANAME` or `A` records per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)), and add the same domain under **Settings → Pages → Custom domain**.

No other code changes are required.

## Branch Strategy

```
develop -> staging -> main
```

- `develop` - active feature work, merged in from topic branches.
- `staging` - integration branch for verifying a release candidate before it goes live.
- `main` - production. Every push to `main` triggers an automatic GitHub Pages deployment.

Only `main` is wired to the deploy workflow. Promote a release by merging `develop` → `staging` → `main` once verified at each stage; never push directly to `main`.

## Future: Vercel Migration

GitHub Pages was chosen for this phase because it's free and zero-maintenance for a static marketing site. If the project later needs server-side rendering, on-demand image optimization, API routes, or a CMS with previews, migrating to Vercel is straightforward:

1. Remove `output: "export"`, `basePath`, and `images.unoptimized` from [next.config.ts](next.config.ts) (or make them conditional) — Vercel runs Next.js natively and doesn't need a static export.
2. Remove the `assetPath()` helper calls (or make them no-ops) since Vercel serves images through the Image Optimization API and doesn't need a basePath workaround.
3. Connect the repository in Vercel and point the custom domain there instead of GitHub Pages.
4. Retire [.github/workflows/deploy.yml](.github/workflows/deploy.yml) (Vercel deploys via its own Git integration).

No content or component changes are needed for this migration — it's purely build/deploy configuration.
