"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import styled from "styled-components";
import { Product } from "@/types/product";

// API fetch
const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export default function SubCategoryPage() {
  const { category, subcategory } = useParams<{
    category: string;
    subcategory: string;
  }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  if (isLoading) return <Wrapper>로딩 중...</Wrapper>;
  if (error || !data) return <Wrapper>상품을 불러오지 못했습니다.</Wrapper>;

  const filtered = data.filter(
    (product) =>
      product.category?.toLowerCase().includes(category as string) &&
      product.title?.toLowerCase().includes(subcategory as string)
  );

  return (
    <Wrapper>
      <h1>
        {category} - {subcategory} (더미 페이지)
      </h1>
      <Grid>
        {filtered.length === 0 ? (
          <div>
            <p>이 카테고리는 API에서 직접 불러올 수 없어 더미로 안내합니다.</p>
          </div>
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
