"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import styled from "styled-components";
import { useState } from "react";
import { Product } from "@/types/product";

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
const mapUrlToCategory = (url: string) => {
  if (url === "men") return "men's clothing";
  if (url === "women") return "women's clothing";
  return url;
};

export default function CategoryProductsPage() {
  const { category } = useParams<{ category: string }>();
  const [sort, setSort] = useState("recent");
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error || !data) return <p>상품을 불러오지 못했습니다.</p>;

  const realCategory = mapUrlToCategory(category);
  let filtered = data.filter((p) => p.category === realCategory);

  if (sort === "low")
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "high")
    filtered = [...filtered].sort((a, b) => b.price - a.price);

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
          filtered.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  min-width: ${({ theme }) => theme.size.min};
  margin: 0 auto;
  padding: 2rem 0;
  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};
  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const SortSelect = styled.select`
  padding: 0.4rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  background: #fff;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ theme }) => theme.size.cardMin}, 1fr)
  );
  gap: 1.5rem;
`;
