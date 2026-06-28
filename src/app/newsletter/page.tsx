import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getContentBySlug } from "@/lib/cms/queries";
import { metadataFromContent } from "@/lib/cms/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getContentBySlug({ slug: "newsletter", type: "page", status: "published" });
  return content ? metadataFromContent(content) : {};
}

export default async function NewsletterPage() {
  const content = await getContentBySlug({ slug: "newsletter", type: "page", status: "published" });
  if (!content) notFound();

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: content.title }]} />
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
