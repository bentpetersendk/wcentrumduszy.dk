import { AdminShell } from "@/components/admin/AdminShell";
import { uploadMediaForm, deleteMediaAssetForm } from "@/lib/cms/actions";
import { getMediaAssets } from "@/lib/cms/queries";
import { Button } from "@/components/system/Button";
import { TextInput } from "@/components/system/FormControls";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await getMediaAssets();

  return (
    <AdminShell title="Media library" description="Upload, organize, replace, and describe photography through Supabase Storage.">
      <form action={uploadMediaForm} className="mb-8 grid gap-5 rounded-md border border-border bg-surface p-6" aria-label="Upload media">
        <input
          name="file"
          type="file"
          accept="image/*,audio/*"
          className="min-h-14 rounded-md border border-border bg-background px-4 py-3 text-small text-text"
          required
        />
        <div className="grid gap-5 md:grid-cols-3">
          <TextInput id="media-folder" name="folder" label="Folder" defaultValue="gallery" />
          <TextInput id="media-alt" name="alt" label="Alt text" required />
          <TextInput id="media-caption" name="caption" label="Caption" />
        </div>
        <Button type="submit" className="w-full sm:w-fit">Upload</Button>
      </form>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <article key={image.id} className="rounded-md border border-border bg-surface p-4">
            {image.publicUrl ? (
              <Image src={image.publicUrl} alt={image.alt} width={640} height={400} className="aspect-[16/10] w-full rounded-md object-cover" />
            ) : null}
            <h2 className="mt-4 text-small text-text">{image.caption}</h2>
            <p className="mt-1 break-all text-xs text-text-muted">{image.path}</p>
            <form action={deleteMediaAssetForm.bind(null, image.id, image.bucket, image.path)} className="mt-4">
              <Button type="submit" variant="secondary" size="sm">Delete</Button>
            </form>
          </article>
        ))}
      </section>
    </AdminShell>
  );
}
