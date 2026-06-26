import { AdminList } from "@/components/admin/AdminList";
import { AdminShell } from "@/components/admin/AdminShell";
import { meditations } from "@/lib/content";

export default function AdminMeditationsPage() {
  return (
    <AdminShell title="Meditations" description="Manage audio practices, access levels, durations, themes, and future premium status.">
      <AdminList items={meditations} basePath="/admin/meditations" />
    </AdminShell>
  );
}
