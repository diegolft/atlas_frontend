import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  async redirects() {
    return [
      { source: "/produto", destination: "/inicio#produto", permanent: false },
      { source: "/planos", destination: "/inicio#planos", permanent: false },
      { source: "/comparativo", destination: "/inicio#comparativo", permanent: false },
      { source: "/faq", destination: "/inicio#faq", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.digitaloceanspaces.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
