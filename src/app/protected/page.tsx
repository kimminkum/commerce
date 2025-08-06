"use client";

import { useCartStore } from "@/store/cartStore";
import styled from "styled-components";
import ProductCard from "@/components/ProductCard";

export default function ProtectedPage() {
  // useCartStore로 통일!
  const cart = useCartStore((s) => s.cart);

  return (
    <Wrapper>
      <h1>마이페이지</h1>
      <Section>
        <h2>장바구니</h2>
        {cart.length === 0 ? (
          <EmptyText>장바구니에 담긴 상품이 없습니다.</EmptyText>
        ) : (
          <Grid>
            {cart.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        )}
      </Section>
      {/* ...다른 마이페이지 정보 (주문내역 등) */}
    </Wrapper>
  );
}

// --- 스타일 ---
const Wrapper = styled.div`
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const EmptyText = styled.p`
  color: #999;
  padding: 1rem 0;
`;
