import type { Collection, CollectionProduct } from "@/components/collections/collectionData";
import type { HomepageProduct } from "@/components/homepage/ProductStrip";
import type { HomepageCategory } from "@/components/homepage/homepageCategories";
import type { ProductDetail } from "@/components/products/productData";
import type { SearchProduct } from "@/components/search/searchData";
import { shopifyFetch } from "./client";
import {
  mapShopifyProductToCollectionProduct,
  mapShopifyProductToProductDetail,
  mapShopifyProductToSearchProduct,
} from "./mappers";
import {
  COLLECTION_BY_HANDLE_QUERY,
  COLLECTION_HANDLES_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCT_HANDLES_QUERY,
  PRODUCTS_QUERY,
  SEARCH_PRODUCTS_QUERY,
} from "./queries";
import type { ShopifyCollection, ShopifyPageInfo, ShopifyProduct } from "./types";

const MAX_PRODUCTS = 250;
const MAX_COLLECTIONS = 50;

type ProductByHandleResponse = {
  product: ShopifyProduct | null;
};

type CollectionByHandleResponse = {
  collection: ShopifyCollection | null;
};

type ProductsResponse = {
  products: {
    pageInfo: ShopifyPageInfo;
    edges: Array<{ node: ShopifyProduct }>;
  };
};

type SearchProductsResponse = {
  search: {
    totalCount: number;
    edges: Array<{ node: ShopifyProduct | null }>;
  };
};

type ProductHandlesResponse = {
  products: {
    pageInfo: ShopifyPageInfo;
    edges: Array<{ node: { handle: string } }>;
  };
};

type CollectionHandlesResponse = {
  collections: {
    pageInfo: ShopifyPageInfo;
    edges: Array<{ node: { handle: string } }>;
  };
};

async function fetchAllProductNodes() {
  const items: ShopifyProduct[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage && items.length < MAX_PRODUCTS) {
    const page: ProductsResponse = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, {
      first: Math.min(50, MAX_PRODUCTS - items.length),
      after,
      sortKey: "CREATED_AT",
      reverse: true,
    });

    items.push(...page.products.edges.map((edge) => edge.node));
    hasNextPage = page.products.pageInfo.hasNextPage;
    after = page.products.pageInfo.endCursor;
  }

  return items;
}

export async function fetchProductHandles() {
  const handles: string[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage && handles.length < MAX_PRODUCTS) {
    const data: ProductHandlesResponse = await shopifyFetch<ProductHandlesResponse>(
      PRODUCT_HANDLES_QUERY,
      {
        first: 50,
        after,
      },
    );

    handles.push(...data.products.edges.map((edge) => edge.node.handle));
    hasNextPage = data.products.pageInfo.hasNextPage;
    after = data.products.pageInfo.endCursor;
  }

  return handles;
}

export async function fetchCollectionHandles() {
  const handles: string[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage && handles.length < MAX_COLLECTIONS) {
    const data: CollectionHandlesResponse = await shopifyFetch<CollectionHandlesResponse>(
      COLLECTION_HANDLES_QUERY,
      {
        first: 50,
        after,
      },
    );

    handles.push(...data.collections.edges.map((edge) => edge.node.handle));
    hasNextPage = data.collections.pageInfo.hasNextPage;
    after = data.collections.pageInfo.endCursor;
  }

  return handles;
}

export async function fetchProductByHandle(handle: string): Promise<ProductDetail | null> {
  const data = await shopifyFetch<ProductByHandleResponse>(PRODUCT_BY_HANDLE_QUERY, {
    handle,
  });

  if (!data.product) return null;

  const allProducts = await fetchAllProductNodes();
  const recommendations = allProducts
    .filter((product) => product.handle !== handle)
    .slice(0, 4)
    .map((product) => {
      const mapped = mapShopifyProductToSearchProduct(product);
      return {
        id: mapped.id,
        name: mapped.name,
        href: mapped.href,
        image: mapped.image,
        priceText: mapped.priceText,
        originalPriceText: mapped.originalPriceText,
        discount: mapped.discount,
        colors: [],
      };
    });

  return mapShopifyProductToProductDetail(data.product, recommendations);
}

export async function fetchCollectionByHandle(handle: string): Promise<Collection | null> {
  if (handle === "all") {
    return fetchAllProductsCollection();
  }

  const collectionData = await shopifyFetch<CollectionByHandleResponse>(
    COLLECTION_BY_HANDLE_QUERY,
    {
      handle,
      first: MAX_PRODUCTS,
    },
  );

  const collection = collectionData.collection;
  if (!collection) return null;

  const products =
    collection.products?.edges.map((edge, index) =>
      mapShopifyProductToCollectionProduct(edge.node, index),
    ) ?? [];

  return {
    slug: collection.handle,
    title: collection.title,
    productCount: products.length,
    products,
    heroDesktopImage: collection.image?.url ?? undefined,
    heroMobileImage: collection.image?.url ?? undefined,
  };
}

