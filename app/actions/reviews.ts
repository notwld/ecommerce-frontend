"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createReviewSchema = z.object({
  productSlug: z.string().trim().min(1).max(200),
  authorName: z.string().trim().min(2, "Please enter your name.").max(80),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(2000),
});

export type ProductReview = {
  id: string;
  productSlug: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type ReviewSummary = {
  averageRating: number;
  totalCount: number;
  ratingCounts: Record<1 | 2 | 3 | 4 | 5, number>;
};

export async function getProductReviews(
  productSlug: string,
): Promise<{ reviews: ProductReview[]; summary: ReviewSummary }> {
  const reviews = await prisma.review.findMany({
    where: { productSlug },
    orderBy: { createdAt: "desc" },
  });

  const ratingCounts: ReviewSummary["ratingCounts"] = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  for (const review of reviews) {
    const rating = review.rating as 1 | 2 | 3 | 4 | 5;
    if (ratingCounts[rating] !== undefined) {
      ratingCounts[rating] += 1;
    }
  }

  const totalCount = reviews.length;
  const averageRating =
    totalCount === 0
      ? 0
      : reviews.reduce((sum, review) => sum + review.rating, 0) / totalCount;

  return {
    reviews: reviews.map((review) => ({
      id: review.id,
      productSlug: review.productSlug,
      authorName: review.authorName,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt.toISOString(),
    })),
    summary: {
      averageRating,
      totalCount,
      ratingCounts,
    },
  };
}

export type CreateReviewState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<
    Record<"authorName" | "rating" | "comment", string>
  >;
};

export async function createProductReview(
  _prev: CreateReviewState,
  formData: FormData,
): Promise<CreateReviewState> {
  const parsed = createReviewSchema.safeParse({
    productSlug: formData.get("productSlug"),
    authorName: formData.get("authorName"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  });

  if (!parsed.success) {
    const fieldErrors: CreateReviewState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "authorName" || key === "rating" || key === "comment") {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      ok: false,
      error: "Some information looks incorrect. Please check your entries and try again.",
      fieldErrors,
    };
  }

  try {
    await prisma.review.create({
      data: parsed.data,
    });
  } catch {
    return {
      ok: false,
      error: "We couldn't save your review. Please try again.",
    };
  }

  revalidatePath(`/products/${parsed.data.productSlug}`);
  return { ok: true };
}
