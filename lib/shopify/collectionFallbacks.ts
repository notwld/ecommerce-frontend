import type { Collection, CollectionTile } from "@/components/collections/collectionData";
import { homepageCategories } from "@/components/homepage/homepageCategories";
import { searchCategories } from "@/components/search/searchData";

const titleOverrides: Record<string, string> = {
  all: "All Products",
  "mens-footwear": "Footwear",
  "mens-loungewear": "Loungewear",
  "new-arrivals": "New In",
};

export const defaultCollectionTiles: CollectionTile[] = [
  {
    title: "SUMMER '26 DRIP",
    href: "/collections/new-arrivals",
    image:
      "https://mendeez.com/cdn/shop/files/8_2_147a6bb5-1784-4f7a-a341-e057a09e6129.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174747&width=925",
  },
  {
    title: "SHIRTS",
    href: "/collections/shirts",
    image:
      "https://mendeez.com/cdn/shop/files/13_3_08bb747d-797b-4b6c-814a-03e2e64b011b.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772178231&width=925",
  },
  {
    title: "POLOS",
    href: "/collections/polos",
    image:
      "https://mendeez.com/cdn/shop/files/4_2_d6cdbfd6-9b8e-4d94-b723-dddb03d7ba1a.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174010&width=925",
  },
  {
    title: "ACCESSORIES",
    href: "/collections/accessories",
    image:
      "https://mendeez.com/cdn/shop/files/13.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381113&width=900",
  },
];

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
    tiles: defaultCollectionTiles,
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
    tiles:
      live.slug === "all"
        ? defaultCollectionTiles
        : live.tiles.length
          ? live.tiles
          : shell.tiles,
  };
}
