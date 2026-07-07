import type { Metadata } from "next";
import { SearchPage } from "@/components/search/SearchPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Search | AT Wardrobe",
  description: "Search AT Wardrobe products and collections.",
};

type SearchRouteProps = {
  searchParams?: Promise<{
    q?: string;
    view?: string;
  }>;
};

export default async function Page({ searchParams }: SearchRouteProps) {
  const params = await searchParams;

  return (
    <SearchPage
      initialQuery={params?.q ?? ""}
      initialView={params?.view === "results" ? "results" : "preview"}
    />
  );
}
