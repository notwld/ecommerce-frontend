import { HomePage } from "@/components/homepage/HomePage";
import { heroSlides } from "@/components/homepage/heroSlides";
import { fetchHomepageData } from "@/lib/shopify/api";

export const revalidate = 60;

export default async function Page() {
  const { featuredProducts, categories } = await fetchHomepageData();

  return (
    <>
      {heroSlides.map((slide, i) => (
        <link
          key={slide.image}
          rel="preload"
          as="image"
          href={encodeURI(slide.image)}
          fetchPriority={i === 0 ? "high" : "low"}
        />
      ))}
      <HomePage featuredProducts={featuredProducts} categories={categories} />
    </>
  );
}
