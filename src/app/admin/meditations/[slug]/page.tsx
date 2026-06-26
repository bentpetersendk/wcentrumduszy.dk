import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getContentBySlug, meditations } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return meditations.map((item) => ({ slug: item.slug }));
}

export default async function AdminMeditationEditor({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(meditations, slug);
  if (!content) notFound();

  return (
    <AdminShell title={`${content.title} editor`} description="Edit meditation copy, audio metadata, access level, SEO, preview, and publication state.">
      <ContentEditor content={content} />
    </AdminShell>
  );
}
