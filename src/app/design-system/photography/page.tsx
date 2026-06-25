import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShowcaseSection } from "@/components/system/Section";
import { joannaPhotos } from "@/lib/design-system/photos";

const previewFrames = [
  { name: "Hero desktop", className: "aspect-[16/10] md:col-span-2" },
  { name: "Hero mobile", className: "aspect-[4/5]" },
  { name: "Card", className: "aspect-[4/3]" },
  { name: "About", className: "aspect-[3/4]" },
  { name: "Workshop", className: "aspect-[16/9]" },
  { name: "Gallery", className: "aspect-square" }
];

export default function PhotographyPlaygroundPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-[1360px] px-5 py-14 sm:px-8 lg:py-20">
        <Link
          href="/design-system"
          className="rounded-sm text-small text-text-muted underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          Back to design system
        </Link>
        <header className="mt-8 max-w-4xl">
          <p className="text-caption uppercase text-text-muted">Photography playground</p>
          <h1 className="mt-3 text-display text-text">Joanna image system</h1>
          <p className="mt-6 text-body-large text-text-muted">
            Every supplied image is shown with production-use recommendations, crop tests, overlays, and safe-zone
            guides. All current images are watermarked placeholders awaiting clean originals.
          </p>
        </header>

        <ShowcaseSection
          id="all-photographs"
          title="All Supplied Photographs"
          description="Use these images as art-direction references until clean originals are supplied."
        >
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {joannaPhotos.map((photo) => (
              <article key={photo.id} className="overflow-hidden rounded-md border border-border bg-surface">
                <div className="relative aspect-[4/5] bg-surface-muted">
                  <Image
                    src={photo.src}
                    alt={`${photo.title}, Joanna Radek-Petersen`}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-sm bg-error px-2 py-1 text-caption text-surface">
                    Placeholder
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-3xl text-text">{photo.title}</h2>
                  <p className="mt-2 text-small text-text-muted">{photo.recommendedUse}</p>
                  <p className="mt-4 rounded-sm bg-surface-muted p-3 text-caption text-text-muted">{photo.status}</p>
                </div>
              </article>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="crop-previews"
          title="Crop Previews"
          description="Desktop, tablet, mobile, hero, card, about, workshop, gallery, overlay, and safe crop guides."
        >
          <div className="space-y-10">
            {joannaPhotos.slice(0, 6).map((photo) => (
              <article key={photo.id} className="rounded-md border border-border bg-surface p-5">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-3xl text-text">{photo.title}</h2>
                    <p className="text-small text-text-muted">{photo.recommendedUse}</p>
                  </div>
                  <span className="rounded-sm bg-error px-2 py-1 text-caption text-surface">Watermarked</span>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {previewFrames.map((frame, index) => (
                    <div key={frame.name} className={frame.className}>
                      <div className="relative h-full overflow-hidden rounded-sm bg-surface-muted">
                        <Image src={photo.src} alt="" fill sizes="33vw" className="object-cover" />
                        {index === 0 ? (
                          <>
                            <div className="absolute inset-4 border border-dashed border-surface/90" />
                            <div className="absolute inset-y-0 left-0 w-1/3 bg-text/30" />
                            <div className="absolute bottom-4 left-4 max-w-[55%] text-surface">
                              <p className="font-display text-3xl leading-none">Text overlay</p>
                              <p className="mt-2 text-caption">Check face and copy safety.</p>
                            </div>
                          </>
                        ) : null}
                        {index === 1 ? <div className="absolute inset-0 bg-surface/35" /> : null}
                        {index === 2 ? <div className="absolute inset-0 bg-text/35" /> : null}
                        <span className="absolute right-2 top-2 rounded-sm bg-surface/90 px-2 py-1 text-caption text-text">
                          {frame.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="replacement-list"
          title="Replacement List"
          description="Production photography requirements before launch."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Clean unwatermarked originals for all selected portraits.",
              "Horizontal homepage hero crop with enough negative space for text.",
              "Workshop group atmosphere with participant consent.",
              "Hands writing in notebook and calm material close-ups.",
              "Room/interior images without Joanna for quiet section transitions.",
              "Nature detail set for meditation pages and article covers."
            ].map((item) => (
              <div key={item} className="rounded-md border border-border bg-surface p-5 text-small text-text-muted">
                {item}
              </div>
            ))}
          </div>
        </ShowcaseSection>
      </div>
    </div>
  );
}

