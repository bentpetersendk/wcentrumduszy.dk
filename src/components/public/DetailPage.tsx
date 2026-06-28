import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { PageHero } from "@/components/public/PageHero";
import { RelatedContent } from "@/components/public/RelatedContent";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { ButtonLink } from "@/components/system/Button";
import type { CmsContent } from "@/lib/cms/types";

export function DetailPage({ content, related = [] }: { content: CmsContent; related?: CmsContent[] }) {
  const facts = [
    ["Format", content.metadata.format],
    ["Theme", content.metadata.theme],
    ["Date", content.metadata.date],
    ["Time", content.metadata.time],
    ["Location", content.metadata.location],
    ["Language", content.metadata.languageLabel],
    ["Capacity", content.metadata.capacity],
    ["Price", content.metadata.price],
    ["Duration", content.metadata.duration],
    ["Access", content.metadata.accessLevel]
  ].filter(([, value]) => typeof value === "string" && value.length > 0) as [string, string][];
  const faq = Array.isArray(content.metadata.faq)
    ? content.metadata.faq.filter((item): item is { question: string; answer: string } => typeof item === "object" && "question" in item && "answer" in item)
    : [];

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          content.type === "workshop"
            ? { label: "Workshops", href: "/workshops" }
            : content.type === "meditation"
              ? { label: "Meditations", href: "/meditations" }
              : { label: "Articles", href: "/articles" },
          { label: content.title }
        ]}
      />
      <PageHero content={content} />
      <section className="mx-auto grid max-w-[1100px] gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_18rem] lg:pb-24">
        <article className="max-w-3xl">
          <RichTextRenderer blocks={content.body} />
          {faq.length ? (
            <div className="mt-12">
              <h2 className="text-h2 text-text">Questions</h2>
              <div className="mt-6 divide-y divide-border rounded-md border border-border bg-surface">
                {faq.map((item) => (
                  <div key={item.question} className="p-5">
                    <h3 className="font-medium text-text">{item.question}</h3>
                    <p className="mt-2 text-small text-text-muted">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </article>
        <aside className="h-fit rounded-md border border-border bg-surface p-6">
          <p className="text-caption uppercase text-text-muted">Details</p>
          <dl className="mt-5 space-y-4">
            {facts.map(([label, value]) => (
              <div key={label} className="border-t border-border pt-4">
                <dt className="text-small text-text">{label}</dt>
                <dd className="mt-1 text-small text-text-muted">{value}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href="/contact" className="mt-6 w-full">
            Ask Joanna
          </ButtonLink>
        </aside>
      </section>
      <RelatedContent title="You may also want to continue here" items={related} />
    </div>
  );
}
