import type { HomepageProduct } from "./ProductStrip";

export type HomepageCategory = {
  title: string;
  href: string;
  desktopImage: string;
  mobileImage: string;
  products: HomepageProduct[];
};

export const homepageCategories: HomepageCategory[] = [
  {
    title: "LOUNGEWEAR",
    href: "/collections/mens-loungewear",
    desktopImage:
      "https://mendeez.com/cdn/shop/files/Homepage_Banner_-_Loungewear_Desktop_a16c85fb-a2b8-45e1-822c-7b03fd82f492.webp?v=1754571244&width=1920",
    mobileImage:
      "https://mendeez.com/cdn/shop/files/Homepage_Banner_-_Loungewear_phone_1d2eab4b-ac17-4469-8004-ec9dce4fba37.webp?v=1754571421&width=680",
    products: [
      {
        name: "Jersey Pajamas - Heather Grey",
        price: "Rs.2,093.00",
        originalPrice: "Rs.2,990.00",
        discount: "-30%",
        image:
          "https://mendeez.com/cdn/shop/products/slate-jersey-pajamaspajamamendeez-pk-0011527-742157.png?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381441&width=900",
      },
      {
        name: "Jersey Shorts - Heather Grey",
        price: "Rs.1,743.00",
        originalPrice: "Rs.2,490.00",
        discount: "-30%",
        image:
          "https://mendeez.com/cdn/shop/products/snugger-shorts-heather-greyshortsmendeez-pk-0000993-700688.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756382007&width=900",
      },
      {
        name: "Jersey Pajamas - Navy Blue",
        price: "Rs.2,093.00",
        originalPrice: "Rs.2,990.00",
        discount: "-30%",
        image:
          "https://mendeez.com/cdn/shop/products/navy-blue-pajama-1.png?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381439&width=900",
      },
      {
        name: "Striped Woven Pajamas - Sky Blue",
        price: "Rs.3,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/17_2_570d4dc9-1af2-4e8c-bde1-c7796e5f2bdb.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1770449791&width=925",
      },
    ],
  },
  {
    title: "POLOS",
    href: "/collections/polos",
    desktopImage:
      "https://mendeez.com/cdn/shop/files/POLO-BANNER_jpg.jpg?v=1770995573&width=1920",
    mobileImage:
      "https://mendeez.com/cdn/shop/files/IMG_4174.jpg?v=1771004764&width=680",
    products: [
      {
        name: "Cuban Collar Polo - Olive Green",
        price: "Rs.2,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/4_2_d6cdbfd6-9b8e-4d94-b723-dddb03d7ba1a.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174010&width=925",
      },
      {
        name: "Cuban Collar Polo - Greyish Blue",
        price: "Rs.2,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/2_2_a587c4ca-5032-4633-bbd9-3a6040b4c323.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174010&width=925",
      },
      {
        name: "Cuban Collar Polo - Brownish Grey",
        price: "Rs.2,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/5_2_c32d081f-db09-40fa-850b-2e6457c06c2b.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174010&width=925",
      },
      {
        name: "Knitted Polo Shirt - White",
        price: "Rs.3,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/7_3_3bc6ecb5-2a17-4b4d-a870-ec191511f709.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772177342&width=925",
      },
    ],
  },
  {
    title: "T-SHIRTS",
    href: "/collections/t-shirts",
    desktopImage:
      "https://mendeez.com/cdn/shop/files/T-shirt-Web-Banners-New_jpg.jpg?v=1771234090&width=1920",
    mobileImage:
      "https://mendeez.com/cdn/shop/files/T-shirt-MOB-Banners-New_jpg.jpg?v=1771234132&width=680",
    products: [
      {
        name: "Oversized Printed Tee - Blue",
        price: "Rs.2,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/8_2_147a6bb5-1784-4f7a-a341-e057a09e6129.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174747&width=925",
      },
      {
        name: "Oversized Mesh Tee - Cream",
        price: "Rs.2,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/10_4_8c793535-e963-40dd-b75e-2854f246fbd6.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174747&width=925",
      },
      {
        name: "Knitted Oversized T-Shirt - Olive Green",
        price: "Rs.2,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/1_3_077e8b43-b2df-4b90-bf20-d6ec4923f061.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1770979912&width=925",
      },
      {
        name: "Textured Oversized T-Shirt - Navy Blue",
        price: "Rs.2,793.00",
        originalPrice: "Rs.3,990.00",
        discount: "-30%",
        image:
          "https://mendeez.com/cdn/shop/files/5_2_74b32cd6-8ea7-4caf-bc38-38ae13b75407.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772178232&width=925",
      },
    ],
  },
  {
    title: "SHIRTS",
    href: "/collections/shirts",
    desktopImage:
      "https://mendeez.com/cdn/shop/files/Homepage_Banner_-_bestsellers_desktop2.webp?v=1754570153&width=1920",
    mobileImage:
      "https://mendeez.com/cdn/shop/files/IMG_4175.jpg?v=1771004704&width=680",
    products: [
      {
        name: "Plain Shirt - Tea Pink",
        price: "Rs.3,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/13_3_08bb747d-797b-4b6c-814a-03e2e64b011b.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772178231&width=925",
      },
      {
        name: "Textured Cuban Shirt - Sage Green",
        price: "Rs.3,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/6_2_440b904d-ec30-4102-9b3b-37633b33253f.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1770981465&width=925",
      },
      {
        name: "Burnout Cuban Shirt - Black",
        price: "Rs.3,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/19_3_88b4333e-213e-4b5d-84fc-9f08c9b0a710.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174745&width=925",
      },
      {
        name: "Cuban Shirt - White",
        price: "Rs.4,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/3_568c9a3c-ec29-461e-b290-f9bc06656679.png?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1771782961&width=925",
      },
    ],
  },
  {
    title: "BOTTOMS",
    href: "/collections/pants",
    desktopImage:
      "https://mendeez.com/cdn/shop/files/BOTTOMS-WEB-BANNERS_jpg.jpg?v=1771051109&width=1920",
    mobileImage:
      "https://mendeez.com/cdn/shop/files/IMG_4172_a4073743-cd54-4a7c-9585-f142dcf74f5f.jpg?v=1771006693&width=680",
    products: [
      {
        name: "Straight Fit Linen Pants - Grey",
        price: "Rs.5,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/6_1_2e4b75d8-1adb-42ca-a64f-02951d22d2e8.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1758867566&width=925",
      },
      {
        name: "Pintex Jogger Pants - Heather Grey",
        price: "Rs.4,490.00",
        image:
          "https://mendeez.com/cdn/shop/files/1_1_29eb6593-5a3a-4d96-a6fe-2ca587812f52.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1767246105&width=925",
      },
      {
        name: "Driver Pants - Charcoal Grey",
        price: "Rs.4,193.00",
        originalPrice: "Rs.5,990.00",
        discount: "-30%",
        image:
          "https://mendeez.com/cdn/shop/files/17_3_3ef39f5f-c627-45f1-9bdc-2ab14c797f41.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772177015&width=925",
      },
      {
        name: "Straight Jogger Pants - Cream",
        price: "Rs.5,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/1_jpg_d9a323ad-c284-4741-a452-dbbee8f785d0.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1770799858&width=925",
      },
    ],
  },
  {
    title: "UNDERWEAR",
    href: "/collections/underwear",
    desktopImage:
      "https://mendeez.com/cdn/shop/files/Homepage_Banner_-_underwear_desktop_e072c55c-601d-44f9-bb1a-5479791a28c9.webp?v=1754571691&width=1920",
    mobileImage:
      "https://mendeez.com/cdn/shop/files/Homepage_Banner_-_underwear_phone_portrait.webp?v=1754571668&width=680",
    products: [
      {
        name: "Printed Woven Boxer Shorts - White",
        price: "Rs.2,490.00",
        image:
          "https://mendeez.com/cdn/shop/files/24_2_ac50958d-2296-4351-a0b6-f08495b6f94e.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1773049790&width=925",
      },
      {
        name: "Printed All Day Boxers - Wine",
        price: "Rs.2,490.00",
        image:
          "https://mendeez.com/cdn/shop/files/10_2_a6d7d80a-0b3b-4d67-b4c2-ffa07736caa6.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1773661531&width=925",
      },
      {
        name: "Boxer Trunks - Black, White & Printed Blue Pack Of 3",
        price: "Rs.4,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/pack1.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1762962415&width=900",
      },
      {
        name: "Jersey Boxer Shorts - Multicolor Pack Of 5",
        price: "Rs.5,990.00",
        image:
          "https://mendeez.com/cdn/shop/products/jersey-boxer-shorts-pack-of-5boxersmendeez-pk-0000642-548055.png?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756382368&width=900",
      },
    ],
  },
  {
    title: "FRAGRANCES",
    href: "/collections/accessories",
    desktopImage:
      "https://mendeez.com/cdn/shop/files/Homepage_Banner_-_Fragrance_desktop_08b0b3e9-d243-40d8-bfeb-03bee52dfe51.webp?v=1754641694&width=1920",
    mobileImage:
      "https://mendeez.com/cdn/shop/files/Homepage_Banner_-_Fragrance_phone_portrait2.webp?v=1754641709&width=680",
    products: [
      {
        name: "Indica Pour Homme - 60ml",
        price: "Rs.3,490.00",
        image:
          "https://mendeez.com/cdn/shop/files/DSC03993FRAGRANCE720X1080.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381030&width=900",
      },
      {
        name: "Arctic Pour Homme - 60ml",
        price: "Rs.3,490.00",
        image:
          "https://mendeez.com/cdn/shop/files/ARCTIC.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1758273266&width=900",
      },
      {
        name: "Midnight Oud Pour Homme - 60ml",
        price: "Rs.3,990.00",
        image:
          "https://mendeez.com/cdn/shop/files/MIDNIGHT-OUD.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1758273266&width=900",
      },
      {
        name: "Aero Pour Homme - 60ml",
        price: "Rs.3,490.00",
        image:
          "https://mendeez.com/cdn/shop/files/AERO_Final.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1758273267&width=900",
      },
    ],
  },
  {
    title: "FOOTWEAR",
    href: "/collections/mens-footwear",
    desktopImage:
      "https://mendeez.com/cdn/shop/files/Homepage_Banner_-_footwear_desktop.webp?v=1754573010&width=1920",
    mobileImage:
      "https://mendeez.com/cdn/shop/files/Homepage_Banner_-_footwear_mobile.webp?v=1754573039&width=680",
    products: [
      {
        name: "Penny Suede Loafers - Navy Blue",
        price: "Rs.7,490.00",
        image:
          "https://mendeez.com/cdn/shop/files/5_1_ca66250f-c8fb-4f16-8c10-11745ca32d82.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1762520162&width=925",
      },
      {
        name: "Slip On Suede Loafers - Green",
        price: "Rs.7,490.00",
        image:
          "https://mendeez.com/cdn/shop/files/6_1_8098e208-15ae-4be8-87af-965aa121ce26.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1762520010&width=925",
      },
      {
        name: "Slip On Suede Loafers - Black",
        price: "Rs.7,490.00",
        image:
          "https://mendeez.com/cdn/shop/files/7_jpg.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381127&width=900",
      },
      {
        name: "Classic Loafer Shoes - Black",
        price: "Rs.4,995.00",
        originalPrice: "Rs.9,990.00",
        discount: "-50%",
        image:
          "https://mendeez.com/cdn/shop/files/9_jpg.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381126&width=900",
      },
    ],
  },
  {
    title: "ACCESSORIES",
    href: "/collections/accessories",
    desktopImage:
      "https://mendeez.com/cdn/shop/files/ACCESSORIES-WEB-BANNERS_jpg.jpg?v=1770995507&width=1920",
    mobileImage:
      "https://mendeez.com/cdn/shop/files/IMG_4173.jpg?v=1771005115&width=680",
    products: [
      {
        name: "Cap - Forest Green",
        price: "Rs.1,495.00",
        originalPrice: "Rs.2,990.00",
        discount: "-50%",
        image:
          "https://mendeez.com/cdn/shop/files/CP-0001-026.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1772702355&width=900",
      },
      {
        name: "Cap - Off White",
        price: "Rs.1,495.00",
        originalPrice: "Rs.2,990.00",
        discount: "-50%",
        image:
          "https://mendeez.com/cdn/shop/files/CP-0001-025.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1772702242&width=900",
      },
      {
        name: "Cap - Sand",
        price: "Rs.1,495.00",
        originalPrice: "Rs.2,990.00",
        discount: "-50%",
        image:
          "https://mendeez.com/cdn/shop/files/CP-0001-024.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1772701592&width=900",
      },
      {
        name: "Cap - Brown",
        price: "Rs.1,495.00",
        originalPrice: "Rs.2,990.00",
        discount: "-50%",
        image:
          "https://mendeez.com/cdn/shop/files/CP-0001-023.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1772701480&width=900",
      },
    ],
  },
];
