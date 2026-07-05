"use client";

import Link from "next/link";
import { useState } from "react";
import type { ProductDetail, ProductRecommendation } from "./productData";
import { useProductInteractions } from "@/hooks/useProductInteractions";
import { useCart } from "@/components/cart/CartProvider";
import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";
import { MobileMenuDrawer } from "@/components/layout/MobileMenuDrawer";

export function ProductExperience({ product }: { product: ProductDetail }) {
  const {
    activeImage,
    hasMultipleImages,
    menuOpen,
    openSections,
    selectedSize,
    setActiveImage,
    setMenuOpen,
    setSelectedSize,
    showNextImage,
    showPreviousImage,
    toggleSection,
  } = useProductInteractions(product);

  const { cart, add, openCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const selectedVariant =
    product.sizeVariants.find((variant) => variant.size === selectedSize) ??
    (product.sizeVariants.length === 1 ? product.sizeVariants[0] : undefined);
  const canAddToCart = Boolean(selectedVariant?.availableForSale);

  async function handleAddToCart() {
    if (!selectedVariant) return;
    setAdding(true);
    setAddError(null);
    const res = await add(selectedVariant.variantId);
    setAdding(false);
    if (!res.ok) setAddError(res.error);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-brand-text">
      <ProductHeader
        cartQuantity={cart?.totalQuantity ?? 0}
        menuOpen={menuOpen}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenCart={openCart}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <section className="mx-auto grid max-w-[1360px] gap-11 px-5 pb-12 pt-[38px] lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] text-[#676869]" aria-label="Breadcrumb">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronIcon className="h-3 w-3" />
            <Link href={product.collectionHref} className="hover:underline">{product.collection}</Link>
            <ChevronIcon className="h-3 w-3" />
            <span>{product.name}</span>
          </nav>

          <div className="relative aspect-[612/792] overflow-hidden bg-[#f0f1f3]">
            <ImageWithSkeleton
              src={product.images[activeImage] ?? product.images[0] ?? "/favicon.webp"}
              alt={product.name}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
            {product.discount ? (
              <span className="absolute right-3 top-3 bg-[#b33323] px-4 py-2 text-[12px] font-bold leading-none text-white">
                {product.discount}
              </span>
            ) : null}
          </div>
        </div>

        <aside className="pt-0 lg:pt-[41px]">
          <div className="mb-8 flex justify-end gap-5 text-[11px] text-[#676869]">
            <button type="button" disabled={!hasMultipleImages} onClick={showPreviousImage} className="cursor-pointer hover:underline disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronIcon className="mr-1 inline h-3 w-3 rotate-180" />
              Previous
            </button>
            <button type="button" disabled={!hasMultipleImages} onClick={showNextImage} className="cursor-pointer hover:underline disabled:cursor-not-allowed disabled:opacity-40">
              Next
              <ChevronIcon className="ml-1 inline h-3 w-3" />
            </button>
          </div>

          <div className="grid gap-7 xl:grid-cols-[1fr_auto] xl:items-start">
            <div>
              <h1 className="text-[28px] font-normal leading-tight">{product.name}</h1>
              <p className="mt-7 text-[20px] leading-none">
                <span className="text-[#ef402f]">{product.priceText}</span>
                {product.originalPriceText ? (
                  <span className="ml-4 text-[#676869] line-through">{product.originalPriceText}</span>
                ) : null}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-12 text-[12px] text-[#676869] xl:pt-[54px]">
              <Stars />
              <span>{product.reviewCount} review</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-5">
            {product.colorImages.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                className={[
                  "relative h-[80px] w-[80px] cursor-pointer overflow-hidden bg-[#f0f1f3] ring-offset-2",
                  activeImage === index ? "ring-2 ring-brand-text" : "ring-0",
                ].join(" ")}
                aria-label={`View product image ${index + 1}`}
              >
                <ImageWithSkeleton src={image} alt="" sizes="80px" className="object-cover object-top" />
              </button>
            ))}
          </div>

          <p className="mt-7 text-[13px] font-bold text-[#676869]">SKU: {product.sku}</p>

          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-[13px] font-bold text-[#676869]">Size</p>
            <Link href="/pages/t-shirts-size-chart" className="text-[13px] text-brand-text underline">
              Measurements
            </Link>
          </div>

          <div className="mt-3 grid grid-cols-5 gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={[
                  "h-[48px] cursor-pointer border text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2",
                  selectedSize === size ? "border-brand-text bg-white text-brand-text shadow-[inset_0_0_0_1px_#000]" : "border-[#d6d6d6] text-[#676869] hover:border-brand-text",
                ].join(" ")}
              >
                {size}
              </button>
            ))}
          </div>

          <p className="mt-8 max-w-[560px] text-[13px] leading-7 text-[#676869]">{product.rewardText}</p>

          <button
            type="button"
            disabled={!canAddToCart || adding}
            onClick={handleAddToCart}
            className="mt-9 h-[46px] w-full cursor-pointer bg-[#242424] text-[13px] font-bold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#717171]"
          >
            {adding ? "Adding…" : "Add to cart"}
          </button>
          {!canAddToCart ? (
            <p className="mt-3 text-[12px] text-[#676869]">This item is currently unavailable in the selected size.</p>
          ) : null}
          {addError ? <p className="mt-3 text-[12px] text-[#b33323]">{addError}</p> : null}

          <div className="mt-8 border-t border-[#e0e0e0]">
            <Accordion title="Description" icon={<ShirtIcon />} open={openSections.description} onToggle={() => toggleSection("description")}>
              {product.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="grid gap-1">
                {product.details.map((detail) => (
                  <p key={detail.label}><strong>{detail.label}:</strong> {detail.value}</p>
                ))}
              </div>
              <p className="font-bold">Size & Fit</p>
              <div className="grid gap-1">
                {product.sizeFit.map((detail) => (
                  <p key={detail.label}><strong>{detail.label}:</strong> {detail.value}</p>
                ))}
              </div>
            </Accordion>
            <Accordion title="Returns & Exchanges" icon={<ReturnIcon />} open={openSections.returns} onToggle={() => toggleSection("returns")}>
              <p><strong>Return Policy:</strong></p>
              <p>Returns are accepted for unworn, unwashed items with original tags within 7 days of purchase. Sale items are not eligible for return.</p>
              <p><strong>Exchange Policy:</strong></p>
              <p>Exchanges are accepted within 7 days when the item is unworn, unaltered, and in original condition.</p>
            </Accordion>
            <Accordion title="Shipping" icon={<TruckIcon />} open={openSections.shipping} onToggle={() => toggleSection("shipping")}>
              <p>Flat shipping fee of Rs. 200 on orders below Rs. 2500.</p>
              <p>Free shipping on orders above Rs. 2499.</p>
              <p>Orders are typically delivered within 1-7 business days. Delivery times vary by location.</p>
            </Accordion>
          </div>
        </aside>
      </section>

      <Recommendations products={product.recommendations} />
      <Reviews productName={product.name} />
      <Faqs />
      <WhatsAppButton />
    </main>
  );
}

