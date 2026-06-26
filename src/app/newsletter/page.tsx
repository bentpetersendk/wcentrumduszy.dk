import type { Metadata } from "next";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getPage, siteUrl } from "@/lib/content";

const content = getPage("newsletter");

export const metadata: Metadata = {
  title: content?.seo.title,
  description: content?.seo.description,
  alternates: { canonical: `${siteUrl}/newsletter` }
};

export default function NewsletterPage() {
  if (!content) return null;

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
