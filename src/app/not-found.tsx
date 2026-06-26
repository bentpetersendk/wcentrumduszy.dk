import { ButtonLink } from "@/components/system/Button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[760px] px-5 py-20 text-center sm:px-8 lg:py-28">
      <p className="text-caption uppercase text-text-muted">404</p>
      <h1 className="mt-3 text-h1 text-text">This page has moved out of view.</h1>
      <p className="mx-auto mt-5 max-w-xl text-body-large text-text-muted">
        Return to the homepage or write to Joanna if you were looking for something specific.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/" className="w-full sm:w-auto">
          Return home
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" className="w-full sm:w-auto">
          Contact Joanna
        </ButtonLink>
      </div>
    </section>
  );
}
