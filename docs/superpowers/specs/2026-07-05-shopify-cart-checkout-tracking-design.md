# Shopify Cart, Checkout & Order Tracking — Design

Date: 2026-07-05
Status: Approved

## Goal

Add a working cart, checkout, and order-tracking flow to the existing
Storefront-API-backed Next.js storefront. Products already render; this adds
the buy path on top of them.

## Confirmed context (verified via live curl)

- App uses the **Storefront API** (GraphQL), header `Shopify-Storefront-Private-Token`,
  via `lib/shopify/client.ts` `shopifyFetch`. API version `2025-01`, currency `PKR`.
- `cartCreate` works with the current private token and returns a real
  `checkoutUrl` → Shopify hosted checkout. Confirmed end to end.
- Storefront API **cannot** look up an order by number+email anonymously →
  order tracking requires an **Admin API** token (not yet in `.env`).
- Existing cart UI (`useProductInteractions`, `HeroChrome` `cartOpen`/`cartQuantity`)
  is decorative local mock state, not connected to Shopify. It gets replaced.
- `ProductDetail` exposes sizes as strings only, **no variant IDs**. Needs a
  size→variantId map for add-to-cart.

## Decisions

| Area | Decision |
|------|----------|
| Checkout | Redirect to Shopify hosted `checkoutUrl` (no custom checkout) |
| Order tracking | Guest lookup by order # + email via Admin API (`read_orders`) |
| Cart UI | Slide-out drawer + header count badge |
| Customer creation | Native — Shopify creates/links the customer at checkout. No code. |

## Architecture

```
queries.ts / types.ts  ← cart GraphQL + Cart/CartLine types
        ↓
app/actions/cart.ts ("use server")  ← cart mutations via shopifyFetch,
                                       cart id in httpOnly cookie, returns normalized cart
        ↓
components/cart/CartProvider.tsx (context, mounted in root layout)
        ↓
components/cart/CartDrawer.tsx + existing header cart buttons (badge + slide-out)

Tracking: app/track/page.tsx → app/actions/track.ts → lib/shopify/admin.ts (Admin API)
```

## Components

### Cart data layer
- **`queries.ts`** (edit): add `CART_FRAGMENT` + `cartCreate`, `cartLinesAdd`,
  `cartLinesUpdate`, `cartLinesRemove`, and a `cart(id:)` query. Fragment returns
  `id checkoutUrl totalQuantity cost{subtotalAmount} lines{... merchandise{... on ProductVariant{id title image price product{title handle}}}}`.
- **`types.ts`** (edit): `Cart`, `CartLine` types matching the fragment.
- **`app/actions/cart.ts`** (new, `"use server"`):
  - `getCart()` — read cookie id → `cart(id:)`; null if missing/expired.
  - `addToCart(variantId, qty)` — ensure cart (cookie id or `cartCreate`), then
    `cartLinesAdd`; write cookie.
  - `updateLine(lineId, qty)` — `cartLinesUpdate` (qty 0 → remove).
  - `removeLine(lineId)` — `cartLinesRemove`.
  - Cart id stored in `httpOnly`, `secure`, `sameSite=lax`, `path=/` cookie
    (`cart` module from `next/headers`). Private token never leaves the server.
  - All return `{ ok: true, cart } | { ok: false, error }`; catch `ShopifyApiError`.
  - Shopify carts expire (~10 days) / can be completed → a stale/invalid cookie
    id yields null `cart`; actions transparently create a fresh cart.

### Cart UI
- **`CartProvider.tsx`** (new): minimal context holding `cart`, `open`, and
  action wrappers (`add`, `setQty`, `remove`, `openCart`, `closeCart`). Hydrates
  once via `getCart()` on mount. Mounted in `app/layout.tsx`.
- **`CartDrawer.tsx`** (new): slide-out panel — line items (image, title, size,
  qty stepper, remove), subtotal (`cost.subtotalAmount`, formatted with existing
  `formatShopifyMoney`), empty state, and a **Checkout** button →
  `window.location.href = cart.checkoutUrl`. Inline error text on failure.
