import { HomePage } from "@/components/homepage/HomePage";
import { fetchHomepageData } from "@/lib/shopify/api";

export const revalidate = 60;

export default async function Page() {
  const { featuredProducts, categories } = await fetchHomepageData();

  return <HomePage featuredProducts={featuredProducts} categories={categories} />;
}
