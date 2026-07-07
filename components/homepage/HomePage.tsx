import { CategorySection } from "./CategorySection";
import { HeroChrome } from "./HeroChrome";
import { ProductStrip } from "./ProductStrip";
import type { HomepageCategory } from "./homepageCategories";
import type { HomepageProduct } from "./ProductStrip";

type HomePageProps = {
  featuredProducts: HomepageProduct[];
  categories: HomepageCategory[];
};

export function HomePage({ featuredProducts, categories }: HomePageProps) {
  return (
    <main className="min-h-screen bg-brand-background text-brand-text">
      <HeroChrome />
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
