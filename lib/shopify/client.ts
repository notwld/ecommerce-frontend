import { getShopifyConfig } from "./config";
import type { ShopifyGraphQlError } from "./types";

export class ShopifyApiError extends Error {
  readonly code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = "ShopifyApiError";
    this.code = code;
  }
}

type ShopifyGraphQlResponse<T> = {
  data?: T;
  errors?: ShopifyGraphQlError[];
};

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: { noStore?: boolean },
): Promise<T> {
  const { endpoint, privateAccessToken } = getShopifyConfig();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": privateAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    ...(options?.noStore ? { cache: "no-store" } : { next: { revalidate: 60 } }),
  });

  if (!response.ok) {
    throw new ShopifyApiError(
      "We could not reach the store right now. Please try again shortly.",
    );
  }

  const payload = (await response.json()) as ShopifyGraphQlResponse<T>;

  if (payload.errors?.length) {
    const firstError = payload.errors[0];
    const code = firstError.extensions?.code;

    if (code === "UNAUTHORIZED" || code === "ACCESS_DENIED") {
      throw new ShopifyApiError(
        "Store connection is not authorized. Check your Shopify Storefront access tokens.",
        code,
      );
    }

    throw new ShopifyApiError(
      firstError.message || "Something went wrong while loading store data.",
      code,
    );
  }

  if (!payload.data) {
    throw new ShopifyApiError("The store returned an empty response.");
  }

  return payload.data;
}
