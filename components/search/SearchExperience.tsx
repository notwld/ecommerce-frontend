"use client";

import Link from "next/link";
import { FormEvent } from "react";
import type { SearchCategory, SearchProduct } from "./searchData";
import { useSearchInteractions } from "@/hooks/useSearchInteractions";
import type { SearchSortOption } from "@/types/interactions";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";

type SearchExperienceProps = {
  categories: SearchCategory[];
  initialQuery?: string;
  initialView?: "preview" | "results";
  products: SearchProduct[];
  totalCount?: number;
};

const suggestionTerms = [
  "textured pintex",
  "tank top",
  "tshirt",
  "T-Shirts",
  "T-Shirts Sale",
];

export function SearchExperience({
  categories,
  initialQuery = "",
  initialView = "preview",
  products,
  totalCount,
}: SearchExperienceProps) {
  const {
    filterOpen,
    fullProducts,
    hasQuery,
    previewProducts,
    query,
    resultCount,
    selectedSizes,
    setFilterOpen,
    setQuery,
    setShowResults,
    setSort,
    showResults,
    sort,
    toggleSize,
    trimmedQuery,
  } = useSearchInteractions(products, initialQuery, initialView, totalCount);

  const sizeOptions = Array.from(
    new Set(products.flatMap((product) => product.sizes)),
  ).slice(0, 12);

  function submitSearch(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (trimmedQuery) {
      setShowResults(true);
    }
  }

  function chooseSuggestion(term: string) {
    setQuery(term);
    setShowResults(true);
  }

  return (
    <section className="min-h-screen bg-white">
      <div className={showResults ? "border-t border-[#d9d9d9]" : ""}>
        <div className={showResults ? "pt-[90px]" : "pt-11"}>
          <SearchHeader
            query={query}
            showClose={!showResults}
            onQueryChange={(value) => {
              setQuery(value);
              setShowResults(false);
            }}
            onSubmit={submitSearch}
          />
        </div>

        {!hasQuery ? (
          <DefaultDiscovery categories={categories} />
        ) : showResults ? (
          <FullResults
            filterOpen={filterOpen}
            products={fullProducts}
            resultCount={resultCount}
            selectedSizes={selectedSizes}
            sizeOptions={sizeOptions}
            sort={sort}
            onSortChange={setSort}
            onToggleFilter={() => setFilterOpen((value) => !value)}
            onToggleSize={toggleSize}
          />
        ) : (
          <LivePreview
            products={previewProducts}
            onViewAll={() => setShowResults(true)}
            onSuggestion={chooseSuggestion}
          />
        )}
      </div>

      <WhatsAppButton />
    </section>
  );
}

