import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { EditorialImage } from "@/components/system/EditorialImage";
import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { getContentBySlug, getMediaAssets } from "@/lib/cms/queries";
import { metadataFromContent } from "@/lib/cms/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getContentBySlug({ slug: "gallery", type: "page", status: "published" });
  return content ? metadataFromContent(content) : {};
}

export default async function GalleryPage() {
  const [content, images] = await Promise.all([
    getContentBySlug({ slug: "gallery", type: "page", status: "published" }),
    getMediaAssets()
  ]);
  if (!content) notFound();

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: content.title }]} />
      <PageHero content={content} />
      <section className="mx-auto max-w-3xl px-5 pb-12 sm:px-8 lg:pb-16">
        <RichTextRenderer blocks={content.body} />
      </section>
      <section className="mx-auto grid max-w-[1100px] gap-5 px-5 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:pb-24">
        {images.map((image) => (
          <figure key={image.id} className="rounded-md border border-border bg-surface p-3">
            <EditorialImage src={image.publicUrl ?? `/${image.path}`} alt={image.alt} className="aspect-[4/5]" />
            <figcaption className="mt-3 px-1 pb-1 text-small text-text-muted">{image.caption}</figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
}
