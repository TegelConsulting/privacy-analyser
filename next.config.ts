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
  images: {
    // Inaktivera bildoptimering för att undvika "sharp"-fel
    unoptimized: true,
  },
};

export default nextConfig;
