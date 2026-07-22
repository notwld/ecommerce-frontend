export type SearchCategory = {
  title: string;
  href: string;
  image: string;
};

export type SearchProduct = {
  id: string;
  name: string;
  href: string;
  type: string;
  price: number;
  priceText: string;
  originalPriceText?: string;
  discount?: string;
  image: string;
  sizes: string[];
  keywords: string[];
};

export const searchCategories: SearchCategory[] = [
  {
    title: "Clearance Sale",
    href: "/collections/clearance-sale",
    image:
      "https://mendeez.com/cdn/shop/files/13.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381113&width=900",
  },
  {
    title: "New In",
    href: "/collections/new-arrivals",
    image:
      "https://mendeez.com/cdn/shop/files/25060-1.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1779202998&width=900",
  },
  {
    title: "Best Sellers",
    href: "/collections/best-sellers",
    image:
      "https://mendeez.com/cdn/shop/files/1_jpg_d9a323ad-c284-4741-a452-dbbee8f785d0.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1770799858&width=925",
  },
  {
    title: "Underwear",
    href: "/collections/underwear",
    image:
      "https://mendeez.com/cdn/shop/files/24_2_ac50958d-2296-4351-a0b6-f08495b6f94e.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1773049790&width=925",
  },
  {
    title: "Loungewear",
    href: "/collections/mens-loungewear",
    image:
      "https://mendeez.com/cdn/shop/products/slate-jersey-pajamaspajamamendeez-pk-0011527-742157.png?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381441&width=900",
  },
  {
    title: "T-Shirts",
    href: "/collections/t-shirts",
    image:
      "https://mendeez.com/cdn/shop/files/8_2_147a6bb5-1784-4f7a-a341-e057a09e6129.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174747&width=925",
  },
  {
    title: "Polos",
    href: "/collections/polos",
    image:
      "https://mendeez.com/cdn/shop/files/4_2_d6cdbfd6-9b8e-4d94-b723-dddb03d7ba1a.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174010&width=925",
  },
  {
    title: "Shirts",
    href: "/collections/shirts",
    image:
      "https://mendeez.com/cdn/shop/files/13_3_08bb747d-797b-4b6c-814a-03e2e64b011b.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772178231&width=925",
  },
  {
    title: "Jogger Pants",
    href: "/collections/jogger-pants",
    image:
      "https://mendeez.com/cdn/shop/products/soot-black-all-day-pantsjogger-pantsmendeez-pk-0011329-434946.png?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381665&width=900",
  },
  {
    title: "Pants",
    href: "/collections/pants",
    image:
      "https://mendeez.com/cdn/shop/files/20_3_07f98a3d-acad-49b2-a9f6-e7096924bda9.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772177015&width=925",
  },
  {
    title: "Footwear",
    href: "/collections/mens-footwear",
    image:
      "https://mendeez.com/cdn/shop/files/4_1_71811ad7-cb16-486a-a1e6-5fbd2d3bbd76.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1762519766&width=925",
  },
  {
    title: "Activewear",
    href: "/collections/activewear",
    image:
      "https://mendeez.com/cdn/shop/files/4_2_7630776c-1d85-4b3a-ae24-0286c23dc6bc.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1769087331&width=925",
  },
];

