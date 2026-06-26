import type { Metadata } from "next";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getPage, siteUrl } from "@/lib/content";

const content = getPage("about");

export const metadata: Metadata = {
  title: content?.seo.title,
  description: content?.seo.description,
  alternates: { canonical: `${siteUrl}/about` }
};

export default function AboutPage() {
  if (!content) return null;

  return (
    <div>
      <PageHero content={content} />
      <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-8 lg:pb-24">
        <RichTextRenderer blocks={content.body} />
      </section>
    </div>
  );
}
