"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import styled from "styled-components";

// API Fetch 함수
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

  if (isLoading) return <Message>🌀 상품을 불러오는 중...</Message>;
  if (error) return <Message>❌ 상품을 불러오는 데 실패했습니다.</Message>;

  return (
    <Wrapper>
      <Title>🛍 상품 목록</Title>
      <Grid>
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Wrapper>
  );
}

// 스타일
const Wrapper = styled.section`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const Message = styled.p`
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
`;
