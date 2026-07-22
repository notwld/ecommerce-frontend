import { notFound } from "next/navigation";
import { ProductExperience } from "./ProductExperience";
import { fetchProductByHandle } from "@/lib/shopify/api";
import { ShopifyApiError } from "@/lib/shopify/client";
import { getProductReviews } from "@/app/actions/reviews";

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

  let reviews: Awaited<ReturnType<typeof getProductReviews>>["reviews"] = [];
  let summary: Awaited<ReturnType<typeof getProductReviews>>["summary"] = {
    averageRating: 0,
    totalCount: 0,
    ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };

  try {
    const reviewData = await getProductReviews(slug);
    reviews = reviewData.reviews;
    summary = reviewData.summary;
  } catch {
    // ponytail: keep product page usable if DB is temporarily unavailable
  }

  return (
    <ProductExperience
      product={product}
      reviews={reviews}
      reviewSummary={summary}
    />
  );
}
