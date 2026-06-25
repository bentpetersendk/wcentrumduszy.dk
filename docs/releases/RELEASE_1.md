# Release 1 — Homepage Launch on GitHub Pages

**Date:** 2026-06-25/26
**Release manager:** Claude (acting as Release Manager, on request)
**Live URL:** https://bentpetersendk.github.io/wcentrumduszy.dk/

## Summary

Merged all completed phases (Phase 1 product spec, Phase 3 Milestone 1 project setup, Phase 1.5 design system, Phase 2 homepage + GitHub Pages deployment infrastructure) into `main` in dependency order, verified the build, and confirmed automatic GitHub Pages deployment via GitHub Actions. Following the release, fixed every issue surfaced by a Lighthouse audit of the live site down to a single residual performance gap, documented below.

## Merged Branches

`main` was 1 commit behind the rest of the project (only the initial Phase 1 repo scaffold). Four PRs were merged in dependency order, using merge commits (no squashing) to preserve full history:

| Order | PR | Branch | Title | Merge commit |
|---|---|---|---|---|
| 1 | [#1](https://github.com/bentpetersendk/wcentrumduszy.dk/pull/1) | `phase-1-product-spec` | Phase 1 product discovery and website specification | `786f4d1` |
| 2 | [#2](https://github.com/bentpetersendk/wcentrumduszy.dk/pull/2) | `phase-3-milestone-1-setup` | Phase 3 Milestone 1: project setup and layout shell | `ae3d3c7` |
| 3 | [#3](https://github.com/bentpetersendk/wcentrumduszy.dk/pull/3) | `phase-1-5-design-system` | Phase 1.5: internal design system | `d833e14` |
| 4 | [#4](https://github.com/bentpetersendk/wcentrumduszy.dk/pull/4) | `phase-2-homepage` | Phase 2: homepage implementation + GitHub Pages deployment | `454ce61` |

Notes on the merge:
- PR #2 and #3 originally targeted intermediate feature branches (a stacked-PR setup), not `main`. Both were retargeted to `main` (`gh pr edit --base main`) before merging, since `delete_branch_on_merge` is disabled on this repo and the original bases would never have reached `main` otherwise.
- No PR existed for `phase-2-homepage`; PR #4 was opened against `main` before merging.
- Every branch in this chain was a strict linear descendant of the previous one (verified via `git merge-base --is-ancestor`), so every merge was conflict-free by construction.
- `phase-1-product-spec` is documentation-only (no `package.json`); lint/typecheck/build were verified on the other three branch tips before merging, and all passed cleanly.

Post-merge fix commits on `main` (see [Lighthouse Audit & Fixes](#lighthouse-audit--fixes)):

| Commit | Description |
|---|---|
| `3dfc7d2` | Fix footer text contrast ratio |
| `818768c` | Remove entrance fade from above-the-fold hero content |
| `78c2794` | Disable prefetch for navigation links to unbuilt pages |
| `67aa18a` | Convert placeholder portraits to WebP |

Final `main` HEAD: **`67aa18a`**

## Deployment

- **URL:** https://bentpetersendk.github.io/wcentrumduszy.dk/
- **Workflow:** [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml), triggered on every push to `main`
- **Status:** Automatic deployment confirmed working — three consecutive pushes to `main` each triggered a workflow run, and all three completed successfully end to end (checkout → install → lint → typecheck → build/export → upload artifact → deploy):
  - [run 28206080102](https://github.com/bentpetersendk/wcentrumduszy.dk/actions/runs/28206080102) — initial merge to `main`
  - [run 28206592907](https://github.com/bentpetersendk/wcentrumduszy.dk/actions/runs/28206592907) — contrast/animation/prefetch fixes
  - [run 28207173754](https://github.com/bentpetersendk/wcentrumduszy.dk/actions/runs/28207173754) — WebP image conversion
- **Local verification on `main`:** `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build` all passed.
- **Live site checks:** homepage, design-system route refreshed at a nested URL, `robots.txt`, `sitemap.xml`, `icon.png` (favicon), CSS, self-hosted fonts, and basePath-prefixed images all return `200`; unknown routes return the custom `404.html`; old (pre-WebP) `.png` portrait URLs correctly return `404` since the export no longer contains them.

## Lighthouse Audit & Fixes

Audited the live homepage three times (after the initial deploy, after the first round of fixes, and after the image conversion) using Lighthouse 12.8.2 against the production URL, mobile defaults with simulated throttling.

| Run | Performance | Accessibility | Best Practices | SEO | LCP |
|---|---|---|---|---|---|
| Initial deploy | 76 | 96 | 96 | 100 | 7.2s |
| After contrast/animation/prefetch fixes | 79 | **100** | **100** | **100** | 5.7s |
| After WebP image conversion | **92** | **100** | **100** | **100** | **3.4s** |

Targets: Performance ≥95, Accessibility/Best Practices/SEO = 100.

**Fixes applied (minimal, behavior/asset-only — no visual redesign):**

1. **Footer contrast (`3dfc7d2`):** `text-muted` (`#6f6a63`) on the footer's `surface-muted` background measured 4.4:1, just under the 4.5:1 AA threshold. Darkened the token by one step to `#6d6861` (4.54:1), imperceptible visually, passes everywhere it's used.
2. **Hero entrance animation (`818768c`):** The hero text and portrait were wrapped in a scroll-triggered fade-in (`opacity: 0 → 1`). Per the Largest Contentful Paint spec, a zero-opacity element isn't counted as painted, so the browser couldn't record LCP until the animation resolved — accounting for 5.2s of the original 7.2s LCP. Since this content is always in the initial viewport (nothing to "reveal" before any scroll occurs), removed the wrapper; final rendered output is pixel-identical, it just appears immediately instead of fading in.
3. **Speculative-prefetch console errors (`78c2794`):** Lighthouse's console-errors audit caught 404s from Next.js prefetching `/about` and `/workshops` — pages that don't exist yet in this phase. Added `prefetch={false}` to all navigation/CTA links pointing at not-yet-built routes. Purely a perf/console-noise fix; has no effect on navigation behavior and nothing to undo once those pages ship.
4. **Placeholder image weight (`67aa18a`):** The 18 watermarked placeholder portraits were unoptimized PNGs (~10MB total, several near 1MB each) — flagged by Lighthouse as the largest single opportunity (`modern-image-formats`, `image-delivery-insight`). Re-encoded all of them to WebP at quality 82 (~824KB total, ~92% smaller) and updated the homepage and design-system references. This is the largest single contributor to the LCP drop from 5.7s to 3.4s. Originals remain recoverable via git history; these are still the same placeholder photography pending replacement with clean originals (per the existing `photos.ts` status note).

## Known Issues

- **Performance is 92/100, short of the ≥95 target.** Remaining Lighthouse opportunities are platform-level, not code-level:
  - `cache-insight` (~476 KiB): GitHub Pages' default `Cache-Control` headers on served assets are shorter than ideal; static hosting on Pages doesn't allow custom response headers, so this isn't fixable from the repo alone.
  - `uses-responsive-images` / residual `image-delivery-insight`: static export (`images.unoptimized: true`, required for GitHub Pages) has no image CDN to generate per-breakpoint resized variants, so the same WebP is served to every viewport.
  - `unused-javascript`: baseline React/Next/Framer Motion runtime weight under Lighthouse's simulated mobile CPU throttling.
  - Closing this gap further would mean either changing hosting platform (see Future Improvements) or removing/restructuring libraries — both beyond "minimal fix" scope for this release.
- **Favicon root-probe 404 (intermittent, not always observed):** browsers sometimes issue an implicit `GET /favicon.ico` at the *origin* root regardless of the page's basePath. On a GitHub Pages *project* site, `https://bentpetersendk.github.io/favicon.ico` is outside this repo's published path, so that probe 404s. The declared `<link rel="icon">` (at the correct basePath-prefixed URL) is what actually renders, and most modern browsers skip the implicit probe when it's present — this only showed up in one of several audit runs. Resolves itself automatically once the custom domain is live, since the repo will then own the true root.
- The site still uses placeholder, watermarked photography throughout (pre-existing, not introduced by this release).

## Future Improvements

- **Custom domain migration** (`wcentrumduszy.dk`): add `public/CNAME`, drop the `NEXT_BASE_PATH` build env var, point DNS at GitHub Pages. Documented in [README.md](../../README.md#moving-to-a-custom-domain-wcentrumduszydk).
- **Vercel migration**, if/when SSR, on-demand image optimization, or a CMS preview flow is needed — see [README.md](../../README.md#future-vercel-migration). Vercel's built-in image optimization and edge caching would likely close the remaining performance gap without further manual work.
- Replace placeholder/watermarked portraits with clean originals (tracked pre-existing item, unrelated to this release).
- Once `/about`, `/workshops`, etc. are built, remove the `prefetch={false}` overrides added in this release — they exist solely to avoid 404 noise for not-yet-built routes.

## Confirmation

GitHub Pages deployment is **working end to end and fully automatic**: every push to `main` runs lint → typecheck → build/export → artifact upload → deploy with no manual steps, and the live site at https://bentpetersendk.github.io/wcentrumduszy.dk/ reflects `main` HEAD (`67aa18a`) as of this report.
