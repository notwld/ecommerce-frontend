function requireEnv(name: string, value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return trimmed;
}

export function getShopifyConfig() {
  const shop = requireEnv("SHOPIFY_SHOP", process.env.SHOPIFY_SHOP);
  const publicAccessToken = requireEnv(
    "SHOPIFY_PUBLIC_ACCESS_TOKEN",
    process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN,
  );
  const privateAccessToken = requireEnv(
    "SHOPIFY_PRIVATE_ACCESS_TOKEN",
    process.env.SHOPIFY_PRIVATE_ACCESS_TOKEN,
  );
  const apiVersion = (process.env.SHOPIFY_API_VERSION ?? "2025-01").trim();

  return {
    shop,
    publicAccessToken,
    privateAccessToken,
    apiVersion,
    storeDomain: `${shop}.myshopify.com`,
    endpoint: `https://${shop}.myshopify.com/api/${apiVersion}/graphql.json`,
  };
}

// Admin API — only needed for order tracking. Requires a custom-app token
// with read_orders scope in SHOPIFY_ADMIN_ACCESS_TOKEN.
export function getShopifyAdminConfig() {
  const shop = requireEnv("SHOPIFY_SHOP", process.env.SHOPIFY_SHOP);
  const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN?.trim();
  const apiVersion = (process.env.SHOPIFY_API_VERSION ?? "2025-01").trim();

  return {
    adminAccessToken,
    endpoint: `https://${shop}.myshopify.com/admin/api/${apiVersion}/graphql.json`,
  };
}
