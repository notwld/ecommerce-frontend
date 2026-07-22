import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
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
