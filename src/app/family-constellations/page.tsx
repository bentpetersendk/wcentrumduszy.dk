import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getContentBySlug } from "@/lib/cms/queries";
import { metadataFromContent } from "@/lib/cms/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getContentBySlug({ slug: "family-constellations", type: "page", status: "published" });
  return content ? metadataFromContent(content) : {};
}

export default async function FamilyConstellationsPage() {
  const content = await getContentBySlug({ slug: "family-constellations", type: "page", status: "published" });
  if (!content) notFound();

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: content.title }]} />
      <PageHero content={content} />
      <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-8 lg:pb-24">
        <RichTextRenderer blocks={content.body} />
      </section>
    </div>
  );
}
