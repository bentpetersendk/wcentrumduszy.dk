# Mobile QA Report

Date: 2026-06-26

## Scope

Homepage responsive QA, Phase 3 public website route coverage, CMS foundation smoke testing, and production-readiness pass.

## Tested Devices

Playwright device emulation covered:

- iPhone SE, iPhone 12, iPhone 13, iPhone 14, iPhone 15, iPhone 15 Pro, iPhone 15 Pro Max, iPhone 16
- iPad Mini, iPad Air, iPad Pro
- Pixel 7, Pixel 8, Pixel 9
- Samsung Galaxy S23, Samsung Galaxy S24
- Small desktop, laptop, 1440p desktop, ultra-wide desktop

Cross-browser smoke checks ran in Chromium, WebKit, Firefox, mobile Chrome, and mobile Safari projects.

Phase 3 route coverage also included:

- About Joanna, Family Constellations, Workshops, workshop detail, Courses, Meditations, meditation detail
- Articles, article detail, Gallery, FAQ, Contact, Newsletter
- Privacy Policy, Cookie Policy, Terms & Conditions, 404
- Admin dashboard, login, homepage editor, content lists, content editors, media library, messages, newsletter, settings

## Screenshot Evidence

Full-page screenshots were generated for every tested viewport in:

`docs/reviews/screenshots/mobile-qa/`

The screenshot suite scrolls through the page before capture so lazy-loaded photography is present in the evidence.

## Issues Found

- Reduced-motion/device captures exposed blank homepage sections caused by the animated reveal wrapper hydrating differently between server and client.
- Mobile hero felt desktop-led: too much first-screen height, oversized portrait dominance, and CTAs that did not read as deliberate phone controls.
- Mobile section rhythm was too loose, creating avoidable vertical drag on small screens.
- Production placeholder photo labels were visible on editorial images.
- Newsletter read order was awkward on mobile because the form appeared before the context.
- Mobile drawer emitted reduced-motion runtime warnings through Framer Motion.
- Skip-link target could not receive focus reliably.
- Initial Playwright heuristics exposed possible clipping/overflow risks, then were refined to avoid false positives from screen-reader-only text.
- Lighthouse identified the hero portrait as the LCP candidate and requested explicit high priority on the image.
- Phase 3 navigation needed to match the approved public structure and remove Courses from the primary nav.
- New placeholder Courses page needed a real page-level H1 for route/accessibility consistency.
- Admin shell initially introduced a nested main landmark inside the global layout.
- Admin editor label tests exposed ambiguous accessible names around Title/Subtitle.
- A stale Next dev overlay surfaced during Playwright after an earlier editor autosave change; clearing generated state and guarding localStorage parsing resolved the run.

## Improvements Made

- Replaced fragile reveal animation with stable rendered content.
- Removed Framer Motion from the mobile drawer and kept a reduced-motion-safe CSS entrance.
- Tightened mobile hero spacing, CTA stacking, portrait sizing, and headline scale.
- Reduced mobile section padding and improved image widths for portrait-heavy sections.
- Removed placeholder captions from production homepage images.
- Reordered newsletter copy before the form on mobile.
- Added focusability to the main landmark for skip-link navigation.
- Added `fetchPriority="high"` for priority editorial images.
- Added Playwright responsive, screenshot, accessibility, navigation, and performance smoke tests.
- Added the complete Phase 3 public route surface and content-driven detail/list templates.
- Added contact and newsletter form experiences with keyboard coverage and future Supabase storage hooks.
- Added CMS admin shell, login, dashboard, autosaving content editor, publishing controls, media/message/newsletter/settings foundations.
- Added Supabase CMS migration with Auth-linked admin profiles, content entries, media assets, contact messages, newsletter subscribers, site settings, indexes, RLS, and storage buckets.
- Added Vercel deployment configuration while preserving the legacy GitHub Pages static export fallback via `NEXT_OUTPUT=export`.
- Updated sitemap coverage for published content routes.

## Accessibility Results

- Axe accessibility checks passed across the Chromium device matrix and representative public/admin routes across configured browser projects.
- Lighthouse Accessibility: 100.
- Keyboard checks passed for skip link, desktop navigation, and mobile drawer.
- Touch targets and color contrast passed automated checks.
- Reduced-motion behavior verified through Playwright contexts.

## Lighthouse Results

Production-style Lighthouse run against the local Next server on `http://127.0.0.1:3000` using `--throttling-method=provided`:

- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- FCP: 0.1 s
- LCP: 0.1 s
- TBT: 0 ms
- CLS: 0

Report JSON: `docs/reviews/lighthouse-mobile-qa.json`

## Verification Commands

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test:playwright`
- `npm run qa:lighthouse`

All passed.

## Remaining Recommendations

- Connect the Vercel project and Supabase environment variables before enabling live CMS writes.
- Re-run Lighthouse against the live Vercel URL after deployment because CDN headers and remote latency can differ from local serving.
- Consider running the full Playwright suite in CI on release branches; the suite passed locally with 160 executed tests and 165 intentional project/device skips.
