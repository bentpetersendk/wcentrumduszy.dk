import type { NextConfig } from "next";

// Set in CI when deploying to a GitHub Pages *project* site
// (https://<user>.github.io/<repo>). Leave unset for local dev and for a
// custom domain deployment, where the site is served from the root.
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // Next's Image Optimization API requires a server and isn't available
    // on static hosts like GitHub Pages, so images are served unoptimized.
    unoptimized: true
  }
};

export default nextConfig;
