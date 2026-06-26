import { PageHero } from "@/components/public/PageHero";
import { RichTextRenderer } from "@/components/public/RichTextRenderer";
import { ButtonLink } from "@/components/system/Button";
import type { OfferContent } from "@/lib/content";

export function DetailPage({ content }: { content: OfferContent }) {
  const facts = [
    ["Format", content.format],
    ["Theme", content.theme],
    ["Date", content.date],
    ["Time", content.time],
    ["Location", content.location],
    ["Language", content.languageLabel],
    ["Capacity", content.capacity],
    ["Price", content.price],
    ["Duration", content.duration],
    ["Access", content.accessLevel]
  ].filter(([, value]) => Boolean(value));

  return (
    <div>
      <PageHero content={content} />
      <section className="mx-auto grid max-w-[1100px] gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_18rem] lg:pb-24">
        <article className="max-w-3xl">
          <RichTextRenderer blocks={content.body} />
          {content.faq?.length ? (
            <div className="mt-12">
              <h2 className="text-h2 text-text">Questions</h2>
              <div className="mt-6 divide-y divide-border rounded-md border border-border bg-surface">
                {content.faq.map((item) => (
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
          {content.cta ? (
            <ButtonLink href={content.cta.href} className="mt-6 w-full">
              {content.cta.label}
            </ButtonLink>
          ) : null}
        </aside>
      </section>
    </div>
  );
}
