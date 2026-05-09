import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "imgur.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "d2w53g1q050m78.cloudfront.net" },
      { protocol: "https", hostname: "a0.muscache.com" },
      { protocol: "https", hostname: "p16-sign-va.tiktokcdn.com" },
      { protocol: "https", hostname: "hotel-mysa.com" },
      { protocol: "https", hostname: "hotel-mysa-fuji.com" },
      { protocol: "https", hostname: "j1wellness.com" },
      { protocol: "https", hostname: "villa-sanctuary.com" },
      { protocol: "https", hostname: "villa-saison-fuji.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "img-ikyu.com" },
      { protocol: "https", hostname: "www.img-ikyu.com" },
    ],
  },
};

export default nextConfig;