- **Header integration**: rewire the existing cart buttons in `HeroChrome` and
  each `*Experience` header to `useCart()` — `onClick={openCart}` and a live
  count badge from `cart.totalQuantity`. Delete the dead mock cart state.

### Add to cart (product page)
- **`mappers.ts`** (edit): add `sizeVariants: { size, variantId, availableForSale }[]`
  to `mapShopifyProductToProductDetail` (derived from `product.variants`).
- **`productData.ts`** (edit): add `sizeVariants` to the `ProductDetail` type.
- **`ProductExperience.tsx`** (edit): resolve selected size → `variantId`, call
  `add(variantId, 1)` then `openCart()`. Disable when the selected variant is
  unavailable.

### Order tracking
- **`config.ts`** (edit): add `adminAccessToken` from `SHOPIFY_ADMIN_ACCESS_TOKEN`
  and an `adminEndpoint` (`/admin/api/{ver}/graphql.json`). Required **only** in
  the admin module (lazy — cart works without it).
- **`lib/shopify/admin.ts`** (new): `adminFetch` — POST to admin endpoint, header
  `X-Shopify-Access-Token`. Throws a clear "tracking not configured" error if the
  token is absent.
- **`app/actions/track.ts`** (new, `"use server"`): `trackOrder(orderNumber, email)`
  — query `orders(first:1, query:"name:#<n>")`, then **verify the returned order's
  email equals the submitted email** before returning anything (blocks order
  enumeration). Returns `{ ok, order }` with `financialStatus`,
  `fulfillmentStatus`, and `fulfillments[].trackingInfo{ number url company }`, or
  a generic "no matching order" message.
- **`app/track/page.tsx`** (new): form (order #, email) using existing
  `react-hook-form` + `zod`; renders status + tracking. Friendly "not configured"
  message when the Admin token is missing.

## Data flow (add to cart → checkout)

1. Buyer picks size, clicks Add → `add(variantId, 1)` server action.
2. Action ensures a cart (cookie id or `cartCreate`), `cartLinesAdd`, writes cookie,
   returns normalized cart.
3. Context updates; drawer opens showing the line + subtotal.
4. Checkout → `window.location.href = checkoutUrl` → Shopify hosted checkout.
5. Buyer enters email/pays → Shopify creates the order **and** the customer record.

## Error handling

- Server actions catch `ShopifyApiError` (and unexpected errors) and return
  `{ ok: false, error }`; drawer / track page render the message inline. No raw
  throws reach the client.
- Invalid/expired cart cookie → treated as no cart; next add creates a new one.
- Tracking never confirms an order exists for a non-matching email.

## Security

- Storefront **private** token and Admin token stay server-side only (server
  actions + `lib/`). Never shipped to the client bundle.
- Cart id cookie is `httpOnly`.
- Admin token scope limited to `read_orders`. Email-match gate on tracking.

## Prerequisite (user action)

Order tracking needs a **Shopify custom app** Admin API access token with
`read_orders`, added to `.env` as `SHOPIFY_ADMIN_ACCESS_TOKEN`. Until then the
`/track` page shows "tracking not configured"; cart and checkout work without it.

## Verification

No test runner exists in the project; adding one is out of scope for this change.
Verify by driving the real flow (add to cart → drawer → real `checkoutUrl`) with
the `/verify` skill, plus curl checks against the live Storefront/Admin API.
Non-trivial server-action logic (email-match gate, size→variant resolution) gets
a small runnable self-check. A test harness can be added later if wanted.

## Out of scope (YAGNI)

- Custom in-app checkout / payment forms (using hosted checkout).
- Customer login / account pages (Customer Account API).
- Cart email capture / `buyerIdentity` (Shopify collects email at checkout).
- Discount-code UI, gift cards, multi-currency.
