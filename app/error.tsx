"use client";

import { useEffect } from "react";
import { ShopifyApiError } from "@/lib/shopify/client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const message =
    error instanceof ShopifyApiError
      ? error.message
      : "Something went wrong while loading the store. Please try again.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-background px-6 py-16 text-brand-text">
      <div className="max-w-lg text-center">
        <h1 className="text-2xl font-semibold">We could not load the store</h1>
        <p className="mt-3 text-sm text-brand-text/70">{message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-brand-text px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
