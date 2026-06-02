import type { Metadata } from "next";
import { ProductPage } from "@/components/products/ProductPage";
import { getProduct, productSlugs } from "@/components/products/productData";

type ProductRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  return {
    title: product ? `${product.name} | Mendeez` : "Product | Mendeez",
    description: product
      ? `Shop ${product.name} at Mendeez.`
      : "Shop Mendeez products.",
  };
}

export default async function Page({ params }: ProductRouteProps) {
  const { slug } = await params;

  return <ProductPage slug={slug} />;
}