function ProductHeader({
  cartQuantity,
  menuOpen,
  onCloseMenu,
  onOpenCart,
  onOpenMenu,
}: {
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
      <header className="grid h-[96px] grid-cols-[1fr_auto_1fr] items-center border-b border-[#d9d9d9] px-5 text-brand-text sm:px-[72px]">
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Open menu" onClick={onOpenMenu} className="flex h-11 w-11 cursor-pointer items-center justify-center">
            <span className="relative block h-[14px] w-[20px] before:absolute before:left-0 before:top-0 before:h-[2px] before:w-full before:bg-current after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-current" />
          </button>
          <Link href="/search" className="hidden items-center gap-3 text-[9px] font-bold sm:flex"><SearchIcon /><span>Search</span></Link>
        </div>
        <Link href="/" aria-label="Mendeez home" className="text-[25px] font-bold leading-none tracking-[0.55em] [text-indent:0.55em]">MENDEEZ</Link>
        <nav className="flex items-center justify-end gap-7 text-[10px] font-bold leading-none">
          <Link href="/account" className="hidden hover:underline sm:inline">Account</Link>
          <button type="button" onClick={onOpenCart} className="relative flex cursor-pointer items-center gap-3" aria-label="Open cart">
            <span className="hidden sm:inline">Cart</span><BagIcon />
            <span className="absolute -right-3 -top-2 grid h-4 w-4 place-items-center rounded-full bg-black text-[10px] text-white">{cartQuantity}</span>
          </button>
        </nav>
      </header>
      {menuOpen ? (
        <MobileMenuDrawer
          activeHref="/collections/clearance-sale"
          onClose={onCloseMenu}
        />
      ) : null}
    </>
  );
}

