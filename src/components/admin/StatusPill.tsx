import type { ContentStatus } from "@/lib/cms/types";

const statusLabels: Record<ContentStatus, string> = {
  draft: "Draft",
  published: "Published",
  scheduled: "Scheduled",
  archived: "Archived"
};

export function StatusPill({ status }: { status: ContentStatus }) {
  return (
    <span className="inline-flex min-h-8 items-center rounded-full border border-border bg-surface-muted px-3 text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
      {statusLabels[status]}
    </span>
  );
}
