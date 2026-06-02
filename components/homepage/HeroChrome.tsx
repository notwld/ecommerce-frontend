"use client";

import Image from "next/image";
import Link from "next/link";
import type { HomepageProduct } from "./ProductStrip";
import { useHeroChromeInteractions } from "@/hooks/useHeroChromeInteractions";
import { MobileMenuDrawer } from "@/components/layout/MobileMenuDrawer";

type HeroChromeProps = {
  hero: {
    desktopImage: string;
    mobileImage: string;
  };
  products: HomepageProduct[];
};

export function HeroChrome({ hero, products }: HeroChromeProps) {
  const { cartOpen, menuOpen, setCartOpen, setMenuOpen } = useHeroChromeInteractions();
  const cartProduct = products[1];

  return (
    <section className="relative overflow-hidden bg-brand-background">
      <div className="h-[42px] bg-brand-primary text-center text-[14px] font-bold leading-[42px] text-white">
        <Link
          href="/collections/clearance-sale"
          className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary"
        >
          CLEARANCE SALE | SHOP NOW
        </Link>
      </div>

      <div className="relative">
        <div className="relative hidden aspect-[2400/936] w-full md:block">
          <Image
            src={hero.desktopImage}
            alt="Mendeez new arrivals"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="relative aspect-[680/950] w-full md:hidden">
          <Image
            src={hero.mobileImage}
            alt="Mendeez new arrivals"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <header className="absolute left-0 right-0 top-0 z-20 grid h-[118px] grid-cols-[1fr_auto_1fr] items-start px-5 pt-[40px] text-white sm:px-[72px]">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="flex h-8 w-8 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <span className="relative block h-[14px] w-[20px] before:absolute before:left-0 before:top-0 before:h-[2px] before:w-full before:bg-current after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-current" />
            </button>
            <Link
              href="/search"
              className="hidden items-center gap-3 text-[9px] font-bold leading-none sm:flex"
              aria-label="Search"
            >
              <SearchIcon />
              <span>Search</span>
            </Link>
          </div>

          <Link
            href="/"
            aria-label="Mendeez home"
            className="mt-[1px] text-[25px] font-bold leading-none tracking-[0.55em] text-white [text-indent:0.55em]"
          >
            MENDEEZ
          </Link>

          <nav className="flex items-center justify-end gap-7 text-[10px] font-bold leading-none">
            <a
              href="/account"
              className="hidden hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:inline"
            >
              Account
            </a>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Open cart"
            >
              <span className="hidden sm:inline">Cart</span>
              <BagIcon />
            </button>
          </nav>
        </header>
      </div>

      <button
        type="button"
        aria-label="Open WhatsApp"
        className="fixed bottom-6 right-7 z-30 flex h-[55px] w-[55px] items-center justify-center rounded-full bg-brand-secondary text-white shadow-[0_6px_16px_rgba(0,0,0,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
      >
        <WhatsAppIcon />
      </button>

      {menuOpen ? (
        <MobileMenuDrawer
          activeHref="/collections/clearance-sale"
          onClose={() => setMenuOpen(false)}
        />
      ) : null}

      {cartOpen ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
          <aside
            className="h-full w-[536px] max-w-full overflow-y-auto bg-white text-brand-text shadow-[-8px_0_24px_rgba(0,0,0,0.12)]"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-[31px] pb-7 pt-[29px]">
              <h2 className="text-[22px] font-normal leading-none">
                Your cart (1)
              </h2>
              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setCartOpen(false)}
                className="text-[#676869] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mx-[31px] mb-8 flex h-[49px] items-center gap-3 rounded-[3px] bg-black px-5 text-[14px] font-bold text-white">
              <ShirtIcon />
              <span>Your cart is waiting</span>
            </div>

            <div className="grid grid-cols-[100px_1fr_auto] gap-7 px-[31px] pb-8">
              <div className="relative h-[150px] w-[100px] overflow-hidden bg-[#f0f1f3]">
                <Image
                  src={cartProduct.image}
                  alt={cartProduct.name}
                  fill
                  sizes="100px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-[14px] font-bold leading-5 text-[#4d4f52]">
                  {cartProduct.name}
                </h3>
                <p className="mt-1 text-[11px] text-[#676869]">Size: M</p>
                <div className="mt-10 inline-grid h-[35px] grid-cols-3 border border-[#d6d6d6] text-[#8c8c8c]">
                  <button type="button" className="w-9" aria-label="Reduce quantity">
                    -
                  </button>
                  <span className="grid w-9 place-items-center text-[13px]">1</span>
                  <button type="button" className="w-9" aria-label="Increase quantity">
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-bold leading-5 text-[#4d4f52]">
                  {cartProduct.price}
                </p>
                <p className="text-[11px] text-[#9b9b9b] line-through">
                  {cartProduct.originalPrice}
                </p>
              </div>
            </div>

            <div className="bg-[#f7f7f8] px-[31px] pb-7 pt-[34px]">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-[14px] text-[#4d4f52]">You may also like...</p>
                <div className="flex gap-5 text-[#676869]">
                  <ChevronIcon className="rotate-180" />
                  <ChevronIcon />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {products.slice(1, 3).map((product) => (
                  <div key={product.name} className="relative h-[176px] overflow-hidden bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="220px"
                      className="object-cover object-top"
                    />
                    <span className="absolute left-3 top-3 bg-[#b33323] px-3 py-1 text-[12px] font-bold leading-none text-white">
                      {product.discount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-[31px] py-7">
              <label className="mb-2 block text-[14px] font-bold text-[#6f3fa0]">
                giftkarte
              </label>
              <input
                type="text"
                value="GK-12345678ABCD-1234"
                readOnly
                aria-label="Gift card number"
                className="h-[33px] w-full border border-[#d6d6d6] px-2 text-[13px] text-[#676869] focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
              <p className="mt-1 text-[10px] text-[#676869]">
                Format: Gift Card Number-Security Code
              </p>

              <div className="mt-6 border-t border-[#e3e3e3] pt-5">
                <div className="flex items-center justify-between text-[22px] leading-none">
                  <p>Subtotal:</p>
                  <p>{cartProduct.price}</p>
                </div>
                <p className="mt-4 text-[14px] text-[#4d4f52]">
                  Taxes, discounts and <a className="underline" href="/policies/shipping-policy">shipping</a> calculated at checkout.
                </p>
                <a href="/cart" className="mt-2 block text-[14px] underline">
                  Order note
                </a>
                <button
                  type="button"
                  className="mt-5 h-[46px] w-full bg-[#171717] text-[13px] font-bold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  className="mt-6 h-[46px] w-full border border-[#171717] bg-white text-[13px] text-brand-text transition-colors hover:bg-[#f7f7f8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                >
                  Checkout with Rewards
                </button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
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

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

function ShirtIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M6.2 2.5 9 4.1l2.8-1.6 3.3 2.1-1.7 3-1.5-.8v8H6.1v-8l-1.5.8-1.7-3 3.3-2.1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6.3 25.7 7.7 21A11 11 0 1 1 12 25.4l-5.7.3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12.3 10.4c.3-.6.5-.6.9-.6h.7c.2 0 .5.1.7.5.2.5.8 2 .9 2.2.1.2.1.4 0 .6-.2.4-.4.6-.7.9-.2.2-.4.4-.2.8.2.4.9 1.5 1.9 2.4 1.3 1.2 2.4 1.6 2.8 1.8.3.1.6.1.8-.2l1.1-1.3c.3-.4.6-.3.9-.2l2.1 1c.4.2.6.3.7.5.1.2.1 1.6-.4 2.2-.5.7-1.9 1.4-3.2 1.2-1.3-.2-3.1-.8-5.2-2.1-2.6-1.6-4.3-3.9-4.9-5.1-.6-1.1-1.4-3.1-.6-4.6Z" fill="currentColor" />
    </svg>
  );
}
