"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useHeroChromeInteractions } from "@/hooks/useHeroChromeInteractions";
import { useCart } from "@/components/cart/CartProvider";
import { MobileMenuDrawer } from "@/components/layout/MobileMenuDrawer";

const heroSlides = [
  "/hero/slide-1.webp",
  "/hero/slide-2.webp",
  "/hero/slide-3.webp",
  "/hero/slide-4.webp",
  "/hero/slide-5.webp",
];

export function HeroChrome() {
  const { menuOpen, setMenuOpen } = useHeroChromeInteractions();
  const { cart, openCart } = useCart();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

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

      <div className="relative aspect-[680/950] w-full overflow-hidden md:aspect-[2400/936]">
        <AnimatePresence>
          <motion.div
            key={slide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={heroSlides[slide]}
              alt="AT Wardrobe new arrivals"
              fill
              priority={slide === 0}
              sizes="100vw"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
          <p className="font-sans text-[clamp(13px,1.7vw,26px)] font-semibold uppercase tracking-[0.4em]">
            The Drop
          </p>
          <h1 className="font-sans text-[clamp(44px,10.5vw,150px)] font-bold italic uppercase leading-[0.85] tracking-[-0.01em]">
            New Arrivals
          </h1>
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

          <Link href="/" aria-label="AT Wardrobe home" className="mt-[1px]">
            <Image
              src="/logo-light.webp"
              alt="AT Wardrobe"
              width={640}
              height={494}
              priority
              className="h-[52px] w-auto"
            />
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
              onClick={openCart}
              className="relative flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Open cart"
            >
              <span className="hidden sm:inline">Cart</span>
              <BagIcon />
              {cart && cart.totalQuantity > 0 ? (
                <span className="absolute -right-3 -top-2 grid h-4 w-4 place-items-center rounded-full bg-white text-[10px] text-black">{cart.totalQuantity}</span>
              ) : null}
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

function WhatsAppIcon() {
  return (
    <svg width="31" height="31" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6.3 25.7 7.7 21A11 11 0 1 1 12 25.4l-5.7.3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12.3 10.4c.3-.6.5-.6.9-.6h.7c.2 0 .5.1.7.5.2.5.8 2 .9 2.2.1.2.1.4 0 .6-.2.4-.4.6-.7.9-.2.2-.4.4-.2.8.2.4.9 1.5 1.9 2.4 1.3 1.2 2.4 1.6 2.8 1.8.3.1.6.1.8-.2l1.1-1.3c.3-.4.6-.3.9-.2l2.1 1c.4.2.6.3.7.5.1.2.1 1.6-.4 2.2-.5.7-1.9 1.4-3.2 1.2-1.3-.2-3.1-.8-5.2-2.1-2.6-1.6-4.3-3.9-4.9-5.1-.6-1.1-1.4-3.1-.6-4.6Z" fill="currentColor" />
    </svg>
  );
}
