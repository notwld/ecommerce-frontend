"use client";

import { useActionState, useEffect, useState } from "react";
import {
  createProductReview,
  type CreateReviewState,
  type ProductReview,
  type ReviewSummary,
} from "@/app/actions/reviews";

type ProductReviewsProps = {
  productSlug: string;
  productName: string;
  initialReviews: ProductReview[];
  initialSummary: ReviewSummary;
};

const initialState: CreateReviewState = { ok: false };
const AUTOPLAY_MS = 5000;

export function ProductReviews({
  productSlug,
  productName,
  initialReviews,
  initialSummary,
}: ProductReviewsProps) {
  const [showForm, setShowForm] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const averageLabel =
    initialSummary.totalCount === 0
      ? "No ratings yet"
      : `${initialSummary.averageRating.toFixed(2)} out of 5`;

  function openForm() {
    setFormKey((value) => value + 1);
    setShowForm(true);
  }

  return (
    <section id="reviews" className="px-5 py-[84px]">
      <h2 className="text-center text-[22px] font-normal">Customer Reviews</h2>

      {initialReviews.length ? (
        <ReviewCarousel reviews={initialReviews} productName={productName} />
      ) : (
        <p className="mx-auto mt-8 max-w-[520px] text-center text-[14px] text-[#676869]">
          No reviews yet. Be the first to share your experience with this product.
        </p>
      )}

      <div className="mx-auto mt-9 grid max-w-[1080px] gap-8 border-t border-[#e0e0e0] pt-8 md:grid-cols-3">
        <p>
          <Stars rating={Math.round(initialSummary.averageRating) || 0} />{" "}
          <span className="text-[13px] text-[#676869]">
            {averageLabel}
            <br />
            Based on {initialSummary.totalCount}{" "}
            {initialSummary.totalCount === 1 ? "review" : "reviews"}
          </span>
        </p>

        <div className="grid gap-2 text-[13px] text-[#676869]">
          {([5, 4, 3, 2, 1] as const).map((n) => {
            const count = initialSummary.ratingCounts[n];
            const width =
              initialSummary.totalCount === 0
                ? 0
                : Math.round((count / initialSummary.totalCount) * 100);
            return (
              <p key={n} className="flex items-center gap-3">
                <span className="w-16 shrink-0">
                  {"★".repeat(n)}
                  {"☆".repeat(5 - n)}
                </span>
                <span className="inline-block h-3 w-36 rounded-full bg-[#eee] align-middle">
                  <span
                    className="block h-3 rounded-full bg-black"
                    style={{ width: `${width}%` }}
                  />
                </span>
                <span className="text-[12px]">{count}</span>
              </p>
            );
          })}
        </div>

        <div className="grid content-center gap-3">
          <button
            type="button"
            onClick={() => (showForm ? setShowForm(false) : openForm())}
            className="h-[41px] rounded-full bg-black text-white transition-colors hover:bg-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            {showForm ? "Close" : "Write a review"}
          </button>
        </div>
      </div>

      {showForm ? <ReviewForm key={formKey} productSlug={productSlug} /> : null}
    </section>
  );
}

