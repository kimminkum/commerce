/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ["fakestoreapi.com", "images.unsplash.com"]
  }
};

module.exports = nextConfig;
