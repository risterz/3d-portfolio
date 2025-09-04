/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  transpilePackages: ['three'],
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  generateEtags: false,
  poweredByHeader: false,
}

module.exports = nextConfig
