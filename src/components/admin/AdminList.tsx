import { ButtonLink } from "@/components/system/Button";
import { StatusPill } from "@/components/admin/StatusPill";
import type { CmsContent } from "@/lib/cms/types";

export function AdminList({ items, basePath }: { items: CmsContent[]; basePath: string }) {
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <ButtonLink href={`${basePath}/new`} variant="secondary">Create new</ButtonLink>
      </div>
      <div className="divide-y divide-border rounded-md border border-border bg-surface">
        {items.map((item) => (
          <article key={item.id} className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl text-text">{item.title}</h2>
                <StatusPill status={item.status} />
              </div>
              <p className="mt-2 text-small text-text-muted">{item.excerpt}</p>
            </div>
            <ButtonLink href={`${basePath}/${item.slug}`} variant="secondary">
              Edit
            </ButtonLink>
          </article>
        ))}
      </div>
    </div>
  );
}
