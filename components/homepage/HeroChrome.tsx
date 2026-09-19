"use client";

import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const current = heroSlides[slide];

  const go = useCallback((delta: number) => {
    setSlide((s) => (s + delta + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id: ReturnType<typeof setInterval> | undefined;

    function syncAutoplay() {
      if (id) {
        clearInterval(id);
        id = undefined;
      }
      if (desktop.matches && !reducedMotion.matches) {
        id = setInterval(() => go(1), 6000);
      }
    }

    syncAutoplay();
    desktop.addEventListener("change", syncAutoplay);
    reducedMotion.addEventListener("change", syncAutoplay);
    return () => {
      if (id) clearInterval(id);
      desktop.removeEventListener("change", syncAutoplay);
      reducedMotion.removeEventListener("change", syncAutoplay);
    };
  }, [go]);

  function onTouchStart(event: React.TouchEvent) {
    touchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  function onTouchEnd(event: React.TouchEvent) {
    if (!touchStart.current) return;

    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  }

  const toneClass = current.tone === "light" ? "text-white" : "text-[#111111]";
  const borderClass = current.tone === "light" ? "border-white" : "border-[#111111]";
  const chromeTone = current.tone === "light" ? "text-white" : "text-[#111111]";

  return (
    <section className="relative h-[calc(100svh-42px)] min-h-[560px] w-full overflow-hidden bg-[#1a1a1a] md:h-[calc(100dvh-42px)] md:min-h-[480px]">
      <div
        className="relative h-full w-full overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* All slides stay in the DOM so the browser fetches them with first paint (full quality, no re-encode). */}
        {heroSlides.map((item, i) => (
          <div
            key={item.image}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === slide ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== slide}
          >
            <Image
              src={item.image}
              alt={`${item.eyebrow} — ${item.title}`}
              fill
              priority
              loading="eager"
              fetchPriority={i === 0 ? "high" : "low"}
              sizes="100vw"
              unoptimized
              className="hero-image object-cover"
              style={
                {
                  "--hero-object-position": item.objectPosition,
                  "--hero-mobile-object-position": item.mobileObjectPosition,
                } as React.CSSProperties
              }
            />
            {item.tone === "light" ? (
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-transparent md:from-transparent" />
            )}
          </div>
        ))}

        <div
          className={`pointer-events-none absolute inset-0 z-10 flex flex-col justify-end px-5 pb-[clamp(88px,14vh,144px)] md:justify-center md:px-[72px] md:pb-0 lg:px-24 ${toneClass}`}
        >
          <div className={`${display.className} max-w-[18ch] md:max-w-[22ch]`}>
            <p className="text-[clamp(11px,1.4vw,15px)] font-semibold uppercase tracking-[0.28em]">
              {current.eyebrow}
            </p>
            <h1 className="mt-3 text-[clamp(40px,12vw,92px)] font-bold uppercase leading-[0.92] tracking-[-0.02em] md:text-[clamp(36px,7vw,92px)]">
              {current.title}
            </h1>
            <div className="mt-4 max-w-[25ch] space-y-0.5 text-[clamp(15px,4.2vw,22px)] font-medium leading-snug tracking-wide md:text-[clamp(15px,2vw,22px)]">
              {current.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="pointer-events-auto mt-8">
            <Link
              href={current.cta.href}
              className={`inline-flex min-h-11 items-center border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${borderClass} ${toneClass}`}
            >
              {current.cta.label}
            </Link>
          </div>

          <div
            className="pointer-events-auto mt-10 flex items-center gap-2"
            role="tablist"
            aria-label="Hero slides"
          >
            {heroSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === slide}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`h-px transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current ${
                  i === slide ? "w-8 bg-current opacity-100" : "w-3 bg-current opacity-35"
                }`}
              />
            ))}
          </div>
        </div>

        <SlideNavButton direction="left" onClick={() => go(-1)} />
        <SlideNavButton direction="right" onClick={() => go(1)} />

        <header
          className={`absolute left-0 right-0 top-0 z-20 grid h-[96px] grid-cols-[1fr_auto_1fr] items-start px-4 pt-4 md:h-[118px] md:px-[72px] md:pt-[40px] ${chromeTone}`}
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
            >
              <span className="relative block h-[14px] w-[20px] before:absolute before:left-0 before:top-0 before:h-[2px] before:w-full before:bg-current after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-current" />
            </button>
            <Link
              href="/search"
              className="hidden items-center gap-3 text-[9px] font-bold leading-none md:flex"
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
              className="h-14 w-auto md:h-[72px]"
            />
          </Link>

          <nav className="flex items-center justify-end gap-4 text-[10px] font-bold leading-none md:gap-7">
            <Link
              href="/pages/contact"
              className="hidden hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current md:inline"
            >
              Contact Us
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-11 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
              aria-label="Open cart"
            >
              <span className="hidden md:inline">Cart</span>
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

function SlideNavButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const edgeClass = direction === "left" ? "left-3 md:left-4" : "right-3 md:right-4";

  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
      onClick={onClick}
      className={`absolute z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 max-[479px]:hidden bottom-[clamp(108px,20vh,168px)] md:bottom-auto md:top-1/2 md:-translate-y-1/2 ${edgeClass}`}
    >
      <Chevron dir={direction} />
    </button>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {dir === "left" ? (
        <path
          d="M15 6 9 12l6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="m9 6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
