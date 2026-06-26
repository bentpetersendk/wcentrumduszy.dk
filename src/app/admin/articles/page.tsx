import { AdminList } from "@/components/admin/AdminList";
import { AdminShell } from "@/components/admin/AdminShell";
import { articles } from "@/lib/content";

export default function AdminArticlesPage() {
  return (
    <AdminShell title="Articles" description="Write, preview, schedule, publish, and archive reflective articles.">
      <AdminList items={articles} basePath="/admin/articles" />
    </AdminShell>
  );
}
