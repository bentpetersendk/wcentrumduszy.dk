import { notFound } from "next/navigation";
import { ListingPage } from "@/components/public/ListingPage";
import { getContentBySlug, getPublishedList } from "@/lib/cms/queries";
import { metadataFromContent } from "@/lib/cms/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const overview = await getContentBySlug({ slug: "articles", type: "page", status: "published" });
  return overview ? metadataFromContent(overview) : {};
}

export default async function ArticlesPage() {
  const [overview, articles] = await Promise.all([
    getContentBySlug({ slug: "articles", type: "page", status: "published" }),
    getPublishedList("article")
  ]);
  if (!overview) notFound();
  return <ListingPage overview={overview} items={articles} basePath="/articles" cta="Read article" />;
}
