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
    if (res.ok) {
      setCart(res.cart);
      setOpen(true);
    }
    return res;
  }

  async function setQty(lineId: string, quantity: number) {
    const res = await updateLine(lineId, quantity);
    if (res.ok) setCart(res.cart);
    return res;
  }

  async function remove(lineId: string) {
    const res = await removeLine(lineId);
    if (res.ok) setCart(res.cart);
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
