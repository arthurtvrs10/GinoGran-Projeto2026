import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co", // Permite imagens do Supabase
      },
      {
        protocol: "https",
        hostname: "placehold.co", // Permite imagens de placeholder
      },
    ],
  },
};

export default nextConfig;
