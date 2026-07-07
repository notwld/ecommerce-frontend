"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMenuCategories } from "@/app/actions/menu";

type MenuItem = {
  label: string;
  href: string;
};

const allProductsItem: MenuItem = { label: "All Products", href: "/collections/all" };

// Cache the fetched categories across drawer open/close within a session.
let cachedCategories: MenuItem[] | null = null;

export function MobileMenuDrawer({
  activeHref = "/collections/clearance-sale",
  onClose,
}: {
  activeHref?: string;
  onClose: () => void;
}) {
  const [categories, setCategories] = useState<MenuItem[] | null>(cachedCategories);

  useEffect(() => {
    if (cachedCategories) return;
    getMenuCategories().then((items) => {
      if (items.length) {
        cachedCategories = items;
        setCategories(items);
      }
    });
  }, []);

  const items = [allProductsItem, ...(categories ?? [])];

  return (
    <div className="fixed inset-0 z-40 flex">
      <aside className="h-full w-[329px] max-w-[86vw] overflow-y-auto bg-[#f1f1f1] text-[#6a6a6a] shadow-[8px_0_24px_rgba(0,0,0,0.08)]">
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
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex h-[46px] items-center px-[11px] text-[16px] font-bold uppercase leading-none",
                item.href === activeHref ? "bg-brand-accent text-white" : "text-[#666666]",
              ].join(" ")}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
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
