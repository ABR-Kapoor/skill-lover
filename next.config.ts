import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  // Server-side packages that should not be bundled
  serverExternalPackages: ['pdf2json', 'mammoth', 'bcrypt'],
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  // Vercel-specific optimizations
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;