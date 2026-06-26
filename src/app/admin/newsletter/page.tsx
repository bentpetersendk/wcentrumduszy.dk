import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminNewsletterPage() {
  return (
    <AdminShell title="Newsletter" description="Manage subscribers, consent, source page, unsubscribed state, and exports.">
      <div className="rounded-md border border-border bg-surface p-6">
        <h2 className="font-display text-3xl text-text">Subscriber model ready</h2>
        <p className="mt-3 max-w-3xl text-body text-text-muted">
          The database foundation stores email, consent timestamp, source, language preference, and subscription state.
        </p>
      </div>
    </AdminShell>
  );
}
