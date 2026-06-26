import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getContentBySlug, getContentList } from "@/lib/cms/queries";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const meditations = await getContentList({ type: "meditation" });
  return meditations.map((item) => ({ slug: item.slug }));
}

export default async function AdminMeditationEditor({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContentBySlug({ slug, type: "meditation" });
  if (!content) notFound();

  return (
    <AdminShell title={`${content.title} editor`} description="Edit meditation copy, audio metadata, access level, SEO, preview, and publication state.">
      <ContentEditor content={content} />
    </AdminShell>
  );
}
