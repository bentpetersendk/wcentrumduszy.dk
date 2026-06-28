import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/public/DetailPage";
import { getRelatedContent } from "@/lib/cms/related";
import { getContentBySlug, getPublishedList } from "@/lib/cms/queries";
import { metadataFromContent } from "@/lib/cms/seo";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContentBySlug({ slug, type: "workshop", status: "published" });
  return content ? metadataFromContent(content) : {};
}

export default async function WorkshopDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [content, workshops, articles, meditations] = await Promise.all([
    getContentBySlug({ slug, type: "workshop", status: "published" }),
    getPublishedList("workshop"),
    getPublishedList("article"),
    getPublishedList("meditation")
  ]);
  if (!content) notFound();
  const related = getRelatedContent(content, [...workshops, ...articles, ...meditations], 3);
  return <DetailPage content={content} related={related} />;
}
