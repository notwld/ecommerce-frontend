"use client";

import { useMemo, useState } from "react";
import type { ProductDetail } from "@/components/products/productData";
import type { ProductAccordionSection } from "@/types/interactions";

export function useProductInteractions(product: ProductDetail) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeImageIndex, setActiveImage] = useState(0);
  const [selectedSizeState, setSelectedSize] = useState(product.selectedSize);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [openSections, setOpenSections] = useState<Record<ProductAccordionSection, boolean>>({
    description: false,
    returns: false,
    shipping: false,
  });
  const hasMultipleImages = product.images.length > 1;
  const canAddToCart = product.sizes.length > 0;
  const activeImage =
    product.images.length === 0
      ? 0
      : Math.min(activeImageIndex, product.images.length - 1);
  const selectedSize = product.sizes.includes(selectedSizeState)
    ? selectedSizeState
    : (product.sizes[0] ?? "");

  const unitPrice = useMemo(() => toAmount(product.priceText), [product.priceText]);
  const subtotalText = useMemo(
    () => formatCurrency(unitPrice * cartQuantity),
    [cartQuantity, unitPrice],
  );

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function toggleSection(section: ProductAccordionSection) {
    setOpenSections((current) => ({ ...current, [section]: !current[section] }));
  }

  function showPreviousImage() {
    if (!hasMultipleImages) return;
    setActiveImage((current) => {
      const index = Math.min(current, product.images.length - 1);
      return index === 0 ? product.images.length - 1 : index - 1;
    });
  }

  function showNextImage() {
    if (!hasMultipleImages) return;
    setActiveImage((current) => {
      const index = Math.min(current, product.images.length - 1);
      return (index + 1) % product.images.length;
    });
  }

  function increaseQuantity() {
    setCartQuantity((current) => current + 1);
  }

  function decreaseQuantity() {
    setCartQuantity((current) => (current > 1 ? current - 1 : 1));
  }

  return {
    activeImage,
    cartOpen,
    cartQuantity,
    canAddToCart,
    closeCart,
    decreaseQuantity,
    hasMultipleImages,
    increaseQuantity,
    menuOpen,
    openCart,
    openSections,
    selectedSize,
    setActiveImage,
    setMenuOpen,
    setSelectedSize,
    showNextImage,
    showPreviousImage,
    subtotalText,
    toggleSection,
  };
}

function toAmount(value: string) {
  const normalized = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isNaN(normalized) ? 0 : normalized;
}

function formatCurrency(amount: number) {
  return `Rs.${amount.toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
