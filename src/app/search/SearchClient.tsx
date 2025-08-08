// src/app/search/SearchClient.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import styled from "styled-components";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export default function SearchClient() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword")?.toLowerCase() ?? "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  const filtered = (data ?? []).filter((product: Product) =>
    product.title.toLowerCase().includes(keyword)
  );

  if (isLoading) return <Message>검색 중...</Message>;
  if (error) return <Message>검색 오류</Message>;

  return (
    <Wrapper>
      <h1>🔍 검색 결과: &quot;{keyword}&quot;</h1>
      {filtered.length === 0 ? (
        <Message>일치하는 상품이 없습니다.</Message>
      ) : (
        <Grid>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </Wrapper>
  );
}

// 스타일 (동일)
const Wrapper = styled.section`
  padding: 2rem;
`;
const Message = styled.div`
  padding: 2rem;
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;
