import { AdminList } from "@/components/admin/AdminList";
import { AdminShell } from "@/components/admin/AdminShell";
import { getContentList } from "@/lib/cms/queries";

export default async function AdminArticlesPage() {
  const articles = await getContentList({ type: "article" });
  return (
    <AdminShell title="Articles" description="Write, preview, schedule, publish, and archive reflective articles.">
      <AdminList items={articles} basePath="/admin/articles" />
    </AdminShell>
  );
}
