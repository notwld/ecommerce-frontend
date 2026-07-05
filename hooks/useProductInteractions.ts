"use client";

import { useState } from "react";
import type { ProductDetail } from "@/components/products/productData";
import type { ProductAccordionSection } from "@/types/interactions";

export function useProductInteractions(product: ProductDetail) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImageIndex, setActiveImage] = useState(0);
  const [selectedSizeState, setSelectedSize] = useState(product.selectedSize);
  const [openSections, setOpenSections] = useState<Record<ProductAccordionSection, boolean>>({
    description: false,
    returns: false,
    shipping: false,
  });
  const hasMultipleImages = product.images.length > 1;
  const activeImage =
    product.images.length === 0
      ? 0
      : Math.min(activeImageIndex, product.images.length - 1);
  const selectedSize = product.sizes.includes(selectedSizeState)
    ? selectedSizeState
    : (product.sizes[0] ?? "");

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

  return {
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
  };
}
