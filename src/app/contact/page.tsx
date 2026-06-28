import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getContentBySlug } from "@/lib/cms/queries";
import { metadataFromContent } from "@/lib/cms/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getContentBySlug({ slug: "contact", type: "page", status: "published" });
  return content ? metadataFromContent(content) : {};
}

export default async function ContactPage() {
  const content = await getContentBySlug({ slug: "contact", type: "page", status: "published" });
  if (!content) notFound();

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: content.title }]} />
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