function Accordion({ title, icon, open, onToggle, children }: { title: string; icon: React.ReactNode; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <section className="border-b border-[#e0e0e0] py-5">
      <button type="button" onClick={onToggle} className="flex w-full cursor-pointer items-center justify-between text-left text-[14px] font-bold text-[#676869]">
        <span className="flex items-center gap-3">{icon}{title}</span><span>{open ? "-" : "+"}</span>
      </button>
      {open ? <div className="mt-6 grid gap-5 text-[13px] leading-7 text-[#75808a]">{children}</div> : null}
    </section>
  );
}

function Recommendations({ products }: { products: ProductRecommendation[] }) {
  return (
    <section className="bg-[#f7f7f8] px-5 py-[50px] sm:px-[60px]">
      <h2 className="text-center text-[21px] font-normal">You may also like...</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-[30px] gap-y-12 md:grid-cols-4">
        {products.map((item) => (
          <article key={item.id} className="group cursor-pointer text-center">
            <Link href={item.href} className="block cursor-pointer">
              <div className="relative aspect-[426/636] overflow-hidden bg-[#ededed]">
                <ImageWithSkeleton src={item.image} alt={item.name} sizes="(min-width: 768px) 25vw, 50vw" className="object-cover object-top transition-transform group-hover:scale-[1.015]" />
                {item.discount ? <span className="absolute left-3 top-3 bg-[#b33323] px-3 py-1 text-[12px] font-bold text-white">{item.discount}</span> : null}
              </div>
              <h3 className="mt-4 text-[13px] text-[#676869]">{item.name}</h3>
              <p className="mt-2 text-[14px] text-[#676869]">{item.priceText}{item.originalPriceText ? <span className="ml-3 text-[#9b9b9b] line-through">{item.originalPriceText}</span> : null}</p>
            </Link>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {item.colors.map((color, index) => <span key={`${color}-${index}`} className="h-4 w-4 rounded-full border border-[#ddd]" style={{ backgroundColor: color }} />)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Reviews({ productName }: { productName: string }) {
  return (
    <section className="px-5 py-[84px]">
      <h2 className="text-center text-[22px] font-normal">Customer Reviews</h2>
      <div className="mx-auto mt-8 max-w-[350px] rounded-[8px] bg-white p-5 shadow-[0_3px_15px_rgba(0,0,0,0.12)]">
        <div className="flex justify-between"><Stars /><span className="text-[12px] text-[#676869]">07/05/2025</span></div>
        <p className="mt-4 text-[13px] text-[#4d4f52]">Sameer khavar <span className="ml-2 rounded bg-black px-2 py-1 text-[10px] text-white">Verified</span></p>
        <p className="mt-10 text-[14px] text-[#4d4f52]">{productName}</p>
        <Link href="#reviews" className="mt-24 block text-[12px] underline">Full Review</Link>
      </div>
      <div className="mx-auto mt-9 grid max-w-[920px] gap-8 border-t border-[#e0e0e0] pt-8 md:grid-cols-3">
        <p><Stars /> <span className="text-[13px] text-[#676869]">5.00 out of 5<br />Based on 1 review</span></p>
        <div className="grid gap-2 text-[13px] text-[#676869]">{[5, 4, 3, 2, 1].map((n) => <p key={n}>{"★".repeat(n)}{"☆".repeat(5 - n)} <span className="ml-5 inline-block h-3 w-36 rounded-full bg-[#eee] align-middle"><span className={n === 5 ? "block h-3 rounded-full bg-black" : ""} /></span></p>)}</div>
        <div className="grid content-center gap-3"><button className="h-41px h-[41px] rounded-full bg-black text-white">Write a review</button><button className="h-[41px] rounded-full border border-black">Ask a question</button></div>
      </div>
    </section>
  );
}

function Faqs() {
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});
  const faqs = [
    ["Is the color shown on the website accurate?", "Actual colors may vary slightly due to device screens."],
    ["Can I cancel my order?", "Orders cannot be cancelled once verified and dispatched."],
    ["How will I know that you have received my order?", "After placing your order, your order number will appear on screen and you will receive an email."],
    ["What is the delivery time?", "Karachi: 1-2 working days. Main cities: 3-5 working days. Other areas: 5-7 working days."],
    ["How should I choose my size?", "Please use the size chart available on the product page."],
  ];
  function toggleFaq(question: string) {
    setOpenFaqs((current) => ({ ...current, [question]: !current[question] }));
  }
  return (
    <section className="mx-auto max-w-[720px] px-5 pb-24 pt-12">
      <h2 className="text-center text-[28px] font-normal">FAQs</h2>
      <div className="mt-20 grid gap-7">
        {faqs.map(([question, answer]) => {
          const isOpen = openFaqs[question] ?? false;
          return (
            <div key={question} className="border-b border-[#e0e0e0] pb-7">
              <button
                type="button"
                onClick={() => toggleFaq(question)}
                className="flex w-full cursor-pointer justify-between text-left text-[16px] text-[#4d4f52]"
                aria-expanded={isOpen}
              >
                <span>{question}</span>
                <span>{isOpen ? "-" : "+"}</span>
              </button>
              {isOpen ? <p className="mt-7 text-[13px] leading-6 text-[#75808a]">{answer}</p> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Stars() { return <span className="text-[18px] leading-none text-[#ffc400]">★★★★★</span>; }
function SearchIcon() { return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="8.5" stroke="currentColor" strokeWidth="1.7" /><path d="m17 17 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>; }
function BagIcon() { return <svg width="21" height="24" viewBox="0 0 21 24" fill="none" aria-hidden="true"><path d="M4.2 7.8h12.6l1.1 14.2H3.1L4.2 7.8Z" stroke="currentColor" strokeWidth="1.7" /><path d="M7.2 7.8V5.4a3.3 3.3 0 0 1 6.6 0v2.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>; }
function ChevronIcon({ className = "" }: { className?: string }) { return <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function ShirtIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M6.2 2.5 9 4.1l2.8-1.6 3.3 2.1-1.7 3-1.5-.8v8H6.1v-8l-1.5.8-1.7-3 3.3-2.1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>; }
function ReturnIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M6 5H3v-3M3 5a7 7 0 1 1 0 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function TruckIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M2 5h9v7H2V5Zm9 2h3l2 2v3h-5V7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><circle cx="5" cy="13" r="1.4" stroke="currentColor" strokeWidth="1.3" /><circle cx="13" cy="13" r="1.4" stroke="currentColor" strokeWidth="1.3" /></svg>; }
function WhatsAppButton() { return <button type="button" aria-label="Open WhatsApp" className="fixed bottom-6 right-7 z-30 flex h-[55px] w-[55px] cursor-pointer items-center justify-center rounded-full bg-brand-secondary text-white shadow-[0_6px_16px_rgba(0,0,0,0.24)]"><svg width="31" height="31" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6.3 25.7 7.7 21A11 11 0 1 1 12 25.4l-5.7.3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M12.3 10.4c.3-.6.5-.6.9-.6h.7c.2 0 .5.1.7.5.2.5.8 2 .9 2.2.1.2.1.4 0 .6-.2.4-.4.6-.7.9-.2.2-.4.4-.2.8.2.4.9 1.5 1.9 2.4 1.3 1.2 2.4 1.6 2.8 1.8.3.1.6.1.8-.2l1.1-1.3c.3-.4.6-.3.9-.2l2.1 1c.4.2.6.3.7.5.1.2.1 1.6-.4 2.2-.5.7-1.9 1.4-3.2 1.2-1.3-.2-3.1-.8-5.2-2.1-2.6-1.6-4.3-3.9-4.9-5.1-.6-1.1-1.4-3.1-.6-4.6Z" fill="currentColor" /></svg></button>; }
