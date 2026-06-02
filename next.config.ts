import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