function slugifyType(type: string): string {
  return type
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// This store has no real Shopify collections — categories come from product types
// (e.g. "T-Shirt"). Distinct types become the menu + homepage sections.
export async function fetchProductTypeCategories(): Promise<{ title: string; slug: string }[]> {
  const catalog = await fetchCatalogProducts();
  const seen = new Map<string, string>(); // slug -> title
  for (const product of catalog) {
    const title = product.type?.trim();
    if (!title || title === "Products") continue;
    const slug = slugifyType(title);
    if (!seen.has(slug)) seen.set(slug, title);
  }
  return Array.from(seen, ([slug, title]) => ({ title, slug }));
}

export async function fetchMenuCategories(): Promise<{ label: string; href: string }[]> {
  const categories = await fetchProductTypeCategories();
  return categories.map((category) => ({
    label: category.title,
    href: `/collections/${category.slug}`,
  }));
}

export async function fetchProductsByTypeSlug(slug: string): Promise<CollectionProduct[]> {
  const match = (await fetchProductTypeCategories()).find((c) => c.slug === slug);
  if (!match) return [];
  return fetchProductsByProductType(match.title);
}

export async function fetchCatalogProducts(): Promise<SearchProduct[]> {
  const products = await fetchAllProductNodes();
  return products.map((product) => mapShopifyProductToSearchProduct(product));
}

export async function searchCatalogProducts(query: string): Promise<{
  products: SearchProduct[];
  totalCount: number;
}> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    const products = await fetchCatalogProducts();
    return { products, totalCount: products.length };
  }

  const data = await shopifyFetch<SearchProductsResponse>(SEARCH_PRODUCTS_QUERY, {
    query: trimmedQuery,
    first: MAX_PRODUCTS,
  });

  const products = data.search.edges
    .map((edge) => edge.node)
    .filter((node): node is ShopifyProduct => Boolean(node))
    .map((product) => mapShopifyProductToSearchProduct(product));

  return {
    products,
    totalCount: data.search.totalCount,
  };
}

export async function fetchProductsByProductType(
  productType: string,
): Promise<CollectionProduct[]> {
  const data = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, {
    first: MAX_PRODUCTS,
    query: `product_type:${JSON.stringify(productType)}`,
    sortKey: "CREATED_AT",
    reverse: true,
  });

  return data.products.edges.map((edge, index) =>
    mapShopifyProductToCollectionProduct(edge.node, index),
  );
}

export async function fetchAllProductsCollection(): Promise<Collection> {
  let products: CollectionProduct[] = [];

  try {
    const nodes = await fetchAllProductNodes();
    products = nodes.map((node, index) =>
      mapShopifyProductToCollectionProduct(node, index),
    );
  } catch {
    products = [];
  }

  return {
    slug: "all",
    title: "All Products",
    productCount: products.length,
    products,
  };
}

function mapToHomepageProduct(product: SearchProduct): HomepageProduct {
  return {
    name: product.name,
    price: product.priceText,
    originalPrice:
      product.originalPriceText !== product.priceText
        ? product.originalPriceText
        : undefined,
    discount: product.discount,
    image: product.image,
    href: product.href,
  };
}

export async function fetchHomepageData(): Promise<{
  featuredProducts: HomepageProduct[];
  categories: HomepageCategory[];
}> {
  let catalog: SearchProduct[] = [];

  try {
    catalog = await fetchCatalogProducts();
  } catch {
    catalog = [];
  }

  const allProducts = catalog.map(mapToHomepageProduct);

  // Group the catalog by product type — each type becomes a homepage section.
  const grouped = new Map<string, { title: string; products: SearchProduct[] }>();
  for (const product of catalog) {
    const title = product.type?.trim();
    if (!title || title === "Products") continue;
    const slug = slugifyType(title);
    const entry = grouped.get(slug) ?? { title, products: [] };
    entry.products.push(product);
    grouped.set(slug, entry);
  }

  const categories: HomepageCategory[] = Array.from(grouped, ([slug, { title, products }]) => ({
    title: title.toUpperCase(),
    href: `/collections/${slug}`,
    desktopImage: "", // banner comes from the shared hero pics (see HomePage)
    mobileImage: "",
    products: products.slice(0, 4).map(mapToHomepageProduct),
  }));

  return { featuredProducts: allProducts, categories };
}
