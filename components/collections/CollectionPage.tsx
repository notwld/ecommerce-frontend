import { CollectionExperience } from "./CollectionExperience";
import {
  getCollectionShell,
  mergeCollectionWithShell,
} from "@/lib/shopify/collectionFallbacks";
import {
  fetchAllProductsCollection,
  fetchCollectionByHandle,
} from "@/lib/shopify/api";

export async function CollectionPage({ slug }: { slug: string }) {
  const shell = getCollectionShell(slug);
  let collection = shell;
  let emptyMessage: string | undefined;

  try {
    const live =
      slug === "all"
        ? await fetchAllProductsCollection()
        : await fetchCollectionByHandle(slug);
    collection = mergeCollectionWithShell(shell, live);

    if (!live?.products.length) {
      emptyMessage =
        "No products are available in this collection right now. Please check back soon.";
    }
  } catch {
    emptyMessage =
      "We could not load products for this collection right now. Please try again in a moment.";
  }

  return <CollectionExperience collection={collection} emptyMessage={emptyMessage} />;
}
