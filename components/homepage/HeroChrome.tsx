"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cormorant_Garamond } from "next/font/google";
import { useEffect, useState } from "react";
import { useHeroChromeInteractions } from "@/hooks/useHeroChromeInteractions";
import { useCart } from "@/components/cart/CartProvider";
import { MobileMenuDrawer } from "@/components/layout/MobileMenuDrawer";
import { WhatsAppFloat } from "@/components/layout/SocialIcons";
import { heroSlides } from "./heroSlides";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export function HeroChrome() {
  const { menuOpen, setMenuOpen } = useHeroChromeInteractions();
  const { cart, openCart } = useCart();
  const [slide, setSlide] = useState(0);
  const current = heroSlides[slide];

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, []);

  function go(delta: number) {
    setSlide((s) => (s + delta + heroSlides.length) % heroSlides.length);
  }

  const toneClass = current.tone === "light" ? "text-white" : "text-[#111111]";
  const borderClass = current.tone === "light" ? "border-white" : "border-[#111111]";
  const chromeTone = current.tone === "light" ? "text-white" : "text-[#111111]";

  return (
    <section className="relative h-[calc(100dvh-42px)] min-h-[480px] w-full overflow-hidden bg-[#1a1a1a]">
      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Image
              src={current.image}
              alt={`${current.eyebrow} — ${current.title}`}
              fill
              priority={slide === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: current.objectPosition }}
            />
            {current.tone === "light" ? (
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-transparent md:from-transparent" />
            )}
          </motion.div>
        </AnimatePresence>

        <div
          className={`pointer-events-none absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 md:px-[72px] lg:px-24 ${toneClass}`}
        >
          <div className={`${display.className} max-w-[18ch] md:max-w-[22ch]`}>
            <p className="text-[clamp(11px,1.4vw,15px)] font-semibold uppercase tracking-[0.28em]">
              {current.eyebrow}
            </p>
            <h1 className="mt-3 text-[clamp(36px,7vw,92px)] font-bold uppercase leading-[0.92] tracking-[-0.02em]">
              {current.title}
            </h1>
            <div className="mt-4 space-y-0.5 text-[clamp(15px,2vw,22px)] font-medium leading-snug tracking-wide">
              {current.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="pointer-events-auto mt-8">
            <Link
              href={current.cta.href}
              className={`inline-flex items-center border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${borderClass} ${toneClass}`}
            >
              {current.cta.label}
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-2" aria-hidden="true">
            {heroSlides.map((_, i) => (
              <span
                key={i}
                className={`h-px transition-all duration-500 ${
                  i === slide ? "w-8 bg-current opacity-100" : "w-3 bg-current opacity-35"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className={`absolute left-2 top-1/2 z-20 -translate-y-1/2 p-3 opacity-80 transition hover:opacity-100 sm:left-4 ${chromeTone}`}
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          className={`absolute right-2 top-1/2 z-20 -translate-y-1/2 p-3 opacity-80 transition hover:opacity-100 sm:right-4 ${chromeTone}`}
        >
          <Chevron dir="right" />
        </button>

        <header
          className={`absolute left-0 right-0 top-0 z-20 grid h-[118px] grid-cols-[1fr_auto_1fr] items-start px-5 pt-[40px] sm:px-[72px] ${chromeTone}`}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="flex h-8 w-8 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
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
              src={current.tone === "light" ? "/logo-light.webp" : "/logo-dark.webp"}
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
              className="hidden hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current sm:inline"
            >
              Contact Us
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
              aria-label="Open cart"
            >
              <span className="hidden sm:inline">Cart</span>
              <BagIcon />
              {cart && cart.totalQuantity > 0 ? (
                <span
                  className={`absolute -right-3 -top-2 grid h-4 w-4 place-items-center rounded-full text-[10px] ${
                    current.tone === "light" ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  {cart.totalQuantity}
                </span>
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

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="40" viewBox="0 0 22 40" fill="none" aria-hidden="true">
      {dir === "left" ? (
        <path d="M18 2 4 20l14 18" stroke="currentColor" strokeWidth="1.5" />
      ) : (
        <path d="M4 2l14 18L4 38" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
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
      <path
        d="M7.2 7.8V5.4a3.3 3.3 0 0 1 6.6 0v2.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
