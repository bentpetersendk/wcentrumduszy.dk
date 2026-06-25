import type { ReactNode } from "react";

export function SystemCard({
  title,
  meta,
  children,
  footer,
  className = ""
}: {
  title: string;
  meta?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`rounded-md border border-border bg-surface p-6 transition duration-200 ease-soft hover:-translate-y-0.5 hover:border-text/25 ${className}`}
    >
      {meta ? <p className="mb-3 text-caption uppercase text-text-muted">{meta}</p> : null}
      <h3 className="font-display text-3xl leading-tight text-text">{title}</h3>
      <div className="mt-4 text-base leading-7 text-text-muted">{children}</div>
      {footer ? <div className="mt-6 border-t border-border pt-5">{footer}</div> : null}
    </article>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-md border border-border bg-surface p-6" aria-label="Loading card">
      <div className="h-40 rounded-sm bg-surface-muted motion-safe:animate-pulse" />
      <div className="mt-6 h-4 w-24 rounded bg-surface-muted motion-safe:animate-pulse" />
      <div className="mt-4 h-7 w-3/4 rounded bg-surface-muted motion-safe:animate-pulse" />
      <div className="mt-4 space-y-2">
        <div className="h-3 rounded bg-surface-muted motion-safe:animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-surface-muted motion-safe:animate-pulse" />
      </div>
    </div>
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-surface px-6 py-10 text-center">
      <h3 className="font-display text-3xl text-text">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-base leading-7 text-text-muted">{text}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

