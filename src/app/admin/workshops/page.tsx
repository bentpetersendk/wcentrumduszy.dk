import { AdminList } from "@/components/admin/AdminList";
import { AdminShell } from "@/components/admin/AdminShell";
import { workshops } from "@/lib/content";

export default function AdminWorkshopsPage() {
  return (
    <AdminShell title="Workshops" description="Manage workshop listings, detail pages, booking metadata, FAQs, and gallery images.">
      <AdminList items={workshops} basePath="/admin/workshops" />
    </AdminShell>
  );
}
