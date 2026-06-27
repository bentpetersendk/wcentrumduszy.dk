import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getContentBySlug } from "@/lib/cms/queries";
import { siteUrl } from "@/lib/cms/mapper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: `${siteUrl}/newsletter` }
};

export default async function NewsletterPage() {
  const content = await getContentBySlug({ slug: "newsletter", type: "page", status: "published" });
  if (!content) notFound();

  return (
    <div>
      <PageHero content={content} />
      <section className="mx-auto grid max-w-[1000px] gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:pb-24">
        <div>
          <RichTextRenderer blocks={content.body} />
        </div>
        <NewsletterForm />
      </section>
    </div>
  );
}
