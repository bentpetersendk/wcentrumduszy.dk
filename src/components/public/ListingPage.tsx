import { ContentCard } from "@/components/public/ContentCard";
import type { OfferContent } from "@/lib/content";

export function ListingPage({
  title,
  subtitle,
  items,
  basePath,
  cta
}: {
  title: string;
  subtitle: string;
  items: OfferContent[];
  basePath: string;
  cta?: string;
}) {
  return (
    <div>
      <section className="mx-auto max-w-[960px] px-5 py-12 text-center sm:px-8 sm:py-16 lg:py-24">
        <h1 className="text-h1 text-text">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-body-large text-text-muted">{subtitle}</p>
      </section>
      <section className="mx-auto grid max-w-[1000px] gap-5 px-5 pb-16 sm:px-8 lg:pb-24">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} href={`${basePath}/${item.slug}`} cta={cta} />
        ))}
      </section>
    </div>
  );
}
