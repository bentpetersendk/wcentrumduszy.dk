import { AdminShell } from "@/components/admin/AdminShell";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { pages } from "@/lib/content";

const homepageContent = {
  ...pages[0],
  id: "homepage",
  slug: "",
  title: "Homepage",
  subtitle: "Return to the quiet center within you.",
  excerpt: "Approved homepage content and visual rhythm.",
  seo: {
    title: "W Centrum Duszy",
    description: "Reflection, guided practice, workshops, and personal growth with Joanna Radek-Petersen.",
    canonical: "/",
    socialImage: "/photos/portraits/joanna-radek-01.webp"
  }
};

export default function AdminHomepagePage() {
  return (
    <AdminShell title="Homepage editor" description="Edit hero copy, featured sections, calls to action, SEO, and publication state.">
      <ContentEditor content={homepageContent} />
    </AdminShell>
  );
}
