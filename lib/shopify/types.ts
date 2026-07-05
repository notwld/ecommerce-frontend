export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
};

export type ShopifySelectedOption = {
  name: string;
  value: string;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  sku?: string | null;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
  selectedOptions: ShopifySelectedOption[];
};

export type ShopifyProductOption = {
  name: string;
  values: string[];
};

export type ShopifyCollectionRef = {
  title: string;
  handle: string;
};

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  productType: string;
  vendor: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyMoney;
  } | null;
  featuredImage?: ShopifyImage | null;
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{ node: ShopifyProductVariant }>;
  };
  options: ShopifyProductOption[];
  collections?: {
    edges: Array<{ node: ShopifyCollectionRef }>;
  };
};

export type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  productsCount?: number;
  image?: ShopifyImage | null;
  products?: {
    edges: Array<{ node: ShopifyProduct }>;
  };
};

export type ShopifyPageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

export type ShopifyGraphQlError = {
  message: string;
  extensions?: {
    code?: string;
  };
};
