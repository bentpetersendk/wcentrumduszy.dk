import type { MetadataRoute } from "next";
import { allPublicContent, getPublished, siteUrl } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const contentRoutes = getPublished(allPublicContent).map((item) => ({
    url: `${siteUrl}${item.seo.canonical}`,
    lastModified: item.updatedAt,
    changeFrequency: "monthly" as const,
    priority: item.type === "page" ? 0.8 : 0.7
  }));

  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1
    },
    ...contentRoutes,
    {
      url: `${siteUrl}/gallery`,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/faq`,
      changeFrequency: "monthly",
      priority: 0.6
    }
  ];
}
