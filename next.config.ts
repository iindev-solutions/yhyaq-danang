import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'export',
  transpilePackages: ['motion'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
