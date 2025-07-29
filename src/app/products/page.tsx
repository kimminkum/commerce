// src/app/products/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export default function ProductsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>상품을 불러오는데 실패했습니다.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛍 상품 목록</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem"
        }}
      >
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
