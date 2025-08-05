// src/app/products/[category]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import styled from "styled-components";
import { Product } from "@/types/product";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// URL -> 실제 API category로 변환 함수
const mapUrlToCategory = (url: string) => {
  if (url === "men") return "men's clothing";
  if (url === "women") return "women's clothing";
  // 필요시 추가
  return url;
};

export default function CategoryProductsPage() {
  const { category } = useParams<{ category: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error || !data) return <p>상품을 불러오지 못했습니다.</p>;

  // ✅ 변환 후 필터링!
  const realCategory = mapUrlToCategory(category);

  const filtered = data.filter((product) => product.category === realCategory);

  return (
    <Wrapper>
      <h1>{category} 카테고리</h1>
      <Grid>
        {filtered.length === 0 ? (
          <p>등록된 상품이 없습니다.</p>
        ) : (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 2rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;
