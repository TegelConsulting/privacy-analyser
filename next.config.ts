// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Bygg ändå även om ESLint hittar fel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Bygg ändå även om TS hittar fel
    ignoreBuildErrors: true,
  },
  // Exclude Playwright from webpack bundling for client-side
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle Playwright on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }

    // Exclude Playwright from client bundle
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        playwright: 'playwright',
        'playwright-core': 'playwright-core',
      });
    }

    return config;
  },
};

export default nextConfig;
