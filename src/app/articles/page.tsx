import type { Metadata } from "next";
import { ListingPage } from "@/components/public/ListingPage";
import { getPublishedList } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Articles",
  description: "Reflective articles from W Centrum Duszy."
};

export default async function ArticlesPage() {
  const articles = await getPublishedList("article");
  return (
    <ListingPage
      title="Articles"
      subtitle="Thoughtful notes on presence, patterns, calm, and personal growth."
      items={articles}
      basePath="/articles"
      cta="Read article"
    />
  );
}
