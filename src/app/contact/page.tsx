import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getPage, siteUrl } from "@/lib/content";

const content = getPage("contact");

export const metadata: Metadata = {
  title: content?.seo.title,
  description: content?.seo.description,
  alternates: { canonical: `${siteUrl}/contact` }
};

export default function ContactPage() {
  if (!content) return null;

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
