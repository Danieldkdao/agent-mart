import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Permissions-Policy",
          value: "tools=(self)",
        },
      ],
    },
  ],
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
