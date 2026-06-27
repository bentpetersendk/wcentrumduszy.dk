import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getContentBySlug } from "@/lib/cms/queries";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export default async function AdminWorkshopEditor({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContentBySlug({ slug, type: "workshop" });
  if (!content) notFound();

  return (
    <AdminShell title={`${content.title} editor`} description="Edit workshop copy, booking details, FAQ, gallery, SEO, preview, and publication state.">
      <ContentEditor content={content} />
    </AdminShell>
  );
}
