"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { trackOrder, type TrackedOrder } from "@/app/actions/track";

function humanize(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function TrackPage() {
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    const orderNumber = String(formData.get("orderNumber") ?? "");
    const email = String(formData.get("email") ?? "");
    setError(null);
    setOrder(null);
    startTransition(async () => {
      const res = await trackOrder(orderNumber, email);
      if (res.ok) setOrder(res.order);
      else setError(res.error);
    });
  }

  return (
    <main className="mx-auto min-h-screen max-w-[560px] px-5 py-16 text-brand-text">
      <Link href="/" className="text-[12px] text-[#676869] underline">
        ← Back to store
      </Link>
      <h1 className="mt-6 text-[28px] font-normal">Track your order</h1>
      <p className="mt-2 text-[14px] text-[#676869]">
        Enter your order number and the email you used at checkout.
      </p>

      <form action={onSubmit} className="mt-8 grid gap-4">
        <label className="grid gap-1 text-[13px] font-bold text-[#676869]">
          Order number
          <input
            name="orderNumber"
            required
            placeholder="1001"
            className="h-[46px] border border-[#d6d6d6] px-3 text-[14px] font-normal text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </label>
        <label className="grid gap-1 text-[13px] font-bold text-[#676869]">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-[46px] border border-[#d6d6d6] px-3 text-[14px] font-normal text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="mt-2 h-[46px] cursor-pointer bg-[#171717] text-[13px] font-bold text-white disabled:cursor-not-allowed disabled:bg-[#717171]"
        >
          {pending ? "Looking up…" : "Track order"}
        </button>
      </form>

      {error ? <p className="mt-6 text-[14px] text-[#b33323]">{error}</p> : null}

      {order ? (
        <section className="mt-8 border border-[#e3e3e3] p-6">
          <h2 className="text-[20px] font-normal">Order {order.name}</h2>
          <dl className="mt-4 grid gap-2 text-[14px]">
            <div className="flex justify-between">
              <dt className="text-[#676869]">Placed</dt>
              <dd>{new Date(order.createdAt).toLocaleDateString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#676869]">Payment</dt>
              <dd>{humanize(order.financialStatus)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[#676869]">Fulfillment</dt>
              <dd>{humanize(order.fulfillmentStatus)}</dd>
            </div>
          </dl>

          {order.tracking.length > 0 ? (
            <div className="mt-5 border-t border-[#e3e3e3] pt-5">
              <p className="text-[13px] font-bold text-[#676869]">Tracking</p>
              <ul className="mt-2 grid gap-2 text-[14px]">
                {order.tracking.map((t, index) => (
                  <li key={index} className="flex flex-wrap items-center gap-2">
                    <span className="text-[#676869]">{t.company ?? "Carrier"}:</span>
                    {t.url ? (
                      <a href={t.url} target="_blank" rel="noreferrer" className="underline">
                        {t.number ?? "Track shipment"}
                      </a>
                    ) : (
                      <span>{t.number ?? "—"}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-5 border-t border-[#e3e3e3] pt-5 text-[14px] text-[#676869]">
              No tracking information yet. We’ll email you when your order ships.
            </p>
          )}
        </section>
      ) : null}
    </main>
  );
}
