import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/public/DetailPage";
import { getContentBySlug, getPublished, siteUrl, workshops } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublished(workshops).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug(workshops, slug);
  return {
    title: content?.seo.title,
    description: content?.seo.description,
    alternates: { canonical: content ? `${siteUrl}${content.seo.canonical}` : undefined }
  };
}

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(getPublished(workshops), slug);
  if (!content) notFound();
  return <DetailPage content={content} />;
}
