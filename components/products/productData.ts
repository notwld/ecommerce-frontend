import { searchProducts } from "@/components/search/searchData";

export type ProductRecommendation = {
  id: string;
  name: string;
  href: string;
  image: string;
  priceText: string;
  originalPriceText?: string;
  discount?: string;
  colors: string[];
};

export type ProductDetail = {
  slug: string;
  name: string;
  collection: string;
  collectionHref: string;
  sku: string;
  priceText: string;
  originalPriceText?: string;
  discount?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  colorImages: string[];
  sizes: string[];
  selectedSize: string;
  rewardText: string;
  description: string[];
  details: { label: string; value: string }[];
  sizeFit: { label: string; value: string }[];
  recommendations: ProductRecommendation[];
};

const colorImages = [
  "https://mendeez.com/cdn/shop/files/oxford-crew-neckt-shirtsmendeez-pk-0011672-778301_5bf1e893-9ef2-4ecb-968b-9c24b5af2fb2.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381193&width=900",
  "https://mendeez.com/cdn/shop/files/emerald-green-v-neckt-shirtsmendeez-pk-0011722-148415_33a8d602-5f08-41de-8dd3-ed6942ac8490.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381181&width=900",
  "https://mendeez.com/cdn/shop/files/ebony-henley-t-shirtt-shirtsmendeez-pk-0011802-839276_ec91c754-a4cf-4e30-9da7-b25c95115ddf.jpg?v=1756381173&width=900",
  "https://mendeez.com/cdn/shop/files/8_2_147a6bb5-1784-4f7a-a341-e057a09e6129.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174747&width=925",
  "https://mendeez.com/cdn/shop/files/13_3_08bb747d-797b-4b6c-814a-03e2e64b011b.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772178231&width=925",
];

const recommendationImages = [
  "https://mendeez.com/cdn/shop/files/primal-henley-t-shirtt-shirtsmendeez-pk-0011832-533461_ce0f5145-4743-4adb-b234-93d5552445a9.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381170&width=900",
  "https://mendeez.com/cdn/shop/files/emerald-green-v-neckt-shirtsmendeez-pk-0011722-148415_33a8d602-5f08-41de-8dd3-ed6942ac8490.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381181&width=900",
  "https://mendeez.com/cdn/shop/files/primal-henley-t-shirtt-shirtsmendeez-pk-0011832-528576_37623918-257f-4c9c-9294-995b48e6705f.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381170&width=900",
  "https://mendeez.com/cdn/shop/files/oxford-crew-neckt-shirtsmendeez-pk-0011672-778301_5bf1e893-9ef2-4ecb-968b-9c24b5af2fb2.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381193&width=900",
];

const extraProductSources = [
  {
    id: "textured-t-shirt-navy-blue",
    name: "Textured T-Shirt - Navy Blue",
    href: "/products/textured-t-shirt-navy-blue",
    type: "Activewear",
    price: 3490,
    priceText: "Rs.3,490.00",
    originalPriceText: "Rs.3,490.00",
    discount: undefined,
    image:
      "https://mendeez.com/cdn/shop/files/4_2_7630776c-1d85-4b3a-ae24-0286c23dc6bc.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1769087331&width=925",
    sizes: ["S", "M", "L", "XL", "XXL"],
    keywords: ["activewear", "t-shirt", "navy"],
  },
  {
    id: "printed-t-shirt-black-camouflage",
    name: "Printed T-Shirt - Black Camouflage",
    href: "/products/printed-t-shirt-black-camouflage",
    type: "Activewear",
    price: 3490,
    priceText: "Rs.3,490.00",
    originalPriceText: "Rs.3,490.00",
    discount: undefined,
    image:
      "https://mendeez.com/cdn/shop/files/1_jpg_d9a323ad-c284-4741-a452-dbbee8f785d0.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1770799858&width=925",
    sizes: ["S", "M", "L", "XL", "XXL"],
    keywords: ["activewear", "printed", "black"],
  },
  {
    id: "t-shirt-black",
    name: "T-Shirt - Black",
    href: "/products/t-shirt-black",
    type: "Activewear",
    price: 3490,
    priceText: "Rs.3,490.00",
    originalPriceText: "Rs.3,490.00",
    discount: undefined,
    image:
      "https://mendeez.com/cdn/shop/files/8_2_147a6bb5-1784-4f7a-a341-e057a09e6129.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174747&width=925",
    sizes: ["S", "M", "L", "XL", "XXL"],
    keywords: ["activewear", "t-shirt", "black"],
  },
  {
    id: "jogger-pants-navy-blue",
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
    keywords: ["activewear", "jogger", "pants"],
  },
];

const productSources = [...searchProducts, ...extraProductSources];

export const productSlugs = productSources.map((product) =>
  product.href.replace("/products/", ""),
);

export function getProduct(slug: string): ProductDetail | undefined {
  const source =
    productSources.find((product) => product.href.endsWith(`/${slug}`)) ??
    productSources.find((product) => product.id === "crew-green");

  if (!source) return undefined;

  const isCrewGreen = slug === "crew-neck-t-shirt-green";
  const name = isCrewGreen ? "Crew Neck T-Shirt - Green" : source.name;
  const mainImage = isCrewGreen ? colorImages[0] : source.image;
  const recommendations = [
    "Crew Neck T-Shirt - Maroon",
    "Regular Fit Crew Neck T-Shirt - Green",
    "Regular Fit Crew Neck T-Shirt - Maroon",
    "Crew Neck T-Shirt - White",
  ].map((name, index) => ({
    id: `recommendation-${index}`,
    name,
    href: `/products/${slug}`,
    image: recommendationImages[index],
    priceText: index === 0 || index === 3 ? "Rs.1,245.00" : "Rs.2,490.00",
    originalPriceText: index === 0 || index === 3 ? "Rs.2,490.00" : undefined,
    discount: index === 0 || index === 3 ? "-50%" : undefined,
    colors: ["#7f1329", "#007f5f", "#eee7e1", "#20242b", "#b9b2ad"],
  }));

  return {
    slug,
    name,
    collection: "Clearance Sale",
    collectionHref: "/collections/clearance-sale",
    sku: "0013610",
    priceText: source.priceText,
    originalPriceText: source.originalPriceText,
    discount: source.discount,
    rating: 5,
    reviewCount: 1,
    images: [mainImage, ...colorImages.slice(1)],
    colorImages,
    sizes: source.sizes.length ? source.sizes : ["S", "M", "L", "XL", "XXL"],
    selectedSize: source.sizes[0] ?? "S",
    rewardText:
      "Earn Rs. 37 - Rs. 62 in rewards. Register or sign in to our loyalty program at checkout.",
    description: [
      "Our Basic Crew Neck T-shirt is crafted with care and attention. This T-shirt features a lightweight, breathable, soft cotton jersey fabric that makes it perfect for summer.",
      "With its classic crewneck design and versatile style, our T-shirt is perfect for any occasion.",
    ],
    details: [
      { label: "Fabric", value: "Cotton Jersey" },
      { label: "Color", value: "Green" },
    ],
    sizeFit: [
      { label: "Model wears", value: "M" },
      { label: "Height", value: "5'11 Feet" },
      { label: "Weight", value: "74 Kg" },
      { label: "Chest", value: "39" },
      { label: "Waist", value: "30" },
    ],
    recommendations,
  };
}
