import type { Metadata } from "next";
import { ListingPage } from "@/components/public/ListingPage";
import { getPublishedList } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Workshops",
  description: "Small reflective workshops with Joanna Radek-Petersen."
};

export default async function WorkshopsPage() {
  const workshops = await getPublishedList("workshop");
  return (
    <ListingPage
      title="Workshops"
      subtitle="Small, reflective spaces for guided practice, conversation, and integration."
      items={workshops}
      basePath="/workshops"
      cta="View workshop"
    />
  );
}
