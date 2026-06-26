import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/public/DetailPage";
import { siteUrl } from "@/lib/cms/mapper";
import { getContentBySlug, getPublishedSlugParams } from "@/lib/cms/queries";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedSlugParams("workshop");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContentBySlug({ slug, type: "workshop", status: "published" });
  return {
    title: content?.seo.title,
    description: content?.seo.description,
    alternates: { canonical: content ? `${siteUrl}${content.seo.canonical}` : undefined }
  };
}

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContentBySlug({ slug, type: "workshop", status: "published" });
  if (!content) notFound();
  return <DetailPage content={content} />;
}
