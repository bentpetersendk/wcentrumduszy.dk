import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { getContentBySlug } from "@/lib/cms/queries";

export default async function AdminHomepagePage() {
  const homepageContent = await getContentBySlug({ slug: "", type: "page" });

  return (
    <AdminShell title="Homepage editor" description="Edit hero copy, featured sections, calls to action, SEO, and publication state.">
      {homepageContent ? <ContentEditor content={homepageContent} /> : <p className="text-body text-text-muted">Homepage content is not seeded yet.</p>}
    </AdminShell>
  );
}
