"use client";

import { useQuery } from "@tanstack/react-query";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

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
          <div
            key={product.id}
            style={{ border: "1px solid #ccc", padding: "1rem" }}
          >
            <img
              src={product.image}
              alt={product.title}
              width={150}
              height={150}
              style={{ objectFit: "contain" }}
            />
            <h3 style={{ fontSize: "1rem" }}>{product.title}</h3>
            <p>{product.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </div>
  );
}
