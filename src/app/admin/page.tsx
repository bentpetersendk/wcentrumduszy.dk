import { AdminShell } from "@/components/admin/AdminShell";
import { StatusPill } from "@/components/admin/StatusPill";
import { allPublicContent } from "@/lib/content";

const stats = [
  ["Pages", allPublicContent.filter((item) => item.type === "page").length],
  ["Published", allPublicContent.filter((item) => item.status === "published").length],
  ["Drafts", allPublicContent.filter((item) => item.status === "draft").length],
  ["Languages ready", 3]
];

export default function AdminDashboardPage() {
  return (
    <AdminShell
      title="Dashboard"
      description="A production-ready CMS foundation for pages, offers, media, messages, newsletter contacts, settings, previews, publishing, and future translations."
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
    </AdminShell>
  );
}
