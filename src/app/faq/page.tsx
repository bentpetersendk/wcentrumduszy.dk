import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getContentBySlug, getPublishedList } from "@/lib/cms/queries";
import { metadataFromContent } from "@/lib/cms/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getContentBySlug({ slug: "faq", type: "page", status: "published" });
  return content ? metadataFromContent(content) : {};
}

export default async function FaqPage() {
  const [content, faqItems] = await Promise.all([
    getContentBySlug({ slug: "faq", type: "page", status: "published" }),
    getPublishedList("faq")
  ]);
  if (!content) notFound();
  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: content.title }]} />
      <PageHero content={content} />
      <section className="mx-auto max-w-3xl px-5 pb-12 sm:px-8 lg:pb-16">
        <RichTextRenderer blocks={content.body} />
      </section>
      <section className="mx-auto max-w-[860px] px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="divide-y divide-border rounded-md border border-border bg-surface">
          {faqItems.map((item) => (
            <article key={item.id} className="p-5 sm:p-6">
              <p className="text-caption uppercase text-text-muted">{String(item.metadata.category ?? "Question")}</p>
              <h2 className="mt-2 font-display text-2xl text-text">{item.title}</h2>
              <p className="mt-3 text-body text-text-muted">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
