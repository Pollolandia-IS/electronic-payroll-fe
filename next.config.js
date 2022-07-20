/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  experimental: { images: { layoutRaw: true } },
  nextConfig,
  env: {
    URL: 'https://pollolandia.vercel.app'
  }
}
