import { notFound } from "next/navigation";
import { ListingPage } from "@/components/public/ListingPage";
import { getContentBySlug, getPublishedList } from "@/lib/cms/queries";
import { metadataFromContent } from "@/lib/cms/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const overview = await getContentBySlug({ slug: "meditations", type: "page", status: "published" });
  return overview ? metadataFromContent(overview) : {};
}

export default async function MeditationsPage() {
  const [overview, meditations] = await Promise.all([
    getContentBySlug({ slug: "meditations", type: "page", status: "published" }),
    getPublishedList("meditation")
  ]);
  if (!overview) notFound();
  return <ListingPage overview={overview} items={meditations} basePath="/meditations" cta="Open meditation" />;
}
