import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  trailingSlash: true,
  basePath: "/cmac",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.comsewoguemusicandarts.org",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