export const searchProducts: SearchProduct[] = [
  {
    id: "henley-black",
    name: "Henley T-Shirt - Black",
    href: "/products/henley-t-shirt-black",
    type: "T-Shirts",
    price: 1245,
    priceText: "Rs.1,245.00",
    originalPriceText: "Rs.2,490.00",
    discount: "-50%",
    image:
      "https://mendeez.com/cdn/shop/files/ebony-henley-t-shirtt-shirtsmendeez-pk-0011802-839276_ec91c754-a4cf-4e30-9da7-b25c95115ddf.jpg?v=1756381173&width=900",
    sizes: ["S", "M", "L", "XL", "XXL"],
    keywords: ["t", "tee", "tshirt", "t-shirt", "henley", "black", "shirt"],
  },
  {
    id: "crew-green",
    name: "Crew Neck T-Shirt - Green",
    href: "/products/crew-neck-t-shirt-green",
    type: "T-Shirts",
    price: 1245,
    priceText: "Rs.1,245.00",
    originalPriceText: "Rs.2,490.00",
    discount: "-50%",
    image:
      "https://mendeez.com/cdn/shop/files/oxford-crew-neckt-shirtsmendeez-pk-0011672-778301_5bf1e893-9ef2-4ecb-968b-9c24b5af2fb2.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381193&width=900",
    sizes: ["S", "M", "L", "XL", "XXL"],
    keywords: ["t", "tee", "tshirt", "t-shirt", "crew", "green"],
  },
  {
    id: "v-neck-navy",
    name: "V-Neck T-Shirt - Navy Blue",
    href: "/products/v-neck-t-shirt-navy-blue",
    type: "T-Shirts",
    price: 1245,
    priceText: "Rs.1,245.00",
    originalPriceText: "Rs.2,490.00",
    discount: "-50%",
    image:
      "https://mendeez.com/cdn/shop/files/13_3_08bb747d-797b-4b6c-814a-03e2e64b011b.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772178231&width=925",
    sizes: ["S", "M", "L", "XL", "XXL"],
    keywords: ["t", "tee", "tshirt", "t-shirt", "v neck", "navy", "blue"],
  },
  {
    id: "textured-navy",
    name: "Textured Oversized T-Shirt - Navy Blue",
    href: "/products/textured-oversized-t-shirt-navy-blue",
    type: "T-Shirts",
    price: 2793,
    priceText: "Rs.2,793.00",
    originalPriceText: "Rs.3,990.00",
    discount: "-30%",
    image:
      "https://mendeez.com/cdn/shop/files/4_2_7630776c-1d85-4b3a-ae24-0286c23dc6bc.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1769087331&width=925",
    sizes: ["S", "M", "L", "XL"],
    keywords: ["t", "tee", "tshirt", "t-shirt", "textured", "oversized", "navy", "blue"],
  },
  {
    id: "pajama-grey",
    name: "Jersey Pajamas - Heather Grey",
    href: "/products/jersey-pajama-heather-grey",
    type: "Loungewear",
    price: 2093,
    priceText: "Rs.2,093.00",
    originalPriceText: "Rs.2,990.00",
    discount: "-30%",
    image:
      "https://mendeez.com/cdn/shop/products/slate-jersey-pajamaspajamamendeez-pk-0011527-742157.png?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381441&width=900",
    sizes: ["S", "M", "L", "XL", "XXL"],
    keywords: ["pajama", "pajamas", "loungewear", "grey", "heather"],
  },
  {
    id: "boxer-white",
    name: "Printed Woven Boxer Shorts - White",
    href: "/products/printed-woven-boxer-shorts-white",
    type: "Underwear",
    price: 1245,
    priceText: "Rs.1,245.00",
    originalPriceText: "Rs.2,490.00",
    discount: "-50%",
    image:
      "https://mendeez.com/cdn/shop/files/24_2_ac50958d-2296-4351-a0b6-f08495b6f94e.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1773049790&width=925",
    sizes: ["S", "M", "L", "XL"],
    keywords: ["underwear", "boxer", "shorts", "white"],
  },
  {
    id: "jogger-black",
    name: "All Day Pants - Black",
    href: "/products/all-day-pants-black",
    type: "Jogger Pants",
    price: 3493,
    priceText: "Rs.3,493.00",
    originalPriceText: "Rs.4,990.00",
    discount: "-30%",
    image:
      "https://mendeez.com/cdn/shop/products/soot-black-all-day-pantsjogger-pantsmendeez-pk-0011329-434946.png?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381665&width=900",
    sizes: ["30", "32", "34", "36", "38"],
    keywords: ["pants", "jogger", "black", "bottoms"],
  },
  {
    id: "penny-loafer",
    name: "Penny Suede Loafers - Navy Blue",
    href: "/products/penny-suede-loafers-navy-blue",
    type: "Footwear",
    price: 4893,
    priceText: "Rs.4,893.00",
    originalPriceText: "Rs.6,990.00",
    discount: "-30%",
    image:
      "https://mendeez.com/cdn/shop/files/4_1_71811ad7-cb16-486a-a1e6-5fbd2d3bbd76.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1762519766&width=925",
    sizes: ["40", "41", "42", "43", "44"],
    keywords: ["footwear", "loafers", "shoes", "navy", "blue"],
  },
];
