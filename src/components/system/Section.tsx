import type { ReactNode } from "react";

export function ShowcaseSection({
  id,
  title,
  description,
  children
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-caption uppercase text-text-muted">Design system</p>
        <h2 className="mt-2 font-display text-h2 text-text">{title}</h2>
        <p className="mt-4 text-body text-text-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}

