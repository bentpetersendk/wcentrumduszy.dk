import { ButtonLink } from "@/components/system/Button";
import { EditorialImage } from "@/components/system/EditorialImage";
import type { PageContent } from "@/lib/content";

export function PageHero({ content }: { content: PageContent }) {
  return (
    <section className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.82fr] lg:gap-12 lg:py-24">
      <div className="max-w-2xl">
        <h1 className="text-h1 text-text">{content.title}</h1>
        <p className="mt-5 text-body-large text-text-muted">{content.subtitle}</p>
        {content.cta ? (
          <ButtonLink href={content.cta.href} className="mt-8 w-full sm:w-auto">
            {content.cta.label}
          </ButtonLink>
        ) : null}
      </div>
      {content.heroImage ? (
        <EditorialImage
          src={content.heroImage}
          alt={content.imageAlt ?? ""}
          priority
          className="mx-auto w-full max-w-[22rem] sm:max-w-[34rem]"
        />
      ) : null}
    </section>
  );
}
