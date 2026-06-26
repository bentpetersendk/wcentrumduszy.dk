import type { Metadata } from "next";
import { ListingPage } from "@/components/public/ListingPage";
import { getPublished, workshops } from "@/lib/content";

export const metadata: Metadata = {
  title: "Workshops",
  description: "Small reflective workshops with Joanna Radek-Petersen."
};

export default function WorkshopsPage() {
  return (
    <ListingPage
      title="Workshops"
      subtitle="Small, reflective spaces for guided practice, conversation, and integration."
      items={getPublished(workshops)}
      basePath="/workshops"
      cta="View workshop"
    />
  );
}
