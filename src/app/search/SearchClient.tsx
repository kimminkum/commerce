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
  const keyword = (useSearchParams().get("keyword") ?? "").toLowerCase();
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  const filtered = (data ?? []).filter((p: Product) =>
    p.title.toLowerCase().includes(keyword)
  );

  if (isLoading)
    return (
      <Message role="status" aria-live="polite">
        검색 중...
      </Message>
    );
  if (error) return <Message role="alert">검색 오류</Message>;

  return (
    <Wrapper role="main" aria-busy={isFetching}>
      <h1>🔍 검색 결과: “{keyword}”</h1>
      <ResultCount aria-live="polite">총 {filtered.length}건</ResultCount>
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
const ResultCount = styled.div`
  color: ${({ theme }) => theme.colors.subtext};
  margin: 0.4rem 0 1rem;
`;
const Message = styled.div`
  padding: 2rem;
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ theme }) => theme.size.cardMin}, 1fr)
  );
  gap: 1.5rem;
`;
