import type { CmsContent } from "@/lib/cms/types";

function metadataStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.length > 0) : [];
}

export function getRelatedContent(content: CmsContent, candidates: CmsContent[], limit = 3) {
  const explicitSlugs = new Set([
    ...metadataStringArray(content.metadata.relatedArticles),
    ...metadataStringArray(content.metadata.relatedMeditations),
    ...metadataStringArray(content.metadata.relatedWorkshops)
  ]);
  const tags = new Set(metadataStringArray(content.metadata.tags));
  const category = typeof content.metadata.category === "string" ? content.metadata.category : null;

  const explicit = candidates.filter((candidate) => explicitSlugs.has(candidate.slug) && candidate.slug !== content.slug);
  const inferred = candidates.filter((candidate) => {
    if (candidate.slug === content.slug || explicitSlugs.has(candidate.slug)) return false;
    const candidateTags = metadataStringArray(candidate.metadata.tags);
    const sharedTag = candidateTags.some((tag) => tags.has(tag));
    return sharedTag || (category && candidate.metadata.category === category);
  });

  return [...explicit, ...inferred].slice(0, limit);
}
