// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Bygg ändå även om ESLint hittar fel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Bygg ändå även om TS hittar fel
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
