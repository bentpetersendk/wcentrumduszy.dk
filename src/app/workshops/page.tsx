import { notFound } from "next/navigation";
import { ListingPage } from "@/components/public/ListingPage";
import { getContentBySlug, getPublishedList } from "@/lib/cms/queries";
import { metadataFromContent } from "@/lib/cms/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const overview = await getContentBySlug({ slug: "workshops", type: "page", status: "published" });
  return overview ? metadataFromContent(overview) : {};
}

export default async function WorkshopsPage() {
  const [overview, workshops] = await Promise.all([
    getContentBySlug({ slug: "workshops", type: "page", status: "published" }),
    getPublishedList("workshop")
  ]);
  if (!overview) notFound();
  return <ListingPage overview={overview} items={workshops} basePath="/workshops" cta="View workshop" />;
}
