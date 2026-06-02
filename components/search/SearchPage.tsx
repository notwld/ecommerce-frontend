import { SearchExperience } from "./SearchExperience";
import { searchCategories, searchProducts } from "./searchData";

type SearchPageProps = {
  initialQuery?: string;
  initialView?: "preview" | "results";
};

export function SearchPage({
  initialQuery = "",
  initialView = "preview",
}: SearchPageProps) {
  return (
    <main className="min-h-screen bg-brand-background text-brand-text">
      <SearchExperience
        categories={searchCategories}
        initialQuery={initialQuery}
        initialView={initialView}
        products={searchProducts}
      />
    </main>
  );
}
