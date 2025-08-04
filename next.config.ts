/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ["fakestoreapi.com"]
  }
};

module.exports = nextConfig;
