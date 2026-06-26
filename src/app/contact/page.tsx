import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getContentBySlug } from "@/lib/cms/queries";
import { siteUrl } from "@/lib/cms/mapper";

export const metadata: Metadata = {
  alternates: { canonical: `${siteUrl}/contact` }
};

export default async function ContactPage() {
  const content = await getContentBySlug({ slug: "contact", type: "page", status: "published" });
  if (!content) notFound();

  return (
    <div>
      <PageHero content={content} />
      <section className="mx-auto grid max-w-[1100px] gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:pb-24">
        <div className="max-w-xl">
          <RichTextRenderer blocks={content.body} />
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
