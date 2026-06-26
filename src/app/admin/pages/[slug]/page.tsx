import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getContentBySlug, getContentList } from "@/lib/cms/queries";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pages = await getContentList({ type: "page" });
  return pages.map((page) => ({ slug: page.slug.split("/").at(-1) || "home" }));
}

export default async function AdminPageEditor({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContentBySlug({ slug: slug === "home" ? "" : slug, type: "page" }) ?? await getContentBySlug({ slug: `legal/${slug}`, type: "page" });
  if (!content) notFound();

  return (
    <AdminShell title={`${content.title} editor`} description="Edit structured page blocks, media, SEO, status, preview, and translations.">
      <ContentEditor content={content} />
    </AdminShell>
  );
}
