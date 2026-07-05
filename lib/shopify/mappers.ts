import type { CollectionProduct } from "@/components/collections/collectionData";
import type { ProductDetail, ProductRecommendation } from "@/components/products/productData";
import type { SearchCategory, SearchProduct } from "@/components/search/searchData";
import type { ShopifyCollection, ShopifyProduct } from "./types";

const SIZE_OPTION_NAMES = new Set(["size", "sizes"]);

function getMinVariantPrice(product: ShopifyProduct) {
  return product.priceRange.minVariantPrice;
}

export function formatShopifyMoney(money: { amount: string; currencyCode: string }) {
  const value = Number.parseFloat(money.amount);

  if (money.currencyCode === "PKR") {
    return `Rs.${new Intl.NumberFormat("en-PK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)}`;
  }

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: money.currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getProductPrice(product: ShopifyProduct) {
  return Number.parseFloat(getMinVariantPrice(product).amount);
}

export function getCompareAtPrice(product: ShopifyProduct) {
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  if (!compareAt) return undefined;
  const compareValue = Number.parseFloat(compareAt.amount);
  const priceValue = getProductPrice(product);
  return compareValue > priceValue ? compareValue : undefined;
}

export function getDiscountLabel(product: ShopifyProduct) {
  const compareAt = getCompareAtPrice(product);
  const price = getProductPrice(product);
  if (!compareAt || compareAt <= price) return undefined;

  const percent = Math.round(((compareAt - price) / compareAt) * 100);
  return percent > 0 ? `-${percent}%` : undefined;
}

export function getProductImage(product: ShopifyProduct) {
  return (
    product.featuredImage?.url ??
    product.images.edges[0]?.node.url ??
    "/placeholder-product.png"
  );
}

export function getProductImages(product: ShopifyProduct) {
  const images = product.images.edges.map((edge) => edge.node.url);
  if (!images.length && product.featuredImage?.url) {
    return [product.featuredImage.url];
  }
  return images;
}

export function getProductSizes(product: ShopifyProduct) {
  const sizeOption = product.options.find((option) =>
    SIZE_OPTION_NAMES.has(option.name.toLowerCase()),
  );

  if (sizeOption?.values.length) {
    return sizeOption.values;
  }

  const variantSizes = product.variants.edges
    .map((edge) =>
      edge.node.selectedOptions.find((option) =>
        SIZE_OPTION_NAMES.has(option.name.toLowerCase()),
      )?.value,
    )
    .filter((value): value is string => Boolean(value));

  return Array.from(new Set(variantSizes));
}

export function getSizeVariants(product: ShopifyProduct) {
  return product.variants.edges.map(({ node }) => {
    const size =
      node.selectedOptions.find((option) =>
        SIZE_OPTION_NAMES.has(option.name.toLowerCase()),
      )?.value ?? node.title;
    return { size, variantId: node.id, availableForSale: node.availableForSale };
  });
}

export function getProductKeywords(product: ShopifyProduct) {
  const titleWords = product.title
    .toLowerCase()
    .split(/[\s,-]+/)
    .filter(Boolean);

  return Array.from(
    new Set([
      ...titleWords,
      product.productType.toLowerCase(),
      ...product.tags.map((tag) => tag.toLowerCase()),
    ]),
  );
}

export function getPrimaryCollection(product: ShopifyProduct) {
  return product.collections?.edges[0]?.node;
}

export function mapShopifyProductToCollectionProduct(
  product: ShopifyProduct,
  index = 0,
): CollectionProduct {
  const price = getProductPrice(product);
  const compareAt = getCompareAtPrice(product);

  return {
    id: product.id,
    name: product.title,
    href: `/products/${product.handle}`,
    price,
    priceText: formatShopifyMoney(getMinVariantPrice(product)),
    originalPriceText: compareAt
      ? formatShopifyMoney({
          amount: String(compareAt),
          currencyCode: getMinVariantPrice(product).currencyCode,
        })
      : undefined,
    discount: getDiscountLabel(product),
    image: getProductImage(product),
    sizes: getProductSizes(product),
    type: product.productType || "Products",
    dateRank: Date.parse(product.createdAt) || index,
    bestSellerRank: index + 1,
  };
}

export function mapShopifyProductToSearchProduct(product: ShopifyProduct): SearchProduct {
  const price = getProductPrice(product);
  const compareAt = getCompareAtPrice(product);

  return {
    id: product.id,
    name: product.title,
    href: `/products/${product.handle}`,
    type: product.productType || "Products",
    price,
    priceText: formatShopifyMoney(getMinVariantPrice(product)),
    originalPriceText: compareAt
      ? formatShopifyMoney({
          amount: String(compareAt),
          currencyCode: getMinVariantPrice(product).currencyCode,
        })
      : formatShopifyMoney(getMinVariantPrice(product)),
    discount: getDiscountLabel(product),
    image: getProductImage(product),
    sizes: getProductSizes(product),
    keywords: getProductKeywords(product),
  };
}

export function mapShopifyProductToProductDetail(
  product: ShopifyProduct,
  recommendations: ProductRecommendation[] = [],
): ProductDetail {
  const primaryCollection = getPrimaryCollection(product);
  const sizes = getProductSizes(product);
  const images = getProductImages(product);
  const descriptionParagraphs = (product.description ?? "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const firstVariantSku =
    product.variants.edges.find((edge) => edge.node.sku)?.node.sku ?? product.handle;

  return {
    slug: product.handle,
    name: product.title,
    collection: primaryCollection?.title ?? "Shop",
    collectionHref: primaryCollection
      ? `/collections/${primaryCollection.handle}`
      : "/collections/all",
    sku: firstVariantSku,
    priceText: formatShopifyMoney(getMinVariantPrice(product)),
    originalPriceText: getCompareAtPrice(product)
      ? formatShopifyMoney({
          amount: String(getCompareAtPrice(product)),
          currencyCode: getMinVariantPrice(product).currencyCode,
        })
      : undefined,
    discount: getDiscountLabel(product),
    rating: 5,
    reviewCount: 0,
    images: images.length ? images : [getProductImage(product)],
    colorImages: images.slice(0, 5),
    sizes: sizes.length ? sizes : ["One Size"],
    selectedSize: sizes[0] ?? "One Size",
    rewardText:
      "Earn rewards on eligible purchases. Register or sign in to our loyalty program at checkout.",
    description: descriptionParagraphs.length
      ? descriptionParagraphs
      : ["Product details are being updated. Please check back soon."],
    details: [
      { label: "Type", value: product.productType || "Apparel" },
      { label: "Brand", value: product.vendor || "Mendeez" },
    ],
    sizeFit: sizes.length
      ? [{ label: "Available sizes", value: sizes.join(", ") }]
      : [],
    sizeVariants: getSizeVariants(product),
    recommendations,
  };
}

export function mapShopifyCollectionToSearchCategory(
  collection: ShopifyCollection,
): SearchCategory {
  return {
    title: collection.title,
    href: `/collections/${collection.handle}`,
    image: collection.image?.url ?? "/placeholder-collection.png",
  };
}

export function mapShopifyCollectionsToTiles(collections: ShopifyCollection[]) {
  return collections.slice(0, 4).map((collection) => ({
    title: collection.title.toUpperCase(),
    href: `/collections/${collection.handle}`,
    image: collection.image?.url ?? "/placeholder-collection.png",
  }));
}
