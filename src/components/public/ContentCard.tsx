import { ButtonLink } from "@/components/system/Button";
import { EditorialImage } from "@/components/system/EditorialImage";
import type { OfferContent } from "@/lib/content";

export function ContentCard({ item, href, cta = "Read more" }: { item: OfferContent; href: string; cta?: string }) {
  return (
    <article className="grid gap-5 rounded-md border border-border bg-surface p-5 sm:grid-cols-[0.42fr_1fr]">
      {item.heroImage ? (
        <EditorialImage src={item.heroImage} alt={item.imageAlt ?? ""} aspect="landscape" />
      ) : null}
      <div className="flex flex-col">
        <p className="text-caption uppercase text-text-muted">{item.type}</p>
        <h2 className="mt-2 font-display text-3xl leading-tight text-text">{item.title}</h2>
        <p className="mt-3 text-small text-text-muted">{item.excerpt}</p>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-caption text-text-muted">
          {item.date ? <span>{item.date}</span> : null}
          {item.duration ? <span>{item.duration}</span> : null}
          {item.category ? <span>{item.category}</span> : null}
          {item.status !== "published" ? <span>Draft preview</span> : null}
        </div>
        <ButtonLink href={href} variant="text" className="mt-auto pt-6">
          {cta}
        </ButtonLink>
      </div>
    </article>
  );
}