function SearchHeader({
  query,
  showClose,
  onQueryChange,
  onSubmit,
}: {
  query: string;
  showClose: boolean;
  onQueryChange: (value: string) => void;
  onSubmit: (event?: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="relative mx-auto flex w-full max-w-[770px] items-start justify-center px-5">
      <form
        onSubmit={onSubmit}
        className="relative h-[45px] w-full max-w-[650px] bg-[#f4f4f4]"
        role="search"
      >
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          autoFocus
          aria-label="Search our store"
          placeholder="Search our store"
          className="h-full w-full bg-transparent px-[24px] pr-[68px] text-[13px] text-[#4d4f52] outline-none placeholder:text-[#676869] focus-visible:ring-1 focus-visible:ring-brand-text"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[#676869] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
        >
          <SearchIcon />
        </button>
      </form>

      {showClose ? (
        <Link
          href="/"
          aria-label="Close search"
          className="absolute right-4 top-[10px] text-[#676869] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 md:-right-[84px]"
        >
          <CloseIcon />
        </Link>
      ) : null}
    </div>
  );
}

function DefaultDiscovery({ categories }: { categories: SearchCategory[] }) {
  return (
    <div className="mx-auto max-w-[1088px] px-5 pb-20 pt-[62px]">
      <h1 className="text-center text-[24px] font-normal leading-none">
        You may also like...
      </h1>
      <div className="mt-[42px] grid grid-cols-2 gap-x-[30px] gap-y-[30px] md:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group relative aspect-[248/369] overflow-hidden bg-[#e8e8e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4"
          >
            <ImageWithSkeleton
              src={category.image}
              alt={category.title}
              sizes="(min-width: 768px) 248px, 50vw"
              className="object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/20" />
            <span className="absolute inset-x-3 top-1/2 -translate-y-1/2 text-center text-[20px] font-bold leading-tight text-white">
              {category.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function LivePreview({
  products,
  onSuggestion,
  onViewAll,
}: {
  products: SearchProduct[];
  onSuggestion: (term: string) => void;
  onViewAll: () => void;
}) {
  return (
    <div className="mx-auto max-w-[780px] px-5 pb-20 pt-[12px]">
      <div className="mx-auto flex max-w-[650px] flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-[#8a8d90]">
        <span className="text-[#676869]">Suggestions:</span>
        {suggestionTerms.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onSuggestion(term)}
            className="hover:text-brand-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            {term}
          </button>
        ))}
      </div>

      <div className="mt-[64px] grid justify-center gap-[30px] sm:grid-cols-[248px_248px]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>

      <div className="mt-[82px] text-center">
        <h2 className="text-[16px] font-normal leading-none">Pages</h2>
        <div className="mt-5 grid gap-3 text-[13px] text-[#676869]">
          <Link href="/pages/t-shirts-size-chart" className="hover:underline">
            T-Shirts Size Chart
          </Link>
          <Link href="/pages/oversized-t-shirts-size-chart" className="hover:underline">
            Oversized T-Shirts Size Chart
          </Link>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="mt-[40px] h-[44px] w-[172px] border border-brand-text bg-white text-[13px] text-brand-text transition-colors hover:bg-[#f7f7f8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
        >
          View all search results
        </button>
      </div>
    </div>
  );
}

function FullResults({
  filterOpen,
  products,
  resultCount,
  selectedSizes,
  sizeOptions,
  sort,
  onSortChange,
  onToggleFilter,
  onToggleSize,
}: {
  filterOpen: boolean;
  products: SearchProduct[];
  resultCount: number;
  selectedSizes: string[];
  sizeOptions: string[];
  sort: SearchSortOption;
  onSortChange: (value: SearchSortOption) => void;
  onToggleFilter: () => void;
  onToggleSize: (size: string) => void;
}) {
  return (
    <div className="px-5 pb-20 pt-[68px] sm:px-[60px]">
      <div className="mb-[27px] grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <button
          type="button"
          onClick={onToggleFilter}
          className="flex items-center gap-3 justify-self-start text-[14px] font-bold text-[#676869] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
        >
          <FilterIcon />
          <span>Filter</span>
          <ChevronIcon className={filterOpen ? "rotate-180" : ""} />
        </button>
        <p className="text-center text-[14px] text-[#676869]">
          We found {resultCount} results
        </p>
        <label className="flex items-center gap-2 justify-self-end text-[12px] font-bold text-[#676869]">
          <span className="sr-only">Sort results</span>
          <select
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as SearchSortOption)
            }
            className="bg-white pr-7 text-[12px] font-bold outline-none focus:ring-2 focus:ring-brand-accent"
          >
            <option>Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </label>
      </div>

      <div className={filterOpen ? "grid gap-[30px] lg:grid-cols-[290px_1fr]" : ""}>
        {filterOpen ? (
          <aside className="text-[#676869]" aria-label="Search filters">
            <FilterSidebar
              selectedSizes={selectedSizes}
              sizeOptions={sizeOptions}
              onToggleSize={onToggleSize}
            />
          </aside>
        ) : null}

        {products.length ? (
          <div className="grid grid-cols-2 gap-x-[30px] gap-y-[54px] md:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="grid min-h-[220px] place-items-center rounded border border-dashed border-[#d6d6d6] p-6 text-center text-[#676869]">
            <p>No matching products found. Try removing a filter or changing your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSidebar({
  selectedSizes,
  sizeOptions,
  onToggleSize,
}: {
  selectedSizes: string[];
  sizeOptions: string[];
  onToggleSize: (size: string) => void;
}) {
  return (
    <div className="max-w-[320px]">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-[14px] font-bold">Size</h2>
        <ChevronIcon className="-rotate-90" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {sizeOptions.map((size) => {
          const active = selectedSizes.includes(size);
          return (
            <button
              key={size}
              type="button"
              onClick={() => onToggleSize(size)}
              className={[
                "h-[48px] border text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
                active
                  ? "border-brand-text bg-brand-text text-white"
                  : "border-[#d6d6d6] bg-white text-[#676869] hover:border-brand-text",
                size === "One Size" ? "col-span-2" : "",
              ].join(" ")}
            >
              {size}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="mt-8 flex w-full items-center justify-between text-[14px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
      >
        <span>Product Type</span>
        <ChevronIcon />
      </button>

      <div className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[14px] font-bold">Price</h2>
          <ChevronIcon className="-rotate-90" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex h-[48px] items-center border border-[#d6d6d6] px-4 text-[14px] text-brand-text">
            Rs 0
          </div>
          <div className="flex h-[48px] items-center border border-[#d6d6d6] px-4 text-[14px] text-brand-text">
            Rs 5990
          </div>
        </div>
        <div className="relative mt-[30px] h-5">
          <div className="absolute left-[14px] right-[14px] top-[9px] h-[3px] bg-[#232323]" />
          <div className="absolute left-1 top-0 h-[22px] w-[22px] rounded-full border-2 border-[#232323] bg-white" />
          <div className="absolute right-1 top-0 h-[22px] w-[22px] rounded-full border-2 border-[#232323] bg-white" />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, compact = false }: { product: SearchProduct; compact?: boolean }) {
  return (
    <article className="group text-center">
      <Link
        href={product.href}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4"
      >
        <div className={compact ? "relative aspect-[248/371] overflow-hidden bg-[#f0f1f3]" : "relative aspect-[426/636] overflow-hidden bg-[#f0f1f3]"}>
          <ImageWithSkeleton
            src={product.image}
            alt={product.name}
            sizes={compact ? "248px" : "(min-width: 1024px) 25vw, 50vw"}
            className="object-cover object-top transition-transform duration-200 group-hover:scale-[1.015]"
          />
          {product.discount ? (
            <span className="absolute left-3 top-3 bg-[#b33323] px-3 py-1 text-[12px] font-bold leading-none text-white">
              {product.discount}
            </span>
          ) : null}
        </div>
        <h2 className="mt-4 text-[13px] font-normal leading-5 text-[#676869]">
          {product.name}
        </h2>
        <p className="mt-1 text-[14px] leading-none text-[#676869]">
          <span>{product.priceText}</span>
          <span className="ml-2 text-[#9b9b9b] line-through">
            {product.originalPriceText}
          </span>
        </p>
        {!compact ? (
          <p className="mt-4 flex justify-center gap-5 text-[10px] text-[#b2b2b2]">
            {product.sizes.slice(0, 5).map((size) => (
              <span key={size}>{size}</span>
            ))}
          </p>
        ) : null}
      </Link>
    </article>
  );
}

function SearchIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="8.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m16.7 16.7 4.7 4.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4l16 16M20 4 4 20" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="7" cy="5" r="2" fill="white" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="13" cy="10" r="2" fill="white" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="6" cy="15" r="2" fill="white" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m5.5 3.5 4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppButton() {
  return (
    <button
      type="button"
      aria-label="Open WhatsApp"
      className="fixed bottom-6 right-7 z-30 flex h-[55px] w-[55px] items-center justify-center rounded-full bg-brand-secondary text-white shadow-[0_6px_16px_rgba(0,0,0,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
    >
      <svg width="31" height="31" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6.3 25.7 7.7 21A11 11 0 1 1 12 25.4l-5.7.3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12.3 10.4c.3-.6.5-.6.9-.6h.7c.2 0 .5.1.7.5.2.5.8 2 .9 2.2.1.2.1.4 0 .6-.2.4-.4.6-.7.9-.2.2-.4.4-.2.8.2.4.9 1.5 1.9 2.4 1.3 1.2 2.4 1.6 2.8 1.8.3.1.6.1.8-.2l1.1-1.3c.3-.4.6-.3.9-.2l2.1 1c.4.2.6.3.7.5.1.2.1 1.6-.4 2.2-.5.7-1.9 1.4-3.2 1.2-1.3-.2-3.1-.8-5.2-2.1-2.6-1.6-4.3-3.9-4.9-5.1-.6-1.1-1.4-3.1-.6-4.6Z" fill="currentColor" />
      </svg>
    </button>
  );
}
