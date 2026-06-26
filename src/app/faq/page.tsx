import type { Metadata } from "next";
import { getPublishedList } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about W Centrum Duszy."
};

export default async function FaqPage() {
  const faqItems = await getPublishedList("faq");
  return (
    <div>
      <section className="mx-auto max-w-[900px] px-5 py-12 text-center sm:px-8 sm:py-16 lg:py-24">
        <h1 className="text-h1 text-text">FAQ</h1>
        <p className="mx-auto mt-5 max-w-2xl text-body-large text-text-muted">
          Short answers for people beginning gently.
        </p>
      </section>
      <section className="mx-auto max-w-[860px] px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="divide-y divide-border rounded-md border border-border bg-surface">
          {faqItems.map((item) => (
            <article key={item.id} className="p-5 sm:p-6">
              <p className="text-caption uppercase text-text-muted">{String(item.metadata.category ?? "Question")}</p>
              <h2 className="mt-2 font-display text-2xl text-text">{item.title}</h2>
              <p className="mt-3 text-body text-text-muted">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
