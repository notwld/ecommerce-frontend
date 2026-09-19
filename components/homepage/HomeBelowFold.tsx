import { CategorySection } from "./CategorySection";
import { ProductStrip } from "./ProductStrip";
import { heroSlides } from "./heroSlides";
import { fetchHomepageData } from "@/lib/shopify/api";

export async function HomeBelowFold() {
  const { featuredProducts, categories } = await fetchHomepageData();

  return (
    <>
      <ProductStrip
        products={featuredProducts}
        viewAllHref="/collections/all"
        emptyMessage="No products are available right now. Please check back soon."
      />
      {categories.map((category, i) => (
        <CategorySection
          key={category.title}
          category={category}
          bannerImage={heroSlides[i % heroSlides.length].image}
        />
      ))}
    </>
  );
}
