import { getShopifyAdminConfig } from "./config";
import { ShopifyApiError } from "./client";
import type { ShopifyGraphQlError } from "./types";

export async function adminFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const { endpoint, adminAccessToken } = getShopifyAdminConfig();

  if (!adminAccessToken) {
    throw new ShopifyApiError(
      "Order tracking is not configured. Add SHOPIFY_ADMIN_ACCESS_TOKEN (read_orders) to enable it.",
      "NOT_CONFIGURED",
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new ShopifyApiError("We could not reach the store right now. Please try again shortly.");
  }

  const payload = (await response.json()) as {
    data?: T;
    errors?: ShopifyGraphQlError[];
  };

  if (payload.errors?.length) {
    throw new ShopifyApiError(payload.errors[0].message || "Could not load order information.");
  }

  if (!payload.data) {
    throw new ShopifyApiError("The store returned an empty response.");
  }

  return payload.data;
}
