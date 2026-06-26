import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminMessagesPage() {
  return (
    <AdminShell title="Messages" description="Review contact form submissions, mark them handled, and preserve consent metadata.">
      <div className="rounded-md border border-dashed border-border bg-surface px-6 py-12 text-center">
        <h2 className="font-display text-3xl text-text">No messages yet</h2>
        <p className="mx-auto mt-3 max-w-md text-body text-text-muted">
          Supabase tables and RLS policies are ready for contact submissions.
        </p>
      </div>
    </AdminShell>
  );
}
