import type { Metadata } from "next";
import { CollectionPage } from "@/components/collections/CollectionPage";
import { collectionSlugs, getCollection } from "@/components/collections/collectionData";

type CollectionRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collectionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CollectionRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);

  return {
    title: collection ? `${collection.title} | Mendeez` : "Collection | Mendeez",
    description: collection
      ? `Shop ${collection.title} at Mendeez.`
      : "Shop Mendeez collections.",
  };
}

export default async function Page({ params }: CollectionRouteProps) {
  const { slug } = await params;

  return <CollectionPage slug={slug} />;
}
