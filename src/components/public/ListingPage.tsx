import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { ContentCard } from "@/components/public/ContentCard";
import type { CmsContent } from "@/lib/cms/types";

export function ListingPage({
  overview,
  items,
  basePath,
  cta
}: {
  overview: CmsContent;
  items: CmsContent[];
  basePath: string;
  cta?: string;
}) {
  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: overview.title }]} />
      <section className="mx-auto max-w-[960px] px-5 py-12 text-center sm:px-8 sm:py-16 lg:py-24">
        <h1 className="text-h1 text-text">{overview.title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-body-large text-text-muted">{overview.subtitle}</p>
        {overview.excerpt ? <p className="mx-auto mt-4 max-w-2xl text-body text-text-muted">{overview.excerpt}</p> : null}
      </section>
      <section className="mx-auto grid max-w-[1000px] gap-5 px-5 pb-16 sm:px-8 lg:pb-24">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} href={`${basePath}/${item.slug}`} cta={cta} />
        ))}
      </section>
    </div>
  );
}
