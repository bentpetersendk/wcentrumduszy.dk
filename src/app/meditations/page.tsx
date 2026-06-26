import type { Metadata } from "next";
import { ListingPage } from "@/components/public/ListingPage";
import { getPublished, meditations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Meditations",
  description: "Short guided practices from W Centrum Duszy."
};

export default function MeditationsPage() {
  return (
    <ListingPage
      title="Meditations"
      subtitle="Quiet audio practices for moments when you need a gentle first step."
      items={getPublished(meditations)}
      basePath="/meditations"
      cta="Open meditation"
    />
  );
}
