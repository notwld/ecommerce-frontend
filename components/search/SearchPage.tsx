import { SearchExperience } from "./SearchExperience";
import { fetchSearchCategories, searchCatalogProducts } from "@/lib/shopify/api";

type SearchPageProps = {
  initialQuery?: string;
  initialView?: "preview" | "results";
};

export async function SearchPage({
  initialQuery = "",
  initialView = "preview",
}: SearchPageProps) {
  const [{ products, totalCount }, categories] = await Promise.all([
    searchCatalogProducts(initialQuery),
    fetchSearchCategories(),
  ]);

  return (
    <main className="min-h-screen bg-brand-background text-brand-text">
      <SearchExperience
        categories={categories}
        initialQuery={initialQuery}
        initialView={initialView}
        products={products}
        totalCount={totalCount}
      />
    </main>
  );
}
