import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://kmkcommerce.vercel.app";
  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    { url: `${base}/products`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/cart`, priority: 0.6 },
    { url: `${base}/wishlist`, priority: 0.6 },
    { url: `${base}/protected`, priority: 0.5 },
    { url: `${base}/start-here`, priority: 0.9 }
    // 필요시 더 추가
  ];
}
