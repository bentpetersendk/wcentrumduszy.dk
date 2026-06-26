import type { Metadata } from "next";
import { ListingPage } from "@/components/public/ListingPage";
import { articles, getPublished } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles",
  description: "Reflective articles from W Centrum Duszy."
};

export default function ArticlesPage() {
  return (
    <ListingPage
      title="Articles"
      subtitle="Thoughtful notes on presence, patterns, calm, and personal growth."
      items={getPublished(articles)}
      basePath="/articles"
      cta="Read article"
    />
  );
}
