import { AdminShell } from "@/components/admin/AdminShell";
import { StatusPill } from "@/components/admin/StatusPill";
import { getDashboardData } from "@/lib/cms/queries";

export default async function AdminDashboardPage() {
  const data = await getDashboardData();
  const stats = [
    ["Content", data.content.length],
    ["Published", data.published.length],
    ["Drafts", data.drafts.length],
    ["New messages", data.messages.filter((message) => message.status === "new").length],
    ["Subscribers", data.subscribers.filter((subscriber) => !subscriber.unsubscribedAt).length]
  ];

  return (
    <AdminShell
      title="Dashboard"
      description="A production-ready CMS foundation for pages, offers, media, messages, newsletter contacts, settings, previews, publishing, and future translations."
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-md border border-border bg-surface p-5">
            <p className="text-small text-text-muted">{label}</p>
            <p className="mt-2 font-display text-4xl text-text">{value}</p>
          </div>
        ))}
      </section>
      <section className="mt-8 rounded-md border border-border bg-surface p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-3xl text-text">Publishing workflow</h2>
          <StatusPill status="published" />
        </div>
        <p className="mt-4 max-w-3xl text-body text-text-muted">
          Editors can draft, autosave, preview, schedule, publish, archive, and later connect each entry to Danish and English translations.
        </p>
      </section>
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-border bg-surface p-6">
          <h2 className="font-display text-3xl text-text">Recently edited</h2>
          <div className="mt-5 space-y-4">
            {data.recentlyEdited.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 border-t border-border pt-4">
                <div>
                  <p className="text-small text-text">{item.title}</p>
                  <p className="text-xs uppercase text-text-muted">{item.type}</p>
                </div>
                <StatusPill status={item.status} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-border bg-surface p-6">
          <h2 className="font-display text-3xl text-text">New messages</h2>
          <div className="mt-5 space-y-4">
            {data.messages.slice(0, 5).map((message) => (
              <div key={message.id} className="border-t border-border pt-4">
                <p className="text-small text-text">{message.name}</p>
                <p className="mt-1 text-small text-text-muted">{message.topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
