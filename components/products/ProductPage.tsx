import { notFound } from "next/navigation";
import { ProductExperience } from "./ProductExperience";
import { fetchProductByHandle } from "@/lib/shopify/api";
import { ShopifyApiError } from "@/lib/shopify/client";

export async function ProductPage({ slug }: { slug: string }) {
  let product;

  try {
    product = await fetchProductByHandle(slug);
  } catch (error) {
    if (error instanceof ShopifyApiError) {
      throw error;
    }

    throw new Error("We could not load this product right now. Please try again.");
  }

  if (!product) {
    notFound();
  }

  return <ProductExperience product={product} />;
}
