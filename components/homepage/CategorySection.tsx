import { CategoryBanner } from "./CategoryBanner";
import { ProductStrip } from "./ProductStrip";
import type { HomepageCategory } from "./homepageCategories";

type CategorySectionProps = {
  category: HomepageCategory;
};

export function CategorySection({ category }: CategorySectionProps) {
  return (
    <>
      <CategoryBanner
        title={category.title}
        href={category.href}
        desktopImage={category.desktopImage}
        mobileImage={category.mobileImage}
      />
      <ProductStrip
        products={category.products}
        viewAllHref={category.href}
        emptyMessage={`No ${category.title.toLowerCase()} products are available right now. Please check back soon.`}
      />
    </>
  );
}
