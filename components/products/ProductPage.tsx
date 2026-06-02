import { notFound } from "next/navigation";
import { ProductExperience } from "./ProductExperience";
import { getProduct } from "./productData";

export function ProductPage({ slug }: { slug: string }) {
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductExperience product={product} />;
}
