import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getContentBySlug, pages } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug.split("/").at(-1) ?? page.slug }));
}

export default async function AdminPageEditor({ params }: PageProps) {
  const { slug } = await params;
  const content = pages.find((page) => page.slug === slug || page.slug.endsWith(`/${slug}`)) ?? getContentBySlug(pages, slug);
  if (!content) notFound();

  return (
    <AdminShell title={`${content.title} editor`} description="Edit structured page blocks, media, SEO, status, preview, and translations.">
      <ContentEditor content={content} />
    </AdminShell>
  );
}
