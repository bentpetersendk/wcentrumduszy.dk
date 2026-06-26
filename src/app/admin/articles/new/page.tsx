import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { emptyContent } from "@/lib/cms/empty";

export default function NewArticlePage() {
  return (
    <AdminShell title="New article" description="Create an article draft, schedule or publish when ready.">
      <ContentEditor content={emptyContent("article")} />
    </AdminShell>
  );
}
