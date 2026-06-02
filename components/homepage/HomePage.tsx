import { HeroChrome } from "./HeroChrome";
import { ProductStrip } from "./ProductStrip";

const hero = {
  desktopImage:
    "https://mendeez.com/cdn/shop/files/Web-banner-_1_.jpg_2.jpg?v=1778830179&width=2400",
  mobileImage:
    "https://mendeez.com/cdn/shop/files/Mob-Banner-_1_.jpg_2.jpg?v=1778830179&width=850",
};

const products = [
  {
    name: "Classic Band Ring - Gold",
    price: "Rs.1,196.00",
    originalPrice: "Rs.2,990.00",
    discount: "-60%",
    image:
      "https://mendeez.com/cdn/shop/files/13.jpg?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381113&width=900",
  },
  {
    name: "Jersey Pajamas - Heather Grey",
    price: "Rs.2,093.00",
    originalPrice: "Rs.2,990.00",
    discount: "-30%",
    image:
      "https://mendeez.com/cdn/shop/products/slate-jersey-pajamaspajamamendeez-pk-0011527-742157.png?crop=region&crop_height=1074&crop_left=0&crop_top=2&crop_width=720&v=1756381441&width=900",
  },
  {
    name: "Crew Neck T-Shirt - Green",
    price: "Rs.1,245.00",
    originalPrice: "Rs.2,490.00",
    discount: "-50%",
    image:
      "https://mendeez.com/cdn/shop/files/8_2_147a6bb5-1784-4f7a-a341-e057a09e6129.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1772174747&width=925",
  },
  {
    name: "Printed Boxer Shorts",
    price: "Rs.1,245.00",
    originalPrice: "Rs.2,490.00",
    discount: "-50%",
    image:
      "https://mendeez.com/cdn/shop/files/24_2_ac50958d-2296-4351-a0b6-f08495b6f94e.jpg?crop=region&crop_height=2149&crop_left=0&crop_top=5&crop_width=1440&v=1773049790&width=925",
  },
];

export function HomePage() {
  return (
    <main className="min-h-screen bg-brand-background text-brand-text">
      <HeroChrome hero={hero} products={products} />
      <ProductStrip products={products} />
    </main>
  );
}
