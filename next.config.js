/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    customKey: 'my-value',
  },
  images: {
    domains: ['i.ytimg.com'],
  },
}

module.exports = nextConfig
