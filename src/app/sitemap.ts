import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/cms/mapper";
import { getContentList } from "@/lib/cms/queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContentList({ status: "published" });
  const contentRoutes = content.map((item) => ({
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
