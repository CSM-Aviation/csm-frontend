import { config } from 'dotenv';

// Load environment variables
config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    },
    reactStrictMode: true,
    images: {
      domains: ['s3.us-west-1.amazonaws.com'],
      loader: 'custom',
      loaderFile: './image-loader.ts',
    },
    // Add any other Next.js config options here
};

export default nextConfig;