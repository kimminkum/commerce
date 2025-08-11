"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import styled from "styled-components";
import { useState } from "react";
import { Product } from "@/types/product";

// 상품 전체 Fetch
const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// URL 경로를 실제 fakestoreapi 카테고리명으로 변환
const mapUrlToCategory = (url: string) => {
  if (url === "men") return "men's clothing";
  if (url === "women") return "women's clothing";
  return url;
};

export default function CategoryProductsPage() {
  const { category } = useParams<{ category: string }>();
  const [sort, setSort] = useState("recent"); // 정렬 상태
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error || !data) return <p>상품을 불러오지 못했습니다.</p>;

  const realCategory = mapUrlToCategory(category);
  let filtered = data.filter((product) => product.category === realCategory);

  // 정렬 적용
  if (sort === "low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <Wrapper>
      <Header>
        <h1>{category} 카테고리</h1>
        <SortSelect value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="recent">최신순</option>
          <option value="low">가격 낮은순</option>
          <option value="high">가격 높은순</option>
        </SortSelect>
      </Header>
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

// styled-components
const Wrapper = styled.section`
  padding: 2rem;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  h1 {
    color: ${({ theme }) => theme.colors.text};
  }
`;
const SortSelect = styled.select`
  padding: 0.4rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.bg};
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;
