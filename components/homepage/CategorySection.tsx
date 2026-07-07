import { CategoryBanner } from "./CategoryBanner";
import { ProductStrip } from "./ProductStrip";
import type { HomepageCategory } from "./homepageCategories";

type CategorySectionProps = {
  category: HomepageCategory;
  bannerImage?: string;
};

export function CategorySection({ category, bannerImage }: CategorySectionProps) {
  return (
    <>
      <CategoryBanner
        title={category.title}
        href={category.href}
        desktopImage={bannerImage ?? category.desktopImage}
        mobileImage={bannerImage ?? category.mobileImage}
      />
      <ProductStrip
        products={category.products}
        viewAllHref={category.href}
        emptyMessage={`No ${category.title.toLowerCase()} products are available right now. Please check back soon.`}
      />
    </>
  );
}
