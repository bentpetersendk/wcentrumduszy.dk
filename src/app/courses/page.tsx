import type { Metadata } from "next";
import { EmptyState } from "@/components/system/Card";
import { ButtonLink } from "@/components/system/Button";

export const metadata: Metadata = {
  title: "Courses",
  description: "Future reflective courses from W Centrum Duszy."
};

export default function CoursesPage() {
  return (
    <div>
      <section className="mx-auto max-w-[860px] px-5 py-12 text-center sm:px-8 sm:py-16 lg:py-24">
        <h1 className="text-h1 text-text">Courses</h1>
        <p className="mx-auto mt-5 max-w-2xl text-body-large text-text-muted">
          Structured learning paths are prepared in the CMS foundation for future publication.
        </p>
      </section>
      <section className="mx-auto max-w-[860px] px-5 pb-16 sm:px-8 lg:pb-24">
        <EmptyState
          title="Courses are being prepared"
          text="The CMS foundation already supports courses, lessons, access levels, and future premium content."
          action={<ButtonLink href="/newsletter">Join the newsletter</ButtonLink>}
        />
      </section>
    </div>
  );
}
