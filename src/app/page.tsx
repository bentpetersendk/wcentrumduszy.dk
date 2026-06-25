import { ButtonLink } from "@/components/system/Button";
import { EditorialImage } from "@/components/system/EditorialImage";
import { Reveal } from "@/components/system/Reveal";

export default function Home() {
  return (
    <div>
      <section className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1200px] items-center gap-12 px-5 py-16 sm:px-8 lg:min-h-[calc(100svh-88px)] lg:grid-cols-[1fr_0.82fr] lg:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <h1 className="text-display text-text">Return to the quiet center within you.</h1>
            <p className="mt-7 max-w-xl text-body-large text-text-muted">
              W Centrum Duszy is Joanna Radek-Petersen&apos;s space for reflection, guided practice,
              workshops, and personal growth.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/workshops">Explore workshops</ButtonLink>
              <ButtonLink href="/about" variant="secondary">Read about Joanna</ButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-[34rem] lg:ml-auto">
            <div className="absolute -left-6 top-10 hidden h-40 w-24 rounded-md bg-mist/70 lg:block" />
            <EditorialImage
              src="/photos/portraits/joanna-radek-01.png"
              alt="Joanna Radek-Petersen seated in a bright calm room, holding a cup."
              priority
              marker="Placeholder: clean original needed"
              className="relative shadow-soft"
            />
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="trust-heading">
        <Reveal>
          <div className="mx-auto max-w-[760px] text-center">
            <div className="mx-auto mb-8 h-px w-24 bg-border" />
            <h2 id="trust-heading" className="text-h2 text-text">
              You do not need to become someone else.
            </h2>
            <p className="mt-6 text-body-large text-text-muted">
              This is a grounded space to pause, listen, and explore patterns that may still influence
              your life, relationships, and choices.
            </p>
            <a
              href="/about"
              className="mt-8 inline-flex rounded-sm text-small text-text underline underline-offset-4 transition-colors hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            >
              How Joanna works
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
