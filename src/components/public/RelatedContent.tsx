import { ContentCard } from "@/components/public/ContentCard";
import type { CmsContent } from "@/lib/cms/types";
import { contentPath } from "@/lib/cms/queries";

export function RelatedContent({ title, items }: { title: string; items: CmsContent[] }) {
  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-[1000px] px-5 pb-16 sm:px-8 lg:pb-24">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-h2 text-text">{title}</h2>
      </div>
      <div className="grid gap-5">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} href={contentPath(item)} cta={item.type === "article" ? "Read article" : item.type === "meditation" ? "Open meditation" : "View details"} />
        ))}
      </div>
    </section>
  );
}
