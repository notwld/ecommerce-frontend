"use server";

import { cookies } from "next/headers";
import { shopifyFetch, ShopifyApiError } from "@/lib/shopify/client";
import {
  CART_QUERY,
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from "@/lib/shopify/queries";
import type { Cart, ShopifyCart, ShopifyCartUserError, ShopifyCartWarning } from "@/lib/shopify/types";

const CART_COOKIE = "cartId";
const TEN_DAYS = 60 * 60 * 24 * 10;

export type CartResult = { ok: true; cart: Cart | null } | { ok: false; error: string; cart?: Cart | null };

type MutationPayload = {
  cart: ShopifyCart | null;
  userErrors?: ShopifyCartUserError[] | null;
  warnings?: ShopifyCartWarning[] | null;
};

function normalizeCart(cart: ShopifyCart): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: cart.cost.subtotalAmount,
    lines: cart.lines.edges
      .filter(({ node }) => Boolean(node.merchandise?.product?.handle) && node.quantity > 0)
      .map(({ node }) => {
      const merchandise = node.merchandise;
      return {
        id: node.id,
        quantity: node.quantity,
        title: merchandise.product.title,
        variantTitle: merchandise.title === "Default Title" ? "" : merchandise.title,
        image: merchandise.image?.url ?? null,
        price: node.cost?.amountPerQuantity ?? merchandise.price,
        lineTotal: node.cost?.totalAmount ?? {
          amount: (
            Number.parseFloat(merchandise.price.amount) * node.quantity
          ).toFixed(2),
          currencyCode: merchandise.price.currencyCode,
        },
        href: `/products/${merchandise.product.handle}`,
        availableForSale: merchandise.availableForSale ?? true,
        // Requires unauthenticated_read_product_inventory — omit from queries if missing.
        quantityAvailable: null,
      };
    }),
  };
}

function errorMessage(error: unknown): string {
  if (error instanceof ShopifyApiError) return error.message;
  return "Something went wrong with your cart. Please try again.";
}

function friendlyStockMessage(message?: string | null) {
  const raw = (message ?? "").toLowerCase();
  if (raw.includes("sold out") || raw.includes("out of stock")) {
    return "This item is sold out right now.";
  }
  if (raw.includes("not enough") || raw.includes("insufficient")) {
    return "That item doesn’t have enough stock for the quantity you selected.";
  }
  return "This item isn’t available in the quantity you requested.";
}

function friendlyUserError(errors: ShopifyCartUserError[]): string {
  const first = errors[0];
  const code = first?.code ?? "";
  const raw = (first?.message ?? "").toLowerCase();

  if (
    code === "MERCHANDISE_NOT_ENOUGH_STOCK" ||
    code === "MERCHANDISE_OUT_OF_STOCK" ||
    raw.includes("not enough inventory") ||
    raw.includes("out of stock") ||
    raw.includes("insufficient") ||
    raw.includes("sold out")
  ) {
    return friendlyStockMessage(first?.message);
  }

  if (code === "INVALID" && raw.includes("merchandise")) {
    return "This item is no longer available. Please remove it from your cart.";
  }

  return first?.message || "We couldn’t update your cart. Please try again.";
}

function friendlyWarning(warnings: ShopifyCartWarning[]): string | null {
  const stock = warnings.find((w) => {
    const code = w.code ?? "";
    return (
      code === "MERCHANDISE_OUT_OF_STOCK" ||
      code === "MERCHANDISE_NOT_ENOUGH_STOCK" ||
      /sold out|out of stock|not enough/i.test(w.message)
    );
  });
  return stock ? friendlyStockMessage(stock.message) : null;
}

