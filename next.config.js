/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // Enable transpilation of three.js modules
  transpilePackages: ['three'],
  // Disable experimental features that might cause issues
  experimental: {
    // Remove optimizeCss to avoid critters dependency issues
  },
}

module.exports = nextConfig