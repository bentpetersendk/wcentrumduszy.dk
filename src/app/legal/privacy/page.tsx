import type { Metadata } from "next";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getPage } from "@/lib/content";

const content = getPage("legal/privacy");

export const metadata: Metadata = {
  title: content?.seo.title,
  description: content?.seo.description
};

export default function PrivacyPage() {
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
