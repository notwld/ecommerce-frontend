import type { Collection } from "@/components/collections/collectionData";
import { homepageCategories } from "@/components/homepage/homepageCategories";
import { searchCategories } from "@/components/search/searchData";

const titleOverrides: Record<string, string> = {
  all: "All Products",
  "mens-footwear": "Footwear",
  "mens-loungewear": "Loungewear",
  "new-arrivals": "New In",
};

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getCollectionShell(slug: string): Collection {
  const href = `/collections/${slug}`;
  const homepageCategory = homepageCategories.find((category) => category.href === href);
  const searchCategory = searchCategories.find((category) => category.href === href);

  const title =
    titleOverrides[slug] ??
    (homepageCategory?.title
      ? toDisplayTitle(homepageCategory.title)
      : searchCategory?.title ?? toTitle(slug));

  return {
    slug,
    title,
    productCount: 0,
    products: [],
    heroDesktopImage:
      homepageCategory?.desktopImage ?? searchCategory?.image ?? undefined,
    heroMobileImage:
      homepageCategory?.mobileImage ?? searchCategory?.image ?? undefined,
  };
}

function toDisplayTitle(value: string) {
  if (value === value.toUpperCase()) {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return value;
}

export function mergeCollectionWithShell(
  shell: Collection,
  live: Collection | null,
): Collection {
  if (!live) return shell;

  return {
    ...shell,
    ...live,
    heroDesktopImage: live.heroDesktopImage ?? shell.heroDesktopImage,
    heroMobileImage: live.heroMobileImage ?? shell.heroMobileImage,
  };
}
