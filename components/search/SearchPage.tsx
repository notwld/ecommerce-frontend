import { SearchExperience } from "./SearchExperience";
import { searchCatalogProducts } from "@/lib/shopify/api";

type SearchPageProps = {
  initialQuery?: string;
  initialView?: "preview" | "results";
};

export async function SearchPage({
  initialQuery = "",
  initialView = "preview",
}: SearchPageProps) {
  const { products, totalCount } = await searchCatalogProducts(initialQuery);

  return (
    <main className="min-h-screen bg-brand-background text-brand-text">
      <SearchExperience
        initialQuery={initialQuery}
        initialView={initialView}
        products={products}
        totalCount={totalCount}
      />
    </main>
  );
}
