import type { CmsContent, ContentType } from "@/lib/cms/types";

export function emptyContent(type: ContentType): CmsContent {
  const title = type === "article" ? "New article" : type === "meditation" ? "New meditation" : "New workshop";

  return {
    id: "",
    type,
    slug: `new-${type}`,
    language: "pl",
    translationGroupId: "",
    status: "draft",
    title,
    subtitle: "",
    excerpt: "",
    body: [],
    seo: {
      title,
      description: "",
      canonical: `/${type}s/new-${type}`
    },
    updatedAt: new Date().toISOString(),
    metadata: {}
  };
}
