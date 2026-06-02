import { notFound } from "next/navigation";
import { CollectionExperience } from "./CollectionExperience";
import { getCollection } from "./collectionData";

export function CollectionPage({ slug }: { slug: string }) {
  const collection = getCollection(slug);

  if (!collection) {
    notFound();
  }

  return <CollectionExperience collection={collection} />;
}
