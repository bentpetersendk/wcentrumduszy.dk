import { ButtonLink } from "@/components/system/Button";
import { EditorialImage } from "@/components/system/EditorialImage";
import { Reveal } from "@/components/system/Reveal";
import { SystemCard } from "@/components/system/Card";

const offers = [
  {
    title: "Workshops",
    text: "Small, reflective spaces for guided practice, conversation, and integration.",
    href: "/workshops",
    cta: "View workshops"
  },
  {
    title: "Courses",
    text: "Structured learning paths for returning to yourself with clarity and steadiness.",
    href: "/courses",
    cta: "Explore courses"
  },
  {
    title: "Meditations",
    text: "Quiet audio practices for moments when you need a gentle first step.",
    href: "/meditations",
    cta: "Listen"
  },
  {
    title: "Articles",
    text: "Thoughtful notes on presence, patterns, calm, and personal growth.",
    href: "/articles",
    cta: "Read"
  }
];

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

      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="offers-heading">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <h2 id="offers-heading" className="text-h2 text-text">Ways to begin gently.</h2>
            <p className="mt-5 text-body text-text-muted">
              Different doorways for different moments. You can read, listen, join a group, or simply learn more.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {offers.map((offer, index) => (
            <Reveal key={offer.title} delay={index * 0.05}>
              <SystemCard
                title={offer.title}
                meta="Pathway"
                footer={<ButtonLink href={offer.href} variant="text">{offer.cta}</ButtonLink>}
                className="h-full"
              >
                {offer.text}
              </SystemCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.82fr_1fr] lg:py-28" aria-labelledby="about-heading">
        <Reveal>
          <EditorialImage
            src="/photos/portraits/joanna-radek-11.png"
            alt="Joanna Radek-Petersen smiling softly in natural light."
            marker="Placeholder: clean original needed"
            className="mx-auto max-w-[30rem]"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="max-w-2xl">
            <p className="text-caption uppercase text-text-muted">About Joanna</p>
            <h2 id="about-heading" className="mt-3 text-h2 text-text">A real person holding a calm space.</h2>
            <p className="mt-6 text-body text-text-muted">
              Joanna created W Centrum Duszy to offer a space that is warm but not invasive, deep but not
              overwhelming, personal but still professional.
            </p>
            <p className="mt-5 text-body text-text-muted">
              Her work invites people to pause, listen, and approach their inner life with courage and tenderness.
            </p>
            <ButtonLink href="/about" variant="secondary" className="mt-8">
              Read about Joanna
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="bg-mist/55 px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="featured-workshop-heading">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1fr_0.86fr]">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-caption uppercase text-text-muted">Featured workshop</p>
              <h2 id="featured-workshop-heading" className="mt-3 text-h2 text-text">Returning To Yourself.</h2>
              <p className="mt-6 text-body text-text-muted">
                A small reflective workshop for noticing patterns, creating inner space, and taking one grounded
                step toward change.
              </p>
              <dl className="mt-8 grid gap-4 text-small text-text-muted sm:grid-cols-2">
                <div className="border-t border-border pt-4">
                  <dt className="text-text">Format</dt>
                  <dd className="mt-1">Guided reflection and conversation</dd>
                </div>
                <div className="border-t border-border pt-4">
                  <dt className="text-text">Language</dt>
                  <dd className="mt-1">Polish, with future multilingual support</dd>
                </div>
                <div className="border-t border-border pt-4">
                  <dt className="text-text">Pace</dt>
                  <dd className="mt-1">Small, calm, and practical</dd>
                </div>
                <div className="border-t border-border pt-4">
                  <dt className="text-text">Status</dt>
                  <dd className="mt-1">Booking details to be confirmed</dd>
                </div>
              </dl>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/workshops" variant="secondary">View details</ButtonLink>
                <ButtonLink href="/contact" variant="text">Ask a question</ButtonLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <EditorialImage
              src="/photos/portraits/joanna-radek-13.png"
              alt="Joanna Radek-Petersen preparing materials at a table."
              aspect="landscape"
              marker="Placeholder: clean original needed"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1fr] lg:py-28" aria-labelledby="meditation-heading">
        <Reveal>
          <EditorialImage
            src="/photos/portraits/joanna-radek-16.png"
            alt="Joanna Radek-Petersen seated calmly in a reflective pose."
            marker="Placeholder: clean original needed"
            className="mx-auto max-w-[30rem]"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-md border border-border bg-surface p-7 sm:p-9">
            <p className="text-caption uppercase text-text-muted">A quiet first step</p>
            <h2 id="meditation-heading" className="mt-3 text-h2 text-text">A five-minute pause.</h2>
            <p className="mt-6 text-body text-text-muted">
              A short guided practice for returning to the breath and meeting yourself without needing to solve
              everything at once.
            </p>
            <div className="mt-8 rounded-md bg-background p-5">
              <div className="h-1.5 overflow-hidden rounded-full bg-border" aria-hidden="true">
                <div className="h-full w-1/3 rounded-full bg-clay" />
              </div>
              <div className="mt-3 flex justify-between text-caption text-text-muted">
                <span>Preview</span>
                <span>5 min</span>
              </div>
            </div>
            <ButtonLink href="/meditations" variant="secondary" className="mt-8">
              Listen now
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
