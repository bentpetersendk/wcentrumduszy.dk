import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { emptyContent } from "@/lib/cms/empty";

export default function NewMeditationPage() {
  return (
    <AdminShell title="New meditation" description="Create a meditation draft and attach uploaded media through the media library.">
      <ContentEditor content={emptyContent("meditation")} />
    </AdminShell>
  );
}
