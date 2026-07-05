function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
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
  const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2025-01";

  return {
    shop,
    publicAccessToken,
    privateAccessToken,
    apiVersion,
    storeDomain: `${shop}.myshopify.com`,
    endpoint: `https://${shop}.myshopify.com/api/${apiVersion}/graphql.json`,
  };
}
