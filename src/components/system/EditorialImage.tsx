import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

type EditorialImageProps = {
  src: string;
  alt: string;
  aspect?: "portrait" | "landscape" | "square" | "wide";
  priority?: boolean;
  marker?: string;
  className?: string;
};

const aspectClassNames = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/10]"
};

export function EditorialImage({
  src,
  alt,
  aspect = "portrait",
  priority = false,
  marker,
  className = ""
}: EditorialImageProps) {
  return (
    <figure className={`group relative overflow-hidden rounded-md bg-surface-muted ${aspectClassNames[aspect]} ${className}`}>
      <Image
        src={assetPath(src)}
        alt={alt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        sizes="(min-width: 1024px) 44vw, 100vw"
        className="object-cover transition-transform duration-[450ms] ease-soft group-hover:motion-safe:scale-[1.015]"
      />
      <div className="pointer-events-none absolute inset-4 border border-dashed border-surface/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      {marker ? (
        <figcaption className="absolute left-3 top-3 rounded-sm bg-surface/95 px-2.5 py-1.5 text-caption text-text shadow-soft">
          {marker}
        </figcaption>
      ) : null}
    </figure>
  );
}
