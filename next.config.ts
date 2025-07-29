/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com"] // ← 여기에 외부 이미지 도메인 추가
  }
};

module.exports = nextConfig;
