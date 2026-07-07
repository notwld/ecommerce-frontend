import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CollectionPage } from "@/components/collections/CollectionPage";
import { getCollectionShell } from "@/lib/shopify/collectionFallbacks";
import { fetchCollectionByHandle, fetchCollectionHandles } from "@/lib/shopify/api";

export const revalidate = 60;

type CollectionRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const handles = await fetchCollectionHandles();
    const slugs = new Set(handles.filter((handle) => handle !== "frontpage"));
    slugs.add("all");
    return Array.from(slugs).map((slug) => ({ slug }));
  } catch {
    return [{ slug: "all" }];
  }
}

export async function generateMetadata({
  params,
}: CollectionRouteProps): Promise<Metadata> {
  const { slug } = await params;

  const shell = getCollectionShell(slug);

  try {
    const collection = await fetchCollectionByHandle(slug);

    return {
      title: `${(collection ?? shell).title} | AT Wardrobe`,
      description: `Shop ${(collection ?? shell).title} at AT Wardrobe.`,
    };
  } catch {
    return {
      title: `${shell.title} | AT Wardrobe`,
      description: `Shop ${shell.title} at AT Wardrobe.`,
    };
  }
}

export default async function Page({ params }: CollectionRouteProps) {
  const { slug } = await params;

  if (slug === "frontpage") {
    redirect("/collections/all");
  }

  return <CollectionPage slug={slug} />;
}
