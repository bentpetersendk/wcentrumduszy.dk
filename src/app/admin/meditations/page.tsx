import { AdminList } from "@/components/admin/AdminList";
import { AdminShell } from "@/components/admin/AdminShell";
import { getContentList } from "@/lib/cms/queries";

export const dynamic = "force-dynamic";

export default async function AdminMeditationsPage() {
  const meditations = await getContentList({ type: "meditation" });
  return (
    <AdminShell title="Meditations" description="Manage audio practices, access levels, durations, themes, and future premium status.">
      <AdminList items={meditations} basePath="/admin/meditations" />
    </AdminShell>
  );
}
