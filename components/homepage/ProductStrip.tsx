import Image from "next/image";
import Link from "next/link";

export type HomepageProduct = {
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
};

type ProductStripProps = {
  products: HomepageProduct[];
  viewAllHref?: string;
  productHref?: string;
};

export function ProductStrip({
  products,
  viewAllHref = "/collections/all",
  productHref = "/collections/new-arrivals",
}: ProductStripProps) {
  return (
    <section className="bg-brand-background px-4 pb-16 pt-[46px] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-[31px] text-center">
          <Link
            href={viewAllHref}
            className="text-[20px] font-normal uppercase leading-none text-brand-text underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-8">
          {products.map((product) => (
            <article key={product.name} className="group text-center">
              <Link
                href={productHref}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4"
              >
                <div className="relative aspect-square overflow-hidden bg-[#f0f1f3]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover object-top transition-transform duration-200 group-hover:scale-[1.015]"
                  />
                  {product.discount ? (
                    <span className="absolute left-3 top-3 bg-[#b33323] px-3 py-1 text-[12px] font-bold leading-none text-white">
                      {product.discount}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-4 text-[13px] font-normal leading-5 text-[#676869]">
                  {product.name}
                </h2>
                <p className="mt-2 text-[14px] leading-none text-[#676869]">
                  <span>{product.price}</span>
                  {product.originalPrice ? (
                    <span className="ml-2 text-[#9b9b9b] line-through">
                      {product.originalPrice}
                    </span>
                  ) : null}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
