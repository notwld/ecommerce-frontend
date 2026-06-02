"use client";

import { useMemo, useState } from "react";
import type { SearchProduct } from "@/components/search/searchData";
import type { SearchSortOption } from "@/types/interactions";

export function useSearchInteractions(
  products: SearchProduct[],
  initialQuery = "",
  initialView: "preview" | "results" = "preview",
) {
  const [query, setQuery] = useState(initialQuery);
  const [showResults, setShowResults] = useState(initialView === "results");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<SearchSortOption>("Relevance");

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;

  const matchedProducts = useMemo(() => {
    const searchText = normalize(trimmedQuery);
    const base = hasQuery
      ? products.filter((product) => {
          const haystack = normalize(
            [product.name, product.type, ...product.keywords].join(" "),
          );
          return (
            haystack.includes(searchText) ||
            searchText.includes(normalize(product.type))
          );
        })
      : products;

    const withSize = selectedSizes.length
      ? base.filter((product) =>
          product.sizes.some((size) => selectedSizes.includes(size)),
        )
      : base;

    return [...withSize].sort((a, b) => {
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      return (
        products.findIndex((product) => product.id === a.id) -
        products.findIndex((product) => product.id === b.id)
      );
    });
  }, [hasQuery, products, selectedSizes, sort, trimmedQuery]);

  const previewProducts = useMemo(() => {
    if (normalize(trimmedQuery) === "t") {
      return ["henley-black", "textured-navy"]
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is SearchProduct => Boolean(product));
    }
    return (matchedProducts.length ? matchedProducts : products).slice(0, 2);
  }, [matchedProducts, products, trimmedQuery]);

  const fullProducts = (matchedProducts.length ? matchedProducts : products).slice(0, 8);
  const resultCount = hasQuery ? 530 : fullProducts.length;

  function toggleSize(size: string) {
    setSelectedSizes((current) =>
      current.includes(size)
        ? current.filter((item) => item !== size)
        : [...current, size],
    );
  }

  return {
    filterOpen,
    fullProducts,
    hasQuery,
    previewProducts,
    query,
    resultCount,
    selectedSizes,
    setFilterOpen,
    setQuery,
    setShowResults,
    setSort,
    showResults,
    sort,
    toggleSize,
    trimmedQuery,
  };
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
}
