import { AdminShell } from "@/components/admin/AdminShell";
import { getContactMessages } from "@/lib/cms/queries";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <AdminShell title="Messages" description="Review contact form submissions, mark them handled, and preserve consent metadata.">
      <div className="divide-y divide-border rounded-md border border-border bg-surface">
        {messages.length ? messages.map((message) => (
          <article key={message.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl text-text">{message.name}</h2>
              <p className="text-caption uppercase text-text-muted">{message.status}</p>
            </div>
            <p className="mt-2 text-small text-text-muted">{message.email} · {message.topic}</p>
            <p className="mt-4 text-body text-text-muted">{message.message}</p>
          </article>
        )) : (
          <div className="px-6 py-12 text-center">
            <h2 className="font-display text-3xl text-text">No messages yet</h2>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
