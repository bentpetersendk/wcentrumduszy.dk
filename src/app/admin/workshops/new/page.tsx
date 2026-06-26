import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { emptyContent } from "@/lib/cms/empty";

export default function NewWorkshopPage() {
  return (
    <AdminShell title="New workshop" description="Create a workshop draft, preview it, then publish when ready.">
      <ContentEditor content={emptyContent("workshop")} />
    </AdminShell>
  );
}
