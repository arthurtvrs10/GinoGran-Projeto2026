import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  
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
      
    ],
  },
};

export default nextConfig;
