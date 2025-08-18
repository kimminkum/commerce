/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ["fakestoreapi.com", "images.unsplash.com"],
    formats: ["image/avif", "image/webp"]
  }
};

module.exports = nextConfig;
