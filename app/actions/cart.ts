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
import type { Cart, ShopifyCart } from "@/lib/shopify/types";

const CART_COOKIE = "cartId";
const TEN_DAYS = 60 * 60 * 24 * 10;

export type CartResult = { ok: true; cart: Cart | null } | { ok: false; error: string };

function normalizeCart(cart: ShopifyCart): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: cart.cost.subtotalAmount,
    lines: cart.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      title: node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      image: node.merchandise.image?.url ?? null,
      price: node.merchandise.price,
      href: `/products/${node.merchandise.product.handle}`,
    })),
  };
}

function errorMessage(error: unknown): string {
  if (error instanceof ShopifyApiError) return error.message;
  return "Something went wrong with your cart. Please try again.";
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

export async function getCart(): Promise<CartResult> {
  const cartId = await readCartId();
  if (!cartId) return { ok: true, cart: null };
  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
      CART_QUERY,
      { cartId },
      { noStore: true },
    );
    return { ok: true, cart: data.cart ? normalizeCart(data.cart) : null };
  } catch {
    // Stale/expired cart id — treat as empty; next add creates a fresh cart.
    return { ok: true, cart: null };
  }
}

export async function addToCart(merchandiseId: string, quantity = 1): Promise<CartResult> {
  try {
    const cartId = await readCartId();
    let cart: ShopifyCart | null = null;

    if (cartId) {
      const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart | null } }>(
        CART_LINES_ADD_MUTATION,
        { cartId, lines: [{ merchandiseId, quantity }] },
        { noStore: true },
      );
      cart = data.cartLinesAdd?.cart ?? null;
    }

    if (!cart) {
      const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart | null } }>(
        CART_CREATE_MUTATION,
        { lines: [{ merchandiseId, quantity }] },
        { noStore: true },
      );
      cart = data.cartCreate?.cart ?? null;
      if (!cart) return { ok: false, error: "Could not add the item to your cart." };
      await writeCartId(cart.id);
    }

    return { ok: true, cart: normalizeCart(cart) };
  } catch (error) {
    return { ok: false, error: errorMessage(error) };
  }
}

export async function updateLine(lineId: string, quantity: number): Promise<CartResult> {
  if (quantity <= 0) return removeLine(lineId);
  const cartId = await readCartId();
  if (!cartId) return { ok: true, cart: null };
  try {
    const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart | null } }>(
      CART_LINES_UPDATE_MUTATION,
      { cartId, lines: [{ id: lineId, quantity }] },
      { noStore: true },
    );
    const cart = data.cartLinesUpdate?.cart;
    return { ok: true, cart: cart ? normalizeCart(cart) : null };
  } catch (error) {
    return { ok: false, error: errorMessage(error) };
  }
}

export async function removeLine(lineId: string): Promise<CartResult> {
  const cartId = await readCartId();
  if (!cartId) return { ok: true, cart: null };
  try {
    const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart | null } }>(
      CART_LINES_REMOVE_MUTATION,
      { cartId, lineIds: [lineId] },
      { noStore: true },
    );
    const cart = data.cartLinesRemove?.cart;
    return { ok: true, cart: cart ? normalizeCart(cart) : null };
  } catch (error) {
    return { ok: false, error: errorMessage(error) };
  }
}
