import { AdminShell } from "@/components/admin/AdminShell";
import { EditorialImage } from "@/components/system/EditorialImage";
import { galleryCollections } from "@/lib/content";

export default function AdminGalleryPage() {
  const images = galleryCollections.flatMap((collection) => collection.images);

  return (
    <AdminShell title="Media library" description="Upload, organize, replace, and describe photography through Supabase Storage.">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <article key={image.src} className="rounded-md border border-border bg-surface p-4">
            <EditorialImage src={image.src} alt={image.alt} aspect="wide" />
            <h2 className="mt-4 text-small text-text">{image.caption}</h2>
            <p className="mt-1 break-all text-xs text-text-muted">{image.src}</p>
          </article>
        ))}
      </section>
    </AdminShell>
  );
}
