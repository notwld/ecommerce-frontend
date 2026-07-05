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

// Raw Storefront cart shape (from CART_FIELDS)
export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: ShopifyMoney };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          image?: { url: string; altText: string | null } | null;
          price: ShopifyMoney;
          product: { title: string; handle: string };
        };
      };
    }>;
  };
};

// Normalized cart consumed by the UI
export type CartLine = {
  id: string;
  quantity: number;
  title: string;
  variantTitle: string;
  image: string | null;
  price: ShopifyMoney;
  href: string;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: ShopifyMoney;
  lines: CartLine[];
};

export type ShopifyGraphQlError = {
  message: string;
  extensions?: {
    code?: string;
  };
};
