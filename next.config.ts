import type { NextConfig } from "next";

// Set in CI when deploying to a GitHub Pages *project* site
// (https://<user>.github.io/<repo>). Leave unset for local dev and for a
// custom domain deployment, where the site is served from the root.
const basePath = process.env.NEXT_BASE_PATH ?? "";
const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath,
  trailingSlash: true,
  images: {
    // Keep local image handling compatible with static export fallback and Vercel.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co"
      }
    ]
  }
};

export default nextConfig;
