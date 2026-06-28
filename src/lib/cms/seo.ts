import type { Metadata } from "next";
import type { CmsContent } from "@/lib/cms/types";
import { siteUrl } from "@/lib/cms/mapper";

export function metadataFromContent(content: CmsContent): Metadata {
  const title = content.seo.title || content.title;
  const description = content.seo.description || content.excerpt || content.subtitle || content.title;
  const canonicalPath = content.seo.canonical || (content.slug ? `/${content.slug}` : "/");
  const canonicalUrl = new URL(canonicalPath, siteUrl).toString();
  const imageUrl = content.seo.socialImage ? new URL(content.seo.socialImage, siteUrl).toString() : undefined;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "W Centrum Duszy",
      type: content.type === "article" ? "article" : "website",
      images: imageUrl ? [{ url: imageUrl, alt: content.imageAlt || content.title }] : undefined
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined
    }
  };
}
