import { AdminList } from "@/components/admin/AdminList";
import { AdminShell } from "@/components/admin/AdminShell";
import { getContentList } from "@/lib/cms/queries";

export default async function AdminWorkshopsPage() {
  const workshops = await getContentList({ type: "workshop" });
  return (
    <AdminShell title="Workshops" description="Manage workshop listings, detail pages, booking metadata, FAQs, and gallery images.">
      <AdminList items={workshops} basePath="/admin/workshops" />
    </AdminShell>
  );
}
