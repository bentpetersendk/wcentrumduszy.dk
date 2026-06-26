import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { articles, getContentBySlug } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((item) => ({ slug: item.slug }));
}

export default async function AdminArticleEditor({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(articles, slug);
  if (!content) notFound();

  return (
    <AdminShell title={`${content.title} editor`} description="Edit article body blocks, SEO, scheduling, preview, and publication state.">
      <ContentEditor content={content} />
    </AdminShell>
  );
}
