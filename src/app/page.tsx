import { ButtonLink } from "@/components/system/Button";
import { EditorialImage } from "@/components/system/EditorialImage";
import { Reveal } from "@/components/system/Reveal";
import { SystemCard } from "@/components/system/Card";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { getContentBySlug, getPublishedList } from "@/lib/cms/queries";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [home, workshops, meditations, articles] = await Promise.all([
    getContentBySlug({ slug: "", type: "page", status: "published" }),
    getPublishedList("workshop"),
    getPublishedList("meditation"),
    getPublishedList("article")
  ]);

  if (!home) notFound();

  const pathways = [
    ...workshops.map((item) => ({ ...item, href: `/workshops/${item.slug}`, label: "Workshop" })),
    ...meditations.map((item) => ({ ...item, href: `/meditations/${item.slug}`, label: "Meditation" })),
    ...articles.map((item) => ({ ...item, href: `/articles/${item.slug}`, label: "Article" }))
  ].slice(0, 4);

  return (
    <div>
      <section className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 pb-12 pt-10 sm:px-8 sm:py-16 lg:min-h-[calc(100svh-88px)] lg:grid-cols-[1fr_0.95fr] lg:gap-8 lg:py-24">
        <div className="max-w-2xl">
          <h1 className="text-display text-text">{home.subtitle || home.title}</h1>
          <p className="mt-5 max-w-xl text-body-large text-text-muted sm:mt-7">{home.excerpt}</p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <ButtonLink href="/workshops" className="w-full sm:w-auto">Explore workshops</ButtonLink>
            <ButtonLink href="/about" variant="secondary" className="w-full sm:w-auto">Read about Joanna</ButtonLink>
          </div>
        </div>

        {home.heroImage ? (
          <div className="relative mx-auto w-full max-w-[13rem] sm:max-w-[32rem] lg:ml-auto lg:max-w-[39rem]">
            <EditorialImage src={home.heroImage} alt={home.imageAlt ?? ""} priority className="relative shadow-soft" />
          </div>
        ) : null}
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:py-24" aria-labelledby="trust-heading">
        <Reveal>
          <div className="mx-auto max-w-[760px] text-center">
            <div className="mx-auto mb-8 h-px w-24 bg-border" />
            <h2 id="trust-heading" className="text-h2 text-text">You do not need to become someone else.</h2>
            <p className="mt-6 text-body-large text-text-muted">
              This is a grounded space to pause, listen, and explore patterns that may still influence your life, relationships, and choices.
            </p>
            <ButtonLink href="/about" variant="text" className="mt-8">How Joanna works</ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16 lg:py-24" aria-labelledby="offers-heading">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <h2 id="offers-heading" className="text-h2 text-text">Ways to begin gently.</h2>
            <p className="mt-5 text-body text-text-muted">
              The newest published workshops, meditations, and articles from the CMS.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pathways.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <SystemCard
                title={item.title}
                meta={item.label}
                footer={<ButtonLink href={item.href} variant="text">Open</ButtonLink>}
                className="h-full"
              >
                {item.excerpt}
              </SystemCard>
            </Reveal>
          ))}
        </div>
      </section>

      {workshops[0] ? (
        <section className="bg-mist/55 px-5 py-12 sm:px-8 sm:py-16 lg:py-24" aria-labelledby="featured-workshop-heading">
          <div className="mx-auto grid max-w-[1200px] items-center gap-8 sm:gap-10 lg:grid-cols-[1.08fr_1fr]">
            {workshops[0].heroImage ? (
              <Reveal delay={0.1}>
                <EditorialImage src={workshops[0].heroImage} alt={workshops[0].imageAlt ?? ""} aspect="wide" />
              </Reveal>
            ) : null}
            <Reveal>
              <div className="max-w-2xl">
                <p className="text-caption uppercase text-text-muted">Featured workshop</p>
                <h2 id="featured-workshop-heading" className="mt-3 text-h2 text-text">{workshops[0].title}</h2>
                <p className="mt-6 text-body text-text-muted">{workshops[0].excerpt}</p>
                <ButtonLink href={`/workshops/${workshops[0].slug}`} variant="secondary" className="mt-8 w-full sm:w-auto">
                  View details
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[960px] px-5 py-12 sm:px-8 sm:py-16 lg:py-24" aria-labelledby="newsletter-heading">
        <Reveal>
          <div className="rounded-md border border-border bg-surface p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-center">
              <div>
                <p className="text-caption uppercase text-text-muted">Newsletter</p>
                <h2 id="newsletter-heading" className="mt-3 text-h2 text-text">Stay close without deciding today.</h2>
                <p className="mt-5 text-body text-text-muted">
                  Receive quiet notes, new articles, meditations, and workshop updates from W Centrum Duszy.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
