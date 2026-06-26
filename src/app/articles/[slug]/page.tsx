import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/public/DetailPage";
import { articles, getContentBySlug, getPublished, siteUrl } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublished(articles).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug(articles, slug);
  return {
    title: content?.seo.title,
    description: content?.seo.description,
    alternates: { canonical: content ? `${siteUrl}${content.seo.canonical}` : undefined }
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(getPublished(articles), slug);
  if (!content) notFound();
  return <DetailPage content={content} />;
}
