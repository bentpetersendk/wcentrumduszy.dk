import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getContentBySlug } from "@/lib/cms/queries";
import { siteUrl } from "@/lib/cms/mapper";

export const metadata: Metadata = {
  alternates: { canonical: `${siteUrl}/family-constellations` }
};

export default async function FamilyConstellationsPage() {
  const content = await getContentBySlug({ slug: "family-constellations", type: "page", status: "published" });
  if (!content) notFound();

  return (
    <div>
      <PageHero content={content} />
      <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-8 lg:pb-24">
        <RichTextRenderer blocks={content.body} />
      </section>
    </div>
  );
}
