// next/image with `unoptimized: true` (required for static export) does not
// prefix local image `src` values with `basePath`, unlike regular assets and
// `next/link` hrefs. Routes through this helper to keep images resolvable
// when the site is served from a GitHub Pages project subpath.
const basePath = process.env.NEXT_BASE_PATH ?? "";

export function assetPath(path: string): string {
  return `${basePath}${path}`;
}
