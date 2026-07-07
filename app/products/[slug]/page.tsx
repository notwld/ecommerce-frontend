import type { Metadata } from "next";
import { ProductPage } from "@/components/products/ProductPage";
import { fetchProductByHandle, fetchProductHandles } from "@/lib/shopify/api";

export const revalidate = 60;

type ProductRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const handles = await fetchProductHandles();
    return handles.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await fetchProductByHandle(slug);

    return {
      title: product ? `${product.name} | AT Wardrobe` : "Product | AT Wardrobe",
      description: product
        ? `Shop ${product.name} at AT Wardrobe.`
        : "Shop AT Wardrobe products.",
    };
  } catch {
    return {
      title: "Product | AT Wardrobe",
      description: "Shop AT Wardrobe products.",
    };
  }
}

export default async function Page({ params }: ProductRouteProps) {
  const { slug } = await params;

  return <ProductPage slug={slug} />;
}
