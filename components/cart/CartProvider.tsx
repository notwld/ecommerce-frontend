"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Cart } from "@/lib/shopify/types";
import {
  addToCart,
  getCart,
  removeLine,
  updateLine,
  type CartResult,
} from "@/app/actions/cart";

type CartContextValue = {
  cart: Cart | null;
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (variantId: string, quantity?: number) => Promise<CartResult>;
  setQty: (lineId: string, quantity: number) => Promise<CartResult>;
  remove: (lineId: string) => Promise<CartResult>;
};

const CartContext = createContext<CartContextValue | null>(null);

function applyResult(res: CartResult, setCart: (cart: Cart | null) => void) {
  // Always keep the latest cart Shopify returned, even on userErrors (e.g. out of stock),
  // so quantity controls and subtotal stay in sync instead of wiping the drawer.
  if (res.ok) {
    setCart(res.cart);
    return;
  }
  if (res.cart !== undefined) setCart(res.cart);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getCart().then((res) => {
      if (res.ok) setCart(res.cart);
    });
  }, []);

  async function add(variantId: string, quantity = 1) {
    const res = await addToCart(variantId, quantity);
    applyResult(res, setCart);
    if (res.ok) setOpen(true);
    return res;
  }

  async function setQty(lineId: string, quantity: number) {
    const res = await updateLine(lineId, quantity);
    applyResult(res, setCart);
    return res;
  }

  async function remove(lineId: string) {
    const res = await removeLine(lineId);
    applyResult(res, setCart);
    return res;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        open,
        openCart: () => setOpen(true),
        closeCart: () => setOpen(false),
        add,
        setQty,
        remove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