function fromMutation(payload: MutationPayload | null | undefined): CartResult {
  if (!payload) {
    return { ok: false, error: "We couldn’t update your cart. Please try again." };
  }

  const cart = payload.cart ? normalizeCart(payload.cart) : null;
  const errors = payload.userErrors?.filter((e) => e?.message) ?? [];
  const warnings = payload.warnings?.filter((w) => w?.message) ?? [];

  if (errors.length) {
    return { ok: false, error: friendlyUserError(errors), cart };
  }

  const warningMessage = friendlyWarning(warnings);
  if (warningMessage) {
    // Shopify may still return a cart with quantity forced to 0 for OOS items.
    return { ok: false, error: warningMessage, cart };
  }

  if (!cart) {
    return { ok: false, error: "We couldn’t update your cart. Please try again." };
  }

  return { ok: true, cart };
}

async function readCartId() {
  return (await cookies()).get(CART_COOKIE)?.value ?? null;
}

async function writeCartId(id: string) {
  (await cookies()).set(CART_COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TEN_DAYS,
  });
}

async function clearCartId() {
  (await cookies()).delete(CART_COOKIE);
}

export async function getCart(): Promise<CartResult> {
  const cartId = await readCartId();
  if (!cartId) return { ok: true, cart: null };
  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
      CART_QUERY,
      { cartId },
      { noStore: true },
    );
    if (!data.cart) {
      await clearCartId();
      return { ok: true, cart: null };
    }
    return { ok: true, cart: normalizeCart(data.cart) };
  } catch {
    // Stale/expired cart id — clear cookie so the next add creates a fresh cart.
    await clearCartId();
    return { ok: true, cart: null };
  }
}

export async function addToCart(merchandiseId: string, quantity = 1): Promise<CartResult> {
  if (!merchandiseId) {
    return { ok: false, error: "Please choose a product option before adding to cart." };
  }
  if (quantity < 1) {
    return { ok: false, error: "Quantity must be at least 1." };
  }

  try {
    const cartId = await readCartId();

    if (cartId) {
      const data = await shopifyFetch<{ cartLinesAdd: MutationPayload }>(
        CART_LINES_ADD_MUTATION,
        { cartId, lines: [{ merchandiseId, quantity }] },
        { noStore: true },
      );
      const result = fromMutation(data.cartLinesAdd);
      // Expired cart cookie → create a new cart instead of failing soft.
      if (!result.ok && !result.cart && !data.cartLinesAdd?.cart) {
        await clearCartId();
      } else {
        return result;
      }
    }

    const data = await shopifyFetch<{ cartCreate: MutationPayload }>(
      CART_CREATE_MUTATION,
      { lines: [{ merchandiseId, quantity }] },
      { noStore: true },
    );
    const result = fromMutation(data.cartCreate);
    if (result.ok && result.cart) await writeCartId(result.cart.id);
    return result;
  } catch (error) {
    return { ok: false, error: errorMessage(error) };
  }
}

export async function updateLine(lineId: string, quantity: number): Promise<CartResult> {
  if (quantity <= 0) return removeLine(lineId);

  const cartId = await readCartId();
  if (!cartId) {
    return { ok: false, error: "Your cart session expired. Please add the item again." };
  }

  try {
    const data = await shopifyFetch<{ cartLinesUpdate: MutationPayload }>(
      CART_LINES_UPDATE_MUTATION,
      { cartId, lines: [{ id: lineId, quantity }] },
      { noStore: true },
    );
    return fromMutation(data.cartLinesUpdate);
  } catch (error) {
    return { ok: false, error: errorMessage(error) };
  }
}

export async function removeLine(lineId: string): Promise<CartResult> {
  const cartId = await readCartId();
  if (!cartId) {
    return { ok: false, error: "Your cart session expired. Please add the item again." };
  }

  try {
    const data = await shopifyFetch<{ cartLinesRemove: MutationPayload }>(
      CART_LINES_REMOVE_MUTATION,
      { cartId, lineIds: [lineId] },
      { noStore: true },
    );
    return fromMutation(data.cartLinesRemove);
  } catch (error) {
    return { ok: false, error: errorMessage(error) };
  }
}
