import { AdminShell } from "@/components/admin/AdminShell";
import { ToggleField } from "@/components/system/FormControls";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Settings" description="Manage global site metadata, languages, analytics consent, and deployment readiness.">
      <section className="grid gap-4 rounded-md border border-border bg-surface p-6">
        <ToggleField id="language-pl" label="Polish" helper="Primary launch language." checked />
        <ToggleField id="language-da" label="Danish" helper="Prepared for future translation publishing." />
        <ToggleField id="language-en" label="English" helper="Prepared for future translation publishing." />
      </section>
    </AdminShell>
  );
}
