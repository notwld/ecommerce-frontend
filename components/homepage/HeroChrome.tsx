"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useHeroChromeInteractions } from "@/hooks/useHeroChromeInteractions";
import { useCart } from "@/components/cart/CartProvider";
import { MobileMenuDrawer } from "@/components/layout/MobileMenuDrawer";
import { WhatsAppFloat } from "@/components/layout/SocialIcons";
import { heroSlides } from "./heroSlides";

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
              className="h-[72px] w-auto"
            />
          </Link>

          <nav className="flex items-center justify-end gap-7 text-[10px] font-bold leading-none">
            <Link
              href="/pages/contact"
              className="hidden hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:inline"
            >
              Contact Us
            </Link>
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

      <WhatsAppFloat />

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
