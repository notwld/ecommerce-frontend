"use client";

import Link from "next/link";
import type { Collection, CollectionProduct } from "./collectionData";
import { useCollectionInteractions } from "@/hooks/useCollectionInteractions";
import { useCart } from "@/components/cart/CartProvider";
import type { CollectionSortOption } from "@/types/interactions";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { MobileMenuDrawer } from "@/components/layout/MobileMenuDrawer";

const sortOptions: CollectionSortOption[] = [
  "Featured",
  "Most relevant",
  "Best selling",
  "Price, low to high",
  "Price, high to low",
  "Date, old to new",
  "Date, new to old",
];

export function CollectionExperience({
  collection,
  emptyMessage,
}: {
  collection: Collection;
  emptyMessage?: string;
}) {
  const {
    filterOpen,
    menuOpen,
    products,
    selectedSizes,
    setFilterOpen,
    setMenuOpen,
    setSort,
    setSortOpen,
    sizes,
    sort,
    sortOpen,
    toggleSize,
  } = useCollectionInteractions(collection);

  const { cart, openCart } = useCart();
  const hasCatalogProducts = collection.products.length > 0;
  const showFilterEmptyState = products.length === 0 && selectedSizes.length > 0;

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-brand-text">
      <CollectionHeader
        activeHref={`/collections/${collection.slug}`}
        cartQuantity={cart?.totalQuantity ?? 0}
        menuOpen={menuOpen}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenCart={openCart}
        onOpenMenu={() => setMenuOpen(true)}
      />

      {collection.heroDesktopImage ? (
        <CollectionHero
          title={collection.title}
          desktopImage={collection.heroDesktopImage}
          mobileImage={collection.heroMobileImage ?? collection.heroDesktopImage}
        />
      ) : null}

      <section className="grid grid-cols-2 md:grid-cols-4" aria-label="Featured collections">
        {collection.tiles.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="group relative aspect-[480/482] cursor-pointer overflow-hidden bg-[#d9d9d9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4"
          >
            <ImageWithSkeleton
              src={tile.image}
              alt={tile.title}
              priority
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-black/20" />
            <span className="absolute inset-x-2 bottom-[34px] text-center text-[12px] font-bold uppercase tracking-[0.1em] text-white md:inset-x-4 md:text-[14px] md:tracking-[0.16em]">
              {tile.title}
            </span>
          </Link>
        ))}
      </section>

      <section className="px-5 pb-20 pt-[34px] sm:px-[60px]">
        <div className="relative mb-[28px] grid grid-cols-2 items-start gap-4 md:grid-cols-[1fr_auto_1fr]">
          <button
            type="button"
            onClick={() => setFilterOpen((value) => !value)}
            className="order-2 flex min-h-11 cursor-pointer items-center gap-3 justify-self-start text-[14px] font-bold text-[#676869] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 md:order-none md:mt-[18px]"
          >
            <FilterIcon />
            <span>Filter</span>
            <ChevronIcon className={filterOpen ? "rotate-180" : ""} />
          </button>

          <div className="order-1 col-span-2 text-center md:order-none md:col-span-1">
            <h1 className="text-[23px] font-normal leading-none">{collection.title}</h1>
            <p className="mt-4 text-[13px] text-[#676869]">
              {hasCatalogProducts ? `${collection.productCount} products` : "0 products"}
            </p>
          </div>

          <div className="relative order-3 justify-self-end md:order-none md:mt-[18px]">
            <button
              type="button"
              onClick={() => setSortOpen((value) => !value)}
              className="flex min-h-11 cursor-pointer items-center gap-4 text-[13px] font-bold text-[#676869] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              aria-expanded={sortOpen}
            >
              <span>{sort}</span>
              <ChevronIcon className={sortOpen ? "-rotate-90" : "rotate-90"} />
            </button>
            {sortOpen ? (
              <div className="absolute right-0 top-[43px] z-20 w-[174px] bg-white py-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSort(option);
                      setSortOpen(false);
                    }}
                    className={[
                      "block h-[35px] w-full cursor-pointer px-8 text-left text-[13px] text-[#676869] hover:bg-[#f5f5f5]",
                      option === sort ? "font-bold" : "font-normal",
                    ].join(" ")}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className={filterOpen ? "grid gap-[30px] lg:grid-cols-[290px_1fr]" : ""}>
          {filterOpen ? (
            <aside className="text-[#676869]" aria-label="Collection filters">
              <FilterPanel
                maxPrice={
                  collection.products.length
                    ? Math.max(...collection.products.map((product) => product.price))
                    : 10000
                }
                selectedSizes={selectedSizes}
                sizes={sizes}
                onToggleSize={toggleSize}
              />
            </aside>
          ) : null}

          {products.length ? (
            <div className="grid grid-cols-2 gap-x-[30px] gap-y-[54px] md:grid-cols-4">
              {products.map((product) => (
                <CollectionProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : showFilterEmptyState ? (
            <div className="grid min-h-[220px] place-items-center rounded border border-dashed border-[#d6d6d6] p-6 text-center text-[#676869]">
              <p>No products match your selected filters. Try clearing a size to continue.</p>
            </div>
          ) : (
            <div className="grid min-h-[220px] place-items-center rounded border border-dashed border-[#d6d6d6] p-6 text-center text-[#676869]">
              <p>
                {emptyMessage ??
                  "No products are available in this collection right now. Please check back soon."}
              </p>
            </div>
          )}
        </div>
      </section>

      <WhatsAppButton />
    </main>
  );
}

function CollectionHero({
  title,
  desktopImage,
  mobileImage,
}: {
  title: string;
  desktopImage: string;
  mobileImage: string;
}) {
  const bannerTitle = title.toUpperCase();

  return (
    <section className="bg-white" aria-label={`${title} collection`}>
      <div className="relative hidden aspect-[1920/750] w-full md:block">
        <ImageWithSkeleton
          src={desktopImage}
          alt={`${title} collection`}
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/15" />
        <span className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 flex justify-center md:bottom-[14%]">
          <span className="text-[clamp(1.75rem,7vw,3.5rem)] font-normal uppercase tracking-[0.32em] text-white">
            {bannerTitle}
          </span>
        </span>
      </div>
      <div className="relative aspect-[680/1024] w-full md:hidden">
        <ImageWithSkeleton
          src={mobileImage}
          alt={`${title} collection`}
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/15" />
        <span className="pointer-events-none absolute inset-x-0 bottom-[12%] z-10 flex justify-center">
          <span className="text-[clamp(1.75rem,7vw,3.5rem)] font-normal uppercase tracking-[0.32em] text-white">
            {bannerTitle}
          </span>
        </span>
      </div>
    </section>
  );
}

function CollectionHeader({
  activeHref,
  cartQuantity,
  menuOpen,
  onCloseMenu,
  onOpenCart,
  onOpenMenu,
}: {
  activeHref: string;
  cartQuantity: number;
  menuOpen: boolean;
  onCloseMenu: () => void;
  onOpenCart: () => void;
  onOpenMenu: () => void;
}) {
  return (
    <>
      <div className="h-[42px] bg-brand-primary text-center text-[14px] font-bold leading-[42px] text-white">
        <Link href="/collections/clearance-sale" className="underline-offset-2 hover:underline">
          CLEARANCE SALE | SHOP NOW
        </Link>
      </div>
      <header className="grid h-[96px] grid-cols-[1fr_auto_1fr] items-center px-5 text-brand-text sm:px-[72px]">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Open menu"
            onClick={onOpenMenu}
            className="flex h-11 w-11 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <span className="relative block h-[14px] w-[20px] before:absolute before:left-0 before:top-0 before:h-[2px] before:w-full before:bg-current after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-current" />
          </button>
          <Link href="/search" className="hidden items-center gap-3 text-[9px] font-bold sm:flex">
            <SearchIcon />
            <span>Search</span>
          </Link>
        </div>

        <Link
          href="/"
          aria-label="Mendeez home"
          className="text-[25px] font-bold leading-none tracking-[0.55em] [text-indent:0.55em]"
        >
          MENDEEZ
        </Link>

        <nav className="flex items-center justify-end gap-7 text-[10px] font-bold leading-none">
          <Link href="/account" className="hidden hover:underline sm:inline">
            Account
          </Link>
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex cursor-pointer items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            aria-label="Open cart"
          >
            <span className="hidden sm:inline">Cart</span>
            <BagIcon />
            {cartQuantity > 0 ? (
              <span className="absolute -right-3 -top-2 grid h-4 w-4 place-items-center rounded-full bg-black text-[10px] text-white">
                {cartQuantity}
              </span>
            ) : null}
          </button>
        </nav>
      </header>

      {menuOpen ? (
        <MobileMenuDrawer activeHref={activeHref} onClose={onCloseMenu} />
      ) : null}
    </>
  );
}

function FilterPanel({
  maxPrice,
  selectedSizes,
  sizes,
  onToggleSize,
}: {
  maxPrice: number;
  selectedSizes: string[];
  sizes: string[];
  onToggleSize: (size: string) => void;
}) {
  return (
    <div className="max-w-[320px]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[14px] font-bold">Size</h2>
        <ChevronIcon className="-rotate-90" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {sizes.map((size) => {
          const active = selectedSizes.includes(size);
          return (
            <button
              key={size}
              type="button"
              onClick={() => onToggleSize(size)}
              className={[
                "h-[48px] cursor-pointer border text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
                active ? "border-brand-text bg-brand-text text-white" : "border-[#d6d6d6] bg-white text-[#676869]",
              ].join(" ")}
            >
              {size}
            </button>
          );
        })}
      </div>

      <div className="mt-9">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[14px] font-bold">Price</h2>
          <ChevronIcon className="-rotate-90" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex h-[48px] items-center border border-[#d6d6d6] px-4 text-[14px] text-brand-text">
            Rs 0
          </div>
          <div className="flex h-[48px] items-center border border-[#d6d6d6] px-4 text-[14px] text-brand-text">
            Rs {maxPrice}
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

function CollectionProductCard({ product }: { product: CollectionProduct }) {
  return (
    <article className="group cursor-pointer text-center">
      <Link href={product.href} className="block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4">
        <div className="relative aspect-[426/636] overflow-hidden bg-[#e8e8e6]">
          <ImageWithSkeleton
            src={product.image}
            alt={product.name}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="cursor-pointer object-cover object-top transition-transform duration-200 group-hover:scale-[1.015]"
          />
          {product.discount ? (
            <span className="absolute left-3 top-3 bg-[#b33323] px-3 py-1 text-[12px] font-bold leading-none text-white">
              {product.discount}
            </span>
          ) : null}
        </div>
        <h2 className="mt-4 text-[13px] font-normal leading-5 text-[#676869]">{product.name}</h2>
        <p className="mt-1 text-[14px] leading-none text-[#676869]">
          <span>{product.priceText}</span>
          {product.originalPriceText ? (
            <span className="ml-2 text-[#9b9b9b] line-through">{product.originalPriceText}</span>
          ) : null}
        </p>
        <p className="mt-4 flex justify-center gap-5 text-[10px] text-[#b2b2b2]">
          {product.sizes.slice(0, 5).map((size) => (
            <span key={size}>{size}</span>
          ))}
        </p>
      </Link>
    </article>
  );
}

function SearchIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="m17 17 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="21" height="24" viewBox="0 0 21 24" fill="none" aria-hidden="true">
      <path d="M4.2 7.8h12.6l1.1 14.2H3.1L4.2 7.8Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7.2 7.8V5.4a3.3 3.3 0 0 1 6.6 0v2.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
