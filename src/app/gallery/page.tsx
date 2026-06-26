import type { Metadata } from "next";
import { EditorialImage } from "@/components/system/EditorialImage";
import { galleryCollections } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Portraits and visual moments from W Centrum Duszy."
};

export default function GalleryPage() {
  const images = galleryCollections.flatMap((collection) => collection.images);

  return (
    <div>
      <section className="mx-auto max-w-[900px] px-5 py-12 text-center sm:px-8 sm:py-16 lg:py-24">
        <h1 className="text-h1 text-text">Gallery</h1>
        <p className="mx-auto mt-5 max-w-2xl text-body-large text-text-muted">
          Portraits and quiet visual moments that carry the atmosphere of W Centrum Duszy.
        </p>
      </section>
      <section className="mx-auto grid max-w-[1100px] gap-5 px-5 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:pb-24">
        {images.map((image) => (
          <figure key={image.src} className="rounded-md border border-border bg-surface p-3">
            <EditorialImage src={image.src} alt={image.alt} className="aspect-[4/5]" />
            <figcaption className="mt-3 px-1 pb-1 text-small text-text-muted">{image.caption}</figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
}
