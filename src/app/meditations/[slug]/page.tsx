import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/public/DetailPage";
import { getContentBySlug, getPublished, meditations, siteUrl } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublished(meditations).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug(meditations, slug);
  return {
    title: content?.seo.title,
    description: content?.seo.description,
    alternates: { canonical: content ? `${siteUrl}${content.seo.canonical}` : undefined }
  };
}

export default async function MeditationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(getPublished(meditations), slug);
  if (!content) notFound();
  return <DetailPage content={content} />;
}
