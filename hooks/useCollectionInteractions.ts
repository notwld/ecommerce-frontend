"use client";

import { useMemo, useState } from "react";
import type { Collection, CollectionProduct } from "@/components/collections/collectionData";
import type { CollectionSortOption } from "@/types/interactions";

export function useCollectionInteractions(collection: Collection) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState<CollectionSortOption>("Featured");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const sizes = useMemo(
    () =>
      Array.from(new Set(collection.products.flatMap((product) => product.sizes))).slice(
        0,
        8,
      ),
    [collection.products],
  );

  const products = useMemo(
    () => sortProducts(filterProducts(collection.products, selectedSizes), sort),
    [collection.products, selectedSizes, sort],
  );

  function toggleSize(size: string) {
    setSelectedSizes((current) =>
      current.includes(size)
        ? current.filter((item) => item !== size)
        : [...current, size],
    );
  }

  return {
    filterOpen,
    menuOpen,
    products,
    selectedSizes,
    setFilterOpen,
    setMenuOpen,
    setSort,
    setSortOpen,
    sizes,
    sort,
    sortOpen,
    toggleSize,
  };
}

function filterProducts(products: CollectionProduct[], selectedSizes: string[]) {
  if (!selectedSizes.length) return products;
  return products.filter((product) =>
    product.sizes.some((size) => selectedSizes.includes(size)),
  );
}

function sortProducts(
  products: CollectionProduct[],
  sort: CollectionSortOption,
) {
  return [...products].sort((a, b) => {
    if (sort === "Best selling") return a.bestSellerRank - b.bestSellerRank;
    if (sort === "Price, low to high") return a.price - b.price;
    if (sort === "Price, high to low") return b.price - a.price;
    if (sort === "Date, old to new") return a.dateRank - b.dateRank;
    if (sort === "Date, new to old") return b.dateRank - a.dateRank;
    return 0;
  });
}
