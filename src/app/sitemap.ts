import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/cms/mapper";
import { getContentList } from "@/lib/cms/queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContentList({ status: "published" });
  const routes = new Map<string, MetadataRoute.Sitemap[number]>();

  routes.set(siteUrl, {
    url: siteUrl,
    changeFrequency: "monthly",
    priority: 1
  });

  for (const item of content) {
    routes.set(`${siteUrl}${item.seo.canonical}`, {
      url: `${siteUrl}${item.seo.canonical}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: item.type === "page" ? 0.8 : 0.7
    });
  }

  return [...routes.values()];
}
