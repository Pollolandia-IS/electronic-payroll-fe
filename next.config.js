/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  experimental: { images: { layoutRaw: true } },
  nextConfig,
  env: {
    URL: process.env.URL,
  }
}
