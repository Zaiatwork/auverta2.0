import type { NextConfig } from 'next'

// PAGES=1 builds the static GitHub Pages preview (served under /auverta2.0).
const pages = process.env.PAGES === '1'

const nextConfig: NextConfig = {
  ...(pages && { output: 'export', basePath: '/auverta2.0', trailingSlash: true }),
  env: { NEXT_PUBLIC_BASE_PATH: pages ? '/auverta2.0' : '' }, // plain <img> does not get basePath
  images: {
    unoptimized: pages,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'studionamma.vercel.app' },
    ],
  },
}

export default nextConfig
