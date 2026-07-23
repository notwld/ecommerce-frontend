export const PRODUCT_CARD_FIELDS = `
  id
  title
  handle
  productType
  tags
  createdAt
  updatedAt
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  compareAtPriceRange {
    minVariantPrice { amount currencyCode }
  }
  featuredImage { url altText width height }
  images(first: 5) {
    edges {
      node { url altText width height }
    }
  }
  variants(first: 100) {
    edges {
      node {
        id
        title
        availableForSale
        sku
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
      }
    }
  }
  options { name values }
  collections(first: 5) {
    edges {
      node { title handle }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_CARD_FIELDS}
      description
      vendor
    }
  }
`;

export const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image { url altText width height }
      products(first: $first) {
        edges {
          node {
            ${PRODUCT_CARD_FIELDS}
          }
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = `
  query Products($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ${PRODUCT_CARD_FIELDS}
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    search(query: $query, types: [PRODUCT], first: $first) {
      totalCount
      edges {
        node {
          ... on Product {
            ${PRODUCT_CARD_FIELDS}
          }
        }
      }
    }
  }
`;

export const PRODUCT_HANDLES_QUERY = `
  query ProductHandles($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          handle
        }
      }
    }
  }
`;

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        cost {
          totalAmount { amount currencyCode }
          amountPerQuantity { amount currencyCode }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            image { url altText }
            price { amount currencyCode }
            product { title handle }
          }
        }
      }
    }
  }
`;

const CART_USER_ERRORS = `userErrors { field message code }`;
const CART_WARNINGS = `warnings { code message }`;

export const CART_QUERY = `
  query Cart($cartId: ID!) {
    cart(id: $cartId) { ${CART_FIELDS} }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ${CART_FIELDS} }
      ${CART_USER_ERRORS}
      ${CART_WARNINGS}
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      ${CART_USER_ERRORS}
      ${CART_WARNINGS}
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      ${CART_USER_ERRORS}
      ${CART_WARNINGS}
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      ${CART_USER_ERRORS}
      ${CART_WARNINGS}
    }
  }
`;

export const COLLECTION_HANDLES_QUERY = `
  query CollectionHandles($first: Int!, $after: String) {
    collections(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          handle
        }
      }
    }
  }
`;
