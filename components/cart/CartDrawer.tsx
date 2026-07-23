"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useCart } from "./CartProvider";
import { formatShopifyMoney } from "@/lib/shopify/mappers";
import type { CartLine } from "@/lib/shopify/types";

export function CartDrawer() {
  const { cart, open, closeCart, setQty, remove } = useCart();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [pendingLineId, setPendingLineId] = useState<string | null>(null);

  if (!open) return null;

  const lines = cart?.lines ?? [];
  const subtotal = cart?.subtotal;

  function run(lineId: string | null, action: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    setPendingLineId(lineId);
    startTransition(async () => {
      try {
        const res = await action();
        if (!res.ok) setError(res.error ?? "Something went wrong.");
      } finally {
        setPendingLineId(null);
      }
    });
  }

  function checkout() {
    if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
  }

  function canIncrease(line: CartLine) {
    if (!line.availableForSale) return false;
    if (line.quantityAvailable == null) return true;
    return line.quantity < line.quantityAvailable;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="flex-1 cursor-pointer"
      />
      <aside className="flex h-full w-[536px] max-w-full flex-col bg-white text-brand-text shadow-[-8px_0_24px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between px-[31px] pb-7 pt-[29px]">
          <h2 className="text-[22px] font-normal leading-none">
            Your cart ({cart?.totalQuantity ?? 0})
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="cursor-pointer text-[#676869]"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[31px]">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-[14px] text-[#676869]">
              Your cart is empty. Browse products and add something you like.
            </p>
          ) : (
            lines.map((line) => {
              const busy = pending && pendingLineId === line.id;
              const atMax = !canIncrease(line);
              const outOfStock = !line.availableForSale;

              return (
                <div
                  key={line.id}
                  className="grid grid-cols-[100px_1fr_auto] gap-6 border-b border-[#eee] py-6"
                >
                  <div className="relative h-[150px] w-[100px] overflow-hidden bg-[#f0f1f3]">
                    {line.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={line.image}
                        alt={line.title}
                        className="h-full w-full object-cover object-top"
                      />
                    ) : null}
                  </div>
                  <div>
                    <Link
                      href={line.href}
                      onClick={closeCart}
                      className="text-[14px] font-bold leading-5 text-[#4d4f52] hover:underline"
                    >
                      {line.title}
                    </Link>
                    {line.variantTitle ? (
                      <p className="mt-1 text-[11px] text-[#676869]">{line.variantTitle}</p>
                    ) : null}
                    {outOfStock ? (
                      <p className="mt-2 text-[11px] font-medium text-[#b33323]">Out of stock</p>
                    ) : atMax && line.quantityAvailable != null ? (
                      <p className="mt-2 text-[11px] text-[#676869]">
                        Only {line.quantityAvailable} left
                      </p>
                    ) : null}
                    <div className="mt-8 inline-grid h-[35px] grid-cols-3 border border-[#d6d6d6] text-[#8c8c8c]">
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => run(line.id, () => setQty(line.id, line.quantity - 1))}
                        className="w-9 cursor-pointer disabled:opacity-40"
                        aria-label="Reduce quantity"
                      >
                        −
                      </button>
                      <span className="grid w-9 place-items-center text-[13px]" aria-live="polite">
                        {busy ? "…" : line.quantity}
                      </span>
                      <button
                        type="button"
                        disabled={pending || atMax}
                        onClick={() => run(line.id, () => setQty(line.id, line.quantity + 1))}
                        className="w-9 cursor-pointer disabled:opacity-40"
                        aria-label="Increase quantity"
                        title={atMax ? "No more stock available" : undefined}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => run(line.id, () => remove(line.id))}
                      className="mt-3 block text-[11px] text-[#676869] underline disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-right text-[14px] font-bold text-[#4d4f52]">
                    {formatShopifyMoney(line.lineTotal)}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {error ? <p className="px-[31px] pt-4 text-[13px] text-[#b33323]">{error}</p> : null}

        <div className="border-t border-[#e3e3e3] px-[31px] py-7">
          <div className="flex items-center justify-between text-[22px] leading-none">
            <p>Subtotal:</p>
            <p>{subtotal ? formatShopifyMoney(subtotal) : "—"}</p>
          </div>
          <p className="mt-3 text-[12px] text-[#676869]">
            Taxes and shipping calculated at checkout.
          </p>
          <button
            type="button"
            onClick={checkout}
            disabled={lines.length === 0 || pending || lines.some((l) => !l.availableForSale)}
            className="mt-5 h-[46px] w-full cursor-pointer bg-[#171717] text-[13px] font-bold text-white disabled:cursor-not-allowed disabled:bg-[#717171]"
          >
            {lines.some((l) => !l.availableForSale) ? "Remove unavailable items to checkout" : "Checkout"}
          </button>
          <Link
            href="/track"
            onClick={closeCart}
            className="mt-4 block text-center text-[12px] text-[#676869] underline"
          >
            Track an order
          </Link>
        </div>
      </aside>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
