/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const path = require('path');

module.exports = {
  experimental: { images: { layoutRaw: true } },
  nextConfig,
};
