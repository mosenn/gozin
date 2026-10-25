import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   cacheComponents: true,
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
      },
      {
      protocol: "https",
      hostname: "i.ibb.co",
    },
    {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
