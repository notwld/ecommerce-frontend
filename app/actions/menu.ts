"use server";

import { fetchMenuCategories } from "@/lib/shopify/api";

export async function getMenuCategories(): Promise<{ label: string; href: string }[]> {
  try {
    return await fetchMenuCategories();
  } catch {
    // ponytail: Shopify unreachable/unconfigured → drawer falls back to its static list
    return [];
  }
}
