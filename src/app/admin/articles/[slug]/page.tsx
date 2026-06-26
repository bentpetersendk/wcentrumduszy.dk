import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getContentBySlug, getContentList } from "@/lib/cms/queries";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getContentList({ type: "article" });
  return articles.map((item) => ({ slug: item.slug }));
}

export default async function AdminArticleEditor({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContentBySlug({ slug, type: "article" });
  if (!content) notFound();

  return (
    <AdminShell title={`${content.title} editor`} description="Edit article body blocks, SEO, scheduling, preview, and publication state.">
      <ContentEditor content={content} />
    </AdminShell>
  );
}