function ReviewForm({ productSlug }: { productSlug: string }) {
  const [state, formAction, isPending] = useActionState(
    createProductReview,
    initialState,
  );

  if (state.ok) {
    return (
      <p className="mx-auto mt-8 max-w-[560px] rounded border border-[#c8ddcb] bg-[#ecf7ee] px-3 py-2 text-center text-[12px] text-[#28492d]">
        Thanks — your review has been posted.
      </p>
    );
  }

  return (
    <form
      action={formAction}
      className="mx-auto mt-8 grid max-w-[560px] gap-4 rounded-[8px] border border-[#e4e4e4] bg-white p-5"
      noValidate
    >
      <input type="hidden" name="productSlug" value={productSlug} />
      <h3 className="text-[16px] font-normal text-[#1f1f1f]">Write a review</h3>

      {state.error ? (
        <p className="rounded border border-[#f0c7c7] bg-[#fff5f5] px-3 py-2 text-[12px] text-[#9f1d1d]">
          {state.error}
        </p>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-[11px] text-[#222]">Your name</span>
        <input
          name="authorName"
          type="text"
          required
          className="h-[43px] w-full border border-[#d8d8d8] bg-white px-3 text-[13px] text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          aria-invalid={Boolean(state.fieldErrors?.authorName)}
        />
        {state.fieldErrors?.authorName ? (
          <span className="mt-1 block text-[11px] text-[#9f1d1d]">
            {state.fieldErrors.authorName}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className="mb-2 block text-[11px] text-[#222]">Rating</span>
        <select
          name="rating"
          defaultValue="5"
          className="h-[43px] w-full border border-[#d8d8d8] bg-white px-3 text-[13px] text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          aria-invalid={Boolean(state.fieldErrors?.rating)}
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} {value === 1 ? "star" : "stars"}
            </option>
          ))}
        </select>
        {state.fieldErrors?.rating ? (
          <span className="mt-1 block text-[11px] text-[#9f1d1d]">
            {state.fieldErrors.rating}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className="mb-2 block text-[11px] text-[#222]">Your review</span>
        <textarea
          name="comment"
          required
          rows={4}
          className="w-full resize-y border border-[#d8d8d8] bg-white px-3 py-2 text-[13px] text-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          aria-invalid={Boolean(state.fieldErrors?.comment)}
        />
        {state.fieldErrors?.comment ? (
          <span className="mt-1 block text-[11px] text-[#9f1d1d]">
            {state.fieldErrors.comment}
          </span>
        ) : null}
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="h-[41px] rounded-full bg-black text-white transition-colors hover:bg-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#717171]"
      >
        {isPending ? "Saving..." : "Submit review"}
      </button>
    </form>
  );
}

function ReviewCarousel({
  reviews,
  productName,
}: {
  reviews: ProductReview[];
  productName: string;
}) {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    function syncPerPage() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setPerPage(3);
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        setPerPage(2);
      } else {
        setPerPage(1);
      }
    }

    syncPerPage();
    window.addEventListener("resize", syncPerPage);
    return () => window.removeEventListener("resize", syncPerPage);
  }, []);

  const pageCount = Math.max(1, Math.ceil(reviews.length / perPage));
  const safePage = ((page % pageCount) + pageCount) % pageCount;
  const pageReviews = reviews.slice(
    safePage * perPage,
    safePage * perPage + perPage,
  );

  useEffect(() => {
    if (paused || pageCount <= 1) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const id = window.setInterval(() => {
      setPage((current) => current + 1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [paused, pageCount]);

  function goPrev() {
    setPage((current) => current - 1);
  }

  function goNext() {
    setPage((current) => current + 1);
  }

  return (
    <div
      className="mx-auto mt-8 max-w-[1080px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative">
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: `repeat(${Math.min(perPage, pageReviews.length)}, minmax(0, 1fr))`,
          }}
          aria-live="polite"
          aria-atomic="false"
        >
          {pageReviews.map((review) => (
            <article
              key={review.id}
              className="min-h-[220px] rounded-[8px] bg-white p-5 shadow-[0_3px_15px_rgba(0,0,0,0.12)]"
            >
              <div className="flex justify-between gap-3">
                <Stars rating={review.rating} />
                <span className="text-[12px] text-[#676869]">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <p className="mt-4 text-[13px] text-[#4d4f52]">{review.authorName}</p>
              <p className="mt-3 text-[12px] text-[#9b9b9b]">{productName}</p>
              <p className="mt-5 line-clamp-5 text-[14px] leading-6 text-[#4d4f52]">
                {review.comment}
              </p>
            </article>
          ))}
        </div>

        {pageCount > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous reviews"
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8d8d8] bg-white text-[#222] shadow-sm transition-colors hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent sm:-translate-x-1/2"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next reviews"
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d8d8d8] bg-white text-[#222] shadow-sm transition-colors hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent sm:translate-x-1/2"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {pageCount > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-4 text-[12px] text-[#676869]">
          <span>
            {safePage + 1} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="underline hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            aria-pressed={paused}
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  const safe = Math.max(0, Math.min(5, rating));
  return (
    <span className="text-[18px] leading-none text-[#ffc400]" aria-label={`${safe} out of 5 stars`}>
      {"★".repeat(safe)}
      <span className="text-[#ddd]">{"★".repeat(5 - safe)}</span>
    </span>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
