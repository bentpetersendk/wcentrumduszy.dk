import type { CmsContent, ContentRow } from "@/lib/cms/types";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wcentrumduszy.dk";

export function mapContentRow(row: ContentRow): CmsContent {
  const canonical = row.seo.canonical ?? (row.slug ? `/${row.slug}` : "/");

  return {
    id: row.id,
    type: row.type,
    slug: row.slug,
    language: row.language,
    translationGroupId: row.translation_group_id,
    status: row.status,
    title: row.title,
    subtitle: row.subtitle ?? "",
    excerpt: row.excerpt ?? "",
    heroImage: row.hero_image_path ?? undefined,
    imageAlt: row.hero_image_alt ?? undefined,
    body: row.body ?? [],
    seo: {
      title: row.seo.title ?? row.title,
      description: row.seo.description ?? row.excerpt ?? row.subtitle ?? row.title,
      canonical,
      socialImage: row.seo.socialImage ?? row.hero_image_path ?? undefined
    },
    updatedAt: row.updated_at,
    publishedAt: row.published_at ?? undefined,
    metadata: row.metadata ?? {}
  };
}
