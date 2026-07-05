import { CategorySection } from "./CategorySection";
import { HeroChrome } from "./HeroChrome";
import { ProductStrip } from "./ProductStrip";
import type { HomepageCategory } from "./homepageCategories";
import type { HomepageProduct } from "./ProductStrip";

const hero = {
  desktopImage:
    "https://mendeez.com/cdn/shop/files/Web-banner-_1_.jpg_2.jpg?v=1778830179&width=2400",
  mobileImage:
    "https://mendeez.com/cdn/shop/files/Mob-Banner-_1_.jpg_2.jpg?v=1778830179&width=850",
};

type HomePageProps = {
  featuredProducts: HomepageProduct[];
  categories: HomepageCategory[];
};

export function HomePage({ featuredProducts, categories }: HomePageProps) {
  return (
    <main className="min-h-screen bg-brand-background text-brand-text">
      <HeroChrome hero={hero} />
      <ProductStrip
        products={featuredProducts}
        viewAllHref="/collections/all"
        emptyMessage="No products are available right now. Please check back soon."
      />
      {categories.map((category) => (
        <CategorySection key={category.title} category={category} />
      ))}
    </main>
  );
}
