"use client";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ProductCard";
import styled from "styled-components";

export default function WishlistPage() {
  const wishlist = useProductStore((s) => s.wishlist);

  return (
    <Wrapper>
      <h1>❤️ 찜한 상품</h1>
      {wishlist.length === 0 ? (
        <p>찜한 상품이 없습니다.</p>
      ) : (
        <Grid>
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Grid>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ theme }) => theme.size.cardMin}, 1fr)
  );
  gap: 1.5rem;
`;
