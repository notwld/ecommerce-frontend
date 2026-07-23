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

export type ShopifyCartUserError = {
  field?: string[] | null;
  message: string;
  code?: string | null;
};

export type ShopifyCartWarning = {
  code?: string | null;
  message: string;
};

// Raw Storefront cart shape (from CART_FIELDS)
export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        cost: {
          totalAmount: ShopifyMoney;
          amountPerQuantity: ShopifyMoney;
        };
        merchandise: {
          id: string;
          title: string;
          availableForSale: boolean;
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
  /** Unit price */
  price: ShopifyMoney;
  /** Line total (qty × unit, from Shopify cart line cost) */
  lineTotal: ShopifyMoney;
  href: string;
  availableForSale: boolean;
  /** null when inventory quantity is not exposed by the Storefront token */
  quantityAvailable: number | null;
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
