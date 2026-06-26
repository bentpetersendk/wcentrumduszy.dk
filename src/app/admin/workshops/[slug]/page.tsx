import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getContentBySlug, workshops } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return workshops.map((item) => ({ slug: item.slug }));
}

export default async function AdminWorkshopEditor({ params }: PageProps) {
  const { slug } = await params;
  const content = getContentBySlug(workshops, slug);
  if (!content) notFound();

  return (
    <AdminShell title={`${content.title} editor`} description="Edit workshop copy, booking details, FAQ, gallery, SEO, preview, and publication state.">
      <ContentEditor content={content} />
    </AdminShell>
  );
}
