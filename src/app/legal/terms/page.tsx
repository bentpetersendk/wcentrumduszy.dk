import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getContentBySlug } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Terms & Conditions"
};

export default async function TermsPage() {
  const content = await getContentBySlug({ slug: "legal/terms", type: "page", status: "published" });
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
