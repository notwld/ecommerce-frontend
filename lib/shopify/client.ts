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
  const { endpoint, publicAccessToken, privateAccessToken } = getShopifyConfig();

  // Prefer a real Storefront token. Admin tokens (shpat_...) are not Storefront
  // credentials — only use the private header when it is not an Admin token.
  const usePrivateStorefrontHeader = Boolean(
    privateAccessToken && !privateAccessToken.startsWith("shpat_"),
  );

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(usePrivateStorefrontHeader
        ? { "Shopify-Storefront-Private-Token": privateAccessToken }
        : { "X-Shopify-Storefront-Access-Token": publicAccessToken }),
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
    const message = firstError.message || "";

    if (code === "ACCESS_DENIED" && /access scope/i.test(message)) {
      throw new ShopifyApiError(
        "This store action needs extra Shopify permissions. Please try again or contact support.",
        code,
      );
    }

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
