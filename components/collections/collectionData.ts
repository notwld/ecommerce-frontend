import { searchCategories, searchProducts } from "@/components/search/searchData";

export type CollectionProduct = {
  id: string;
  name: string;
  href: string;
  price: number;
  priceText: string;
  originalPriceText?: string;
  discount?: string;
  image: string;
  sizes: string[];
  type: string;
  dateRank: number;
  bestSellerRank: number;
};

export type Collection = {
  slug: string;
  title: string;
  productCount: number;
  products: CollectionProduct[];
  heroDesktopImage?: string;
  heroMobileImage?: string;
};

const extraProducts: CollectionProduct[] = [
  {
    id: "active-tee-navy",
    name: "Textured T-Shirt - Navy Blue",
    href: "/products/textured-t-shirt-navy-blue",
    type: "Activewear",
    price: 3490,
    priceText: "Rs.3,490.00",
    image:
      "https://mendeez.com/cdn/shop/files/4_2_7630776c-1d85-4b3a-ae24-0286c23dc6bc.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1769087331&width=925",
    sizes: ["S", "M", "L", "XL", "XXL"],
    dateRank: 1,
    bestSellerRank: 2,
  },
  {
    id: "printed-active-black",
    name: "Printed T-Shirt - Black Camouflage",
    href: "/products/printed-t-shirt-black-camouflage",
    type: "Activewear",
    price: 3490,
    priceText: "Rs.3,490.00",
    image:
      "https://mendeez.com/cdn/shop/files/1_jpg_d9a323ad-c284-4741-a452-dbbee8f785d0.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1770799858&width=925",
    sizes: ["S", "M", "L", "XL", "XXL"],
    dateRank: 2,
    bestSellerRank: 1,
  },
  {
    id: "active-tee-black",
    name: "T-Shirt - Black",
    href: "/products/t-shirt-black",
    type: "Activewear",
    price: 3490,
    priceText: "Rs.3,490.00",
    image:
      "https://mendeez.com/cdn/shop/files/8_2_147a6bb5-1784-4f7a-a341-e057a09e6129.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174747&width=925",
    sizes: ["S", "M", "L", "XL", "XXL"],
    dateRank: 3,
    bestSellerRank: 3,
  },
  {
    id: "jogger-navy",
    name: "Jogger Pants - Navy Blue",
    href: "/products/jogger-pants-navy-blue",
    type: "Activewear",
    price: 2495,
    priceText: "Rs.2,495.00",
    originalPriceText: "Rs.4,990.00",
    discount: "-50%",
    image:
      "https://mendeez.com/cdn/shop/products/soot-black-all-day-pantsjogger-pantsmendeez-pk-0011329-434946.png?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381665&width=900",
    sizes: ["S", "M", "L", "XL", "XXL"],
    dateRank: 4,
    bestSellerRank: 4,
  },
];

const baseProducts: CollectionProduct[] = searchProducts.map((product, index) => ({
  id: product.id,
  name: product.name,
  href: product.href,
  price: product.price,
  priceText: product.priceText,
  originalPriceText: product.originalPriceText,
  discount: product.discount,
  image: product.image,
  sizes: product.sizes,
  type: product.type,
  dateRank: index + 10,
  bestSellerRank: index + 10,
}));

const allProducts = [...extraProducts, ...baseProducts];

const categoryTypeMap: Record<string, string[]> = {
  activewear: ["Activewear"],
  all: ["T-Shirts", "Shirts", "Polos", "Loungewear", "Jogger Pants", "Activewear", "Underwear", "Footwear"],
  accessories: ["Accessories"],
  "best-sellers": ["T-Shirts", "Activewear", "Loungewear"],
  "clearance-sale": ["T-Shirts", "Loungewear", "Underwear", "Footwear", "Activewear"],
  clothing: ["T-Shirts", "Shirts", "Polos", "Loungewear", "Jogger Pants", "Activewear"],
  "factory-outlet": ["T-Shirts", "Loungewear", "Footwear"],
  "jogger-pants": ["Jogger Pants", "Activewear"],
  "mens-footwear": ["Footwear"],
  "mens-loungewear": ["Loungewear"],
  "new-arrivals": ["Activewear", "T-Shirts", "Shirts", "Polos"],
  pants: ["Jogger Pants", "Activewear"],
  polos: ["Polos"],
  shirts: ["Shirts"],
  "t-shirts": ["T-Shirts", "Activewear"],
  underwear: ["Underwear"],
};

const titleOverrides: Record<string, string> = {
  "mens-footwear": "Footwear",
  "mens-loungewear": "Loungewear",
  "new-arrivals": "New In",
};

export const collectionSlugs = Object.keys(categoryTypeMap);

export function getCollection(slug: string): Collection | undefined {
  const title =
    titleOverrides[slug] ??
    searchCategories.find((category) => category.href.endsWith(`/${slug}`))?.title ??
    toTitle(slug);
  const productTypes = categoryTypeMap[slug];

  if (!productTypes) return undefined;

  const matchingProducts = allProducts.filter((product) => productTypes.includes(product.type));
  const products = matchingProducts.length ? matchingProducts : allProducts;

  return {
    slug,
    title,
    productCount: slug === "activewear" ? 19 : Math.max(products.length, 8),
    products: repeatProducts(products, slug === "activewear" ? 12 : 8),
  };
}

function repeatProducts(products: CollectionProduct[], minimumCount: number) {
  const repeated: CollectionProduct[] = [];

  while (repeated.length < minimumCount) {
    repeated.push(
      ...products.map((product, index) => ({
        ...product,
        id: `${product.id}-${Math.floor(repeated.length / Math.max(products.length, 1))}-${index}`,
      })),
    );
  }

  return repeated.slice(0, minimumCount);
}

function toTitle(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
