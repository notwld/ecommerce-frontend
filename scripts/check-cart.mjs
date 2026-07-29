import "dotenv/config";

const shop = process.env.SHOPIFY_SHOP;
const token = process.env.SHOPIFY_PUBLIC_ACCESS_TOKEN;
const endpoint = `https://${shop}.myshopify.com/api/2025-01/graphql.json`;

async function gql(query, variables) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

console.log("Check at:", new Date().toISOString());

const product = await gql(
  `query($handle: String!) @inContext(country: PK) {
    product(handle: $handle) {
      title
      availableForSale
      variants(first: 3) {
        edges { node { title sku availableForSale } }
      }
    }
  }`,
  { handle: "at-wardrobe-city-tee" },
);
console.log("\nProduct (PK context):");
console.log(JSON.stringify(product.data?.product ?? product.errors, null, 2));

await new Promise((r) => setTimeout(r, 1500));

const cart = await gql(
  `mutation @inContext(country: PK) {
    cartCreate(input: { lines: [{ merchandiseId: "gid://shopify/ProductVariant/45887202951202", quantity: 1 }] }) {
      cart { totalQuantity checkoutUrl }
      userErrors { code message }
      warnings { code message }
    }
  }`,
);

console.log("\nCart add (S, PK context):");
const payload = cart.data?.cartCreate;
if (cart.errors) console.log("GQL errors:", cart.errors);
console.log(
  JSON.stringify(
    {
      success: (payload?.cart?.totalQuantity ?? 0) > 0,
      totalQuantity: payload?.cart?.totalQuantity ?? 0,
      userErrors: payload?.userErrors,
      warnings: payload?.warnings,
    },
    null,
    2,
  ),
);
