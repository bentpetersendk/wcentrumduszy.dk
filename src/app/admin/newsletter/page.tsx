import { AdminShell } from "@/components/admin/AdminShell";
import { getNewsletterSubscribers } from "@/lib/cms/queries";

export default async function AdminNewsletterPage() {
  const subscribers = await getNewsletterSubscribers();

  return (
    <AdminShell title="Newsletter" description="Manage subscribers, consent, source page, unsubscribed state, and exports.">
      <div className="divide-y divide-border rounded-md border border-border bg-surface">
        {subscribers.length ? subscribers.map((subscriber) => (
          <article key={subscriber.id} className="grid gap-2 p-5 sm:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-small text-text">{subscriber.email}</h2>
              <p className="mt-1 text-small text-text-muted">{subscriber.sourcePath ?? "Unknown source"}</p>
            </div>
            <p className="text-caption uppercase text-text-muted">{subscriber.unsubscribedAt ? "Unsubscribed" : "Active"}</p>
          </article>
        )) : (
          <div className="p-6">
            <h2 className="font-display text-3xl text-text">No subscribers yet</h2>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
