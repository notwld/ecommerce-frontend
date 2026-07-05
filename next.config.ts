import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/collections/frontpage",
        destination: "/collections/all",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mendeez.com",
        pathname: "/cdn/shop/files/**",
      },
      {
        protocol: "https",
        hostname: "mendeez.com",
        pathname: "/cdn/shop/products/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "7f8qwz-ig.myshopify.com",
        pathname: "/cdn/**",
      },
    ],
  },
};

export default nextConfig;
