import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-**",
        search: "?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
