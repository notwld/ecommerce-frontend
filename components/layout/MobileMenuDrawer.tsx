"use client";

import Link from "next/link";
import { useState } from "react";

type MenuItem = {
  label: string;
  href: string;
  hasChildren?: boolean;
};

type ExpandableGroup = {
  label: string;
  links: MenuItem[];
};

const mainMenuItems: MenuItem[] = [
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "Clearance Sale", href: "/collections/clearance-sale" },
  { label: "Factory Outlet", href: "/collections/factory-outlet" },
  { label: "New In", href: "/collections/new-arrivals" },
  { label: "Clothing", href: "/collections/clothing", hasChildren: true },
  { label: "Accessories", href: "/collections/accessories", hasChildren: true },
  { label: "Footwear", href: "/collections/mens-footwear" },
  { label: "Activewear", href: "/collections/activewear" },
  { label: "Store Locations", href: "/pages/store-locations" },
  { label: "Loyalty Program", href: "/pages/rewards" },
];

const clothingBaseLinks: MenuItem[] = [
  { label: "View All", href: "/collections/clothing" },
  { label: "Loungewear", href: "/collections/mens-loungewear" },
  { label: "Shirts", href: "/collections/shirts" },
  { label: "Polos", href: "/collections/polos" },
  { label: "T-Shirts", href: "/collections/t-shirts" },
  { label: "Blazers", href: "/collections/blazers" },
  { label: "Joggers Pants", href: "/collections/jogger-pants" },
  { label: "Pants", href: "/collections/pants" },
  { label: "Shorts", href: "/collections/shorts" },
  { label: "Denims", href: "/collections/denims" },
];

const clothingExpandableGroups: ExpandableGroup[] = [
  {
    label: "Underwears",
    links: [
      { label: "View All", href: "/collections/underwear" },
      { label: "Boxer Shorts", href: "/collections/boxer-shorts" },
      { label: "Boxer Trunks", href: "/collections/boxer-trunks" },
      { label: "Boxer Briefs", href: "/collections/boxer-briefs" },
      { label: "Briefs", href: "/collections/briefs" },
      { label: "Vests", href: "/collections/vests" },
    ],
  },
  {
    label: "Winter Wear",
    links: [
      { label: "View All", href: "/collections/winter-wear" },
      { label: "Hoodies", href: "/collections/hoodies" },
      { label: "Sweatshirts", href: "/collections/sweatshirts" },
      { label: "Jackets", href: "/collections/jackets" },
      { label: "Beanies", href: "/collections/beanies" },
      { label: "Sweaters", href: "/collections/sweaters" },
    ],
  },
];

const accessoriesLinks: MenuItem[] = [
  { label: "View All", href: "/collections/accessories" },
  { label: "Gift Boxes", href: "/collections/gift-boxes" },
  { label: "Caps", href: "/collections/caps" },
  { label: "Fragrances", href: "/collections/fragrances" },
  { label: "Jewellery", href: "/collections/jewellery" },
  { label: "Keychains", href: "/collections/keychains" },
  { label: "Socks", href: "/collections/socks" },
  { label: "Sunglasses", href: "/collections/sunglasses" },
  { label: "Bags", href: "/collections/bags" },
  { label: "Belts", href: "/collections/belts" },
];

type MenuView = "main" | "clothing" | "accessories";

export function MobileMenuDrawer({
  activeHref = "/collections/clearance-sale",
  onClose,
}: {
  activeHref?: string;
  onClose: () => void;
}) {
  const [view, setView] = useState<MenuView>("main");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Underwears: false,
    "Winter Wear": false,
  });

  function toggleGroup(label: string) {
    setOpenGroups((current) => ({ ...current, [label]: !current[label] }));
  }

  return (
    <div className="fixed inset-0 z-40 flex">
      <aside className="h-full w-[329px] max-w-[86vw] overflow-y-auto bg-[#f1f1f1] text-[#6a6a6a] shadow-[8px_0_24px_rgba(0,0,0,0.08)]">
        {view === "main" ? (
          <>
            <div className="flex h-[51px] items-center justify-end border-b border-[#d8d8d8] px-6">
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="text-[#666] focus:outline-none"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="pt-[6px]">
              {mainMenuItems.map((item) =>
                item.hasChildren ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      setView(item.label === "Clothing" ? "clothing" : "accessories")
                    }
                    className="flex h-[46px] w-full items-center justify-between px-[11px] text-left text-[16px] font-bold uppercase leading-none text-[#666666] focus:outline-none"
                  >
                    <span>{item.label}</span>
                    <ChevronRightIcon />
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={[
                      "flex h-[46px] items-center px-[11px] text-[16px] font-bold uppercase leading-none",
                      item.href === activeHref
                        ? "bg-brand-accent text-white"
                        : "text-[#666666]",
                    ].join(" ")}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </>
        ) : (
          <>
            <div className="grid h-[51px] grid-cols-[56px_1fr_56px] items-center border-b border-[#d8d8d8]">
              <button
                type="button"
                aria-label="Back to menu"
                onClick={() => setView("main")}
                className="grid h-full place-items-center text-[#666] focus:outline-none"
              >
                <BackIcon />
              </button>
              <p className="text-center text-[16px] uppercase tracking-[0.01em] text-[#666]">
                {view}
              </p>
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="grid h-full place-items-center text-[#666] focus:outline-none"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="px-[11px] pb-8 pt-[10px]">
              {view === "clothing" ? (
                <>
                  {clothingBaseLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="flex h-[41px] items-center text-[16px] font-bold uppercase leading-none text-[#666]"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {clothingExpandableGroups.map((group) => {
                    const isOpen = openGroups[group.label] ?? false;
                    return (
                      <div key={group.label}>
                        <button
                          type="button"
                          onClick={() => toggleGroup(group.label)}
                          className="flex h-[41px] w-full items-center justify-between text-left text-[16px] font-bold uppercase leading-none text-[#666] focus:outline-none"
                        >
                          <span>{group.label}</span>
                          <ChevronDownIcon className={isOpen ? "rotate-180" : ""} />
                        </button>
                        {isOpen ? (
                          <div className="pb-1">
                            {group.links.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                className="flex h-[40px] items-center text-[14px] font-normal uppercase leading-none text-[#6e6e6e]"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </>
              ) : (
                accessoriesLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="flex h-[41px] items-center text-[16px] font-bold uppercase leading-none text-[#666]"
                  >
                    {item.label}
                  </Link>
                ))
              )}
            </nav>
          </>
        )}
      </aside>
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="flex-1 bg-black/30"
      />
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 4l12 12M16 4 4 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m6 3.5 4.5 4.5L6 12.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m3.5 6 4.5 4.5L12.5 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
