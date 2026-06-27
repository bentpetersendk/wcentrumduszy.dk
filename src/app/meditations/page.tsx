import type { Metadata } from "next";
import { ListingPage } from "@/components/public/ListingPage";
import { getPublishedList } from "@/lib/cms/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meditations",
  description: "Short guided practices from W Centrum Duszy."
};

export default async function MeditationsPage() {
  const meditations = await getPublishedList("meditation");
  return (
    <ListingPage
      title="Meditations"
      subtitle="Quiet audio practices for moments when you need a gentle first step."
      items={meditations}
      basePath="/meditations"
      cta="Open meditation"
    />
  );
}
