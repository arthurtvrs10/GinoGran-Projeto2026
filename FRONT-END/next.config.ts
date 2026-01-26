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
      {
        protocol: 'https',
        hostname: 'gxqcjmjfipmxvdmflabu.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      
    ],
  },
};

export default nextConfig;
