// src/app/order/page.tsx
"use client";
import { useOrderStore } from "@/store/orderStore";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "@/components/ProductCard";
import styled from "styled-components";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const cart = useCartStore((s) => s.cart);
  const addOrder = useOrderStore((s) => s.addOrder);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();

  const handleConfirmOrder = () => {
    if (cart.length === 0) return;
    addOrder({
      id: Date.now().toString(),
      items: [...cart],
      date: new Date().toLocaleString()
    });
    clearCart();
    router.replace("/order/complete");
  };

  if (cart.length === 0)
    return (
      <Wrapper>
        <h2>주문할 상품이 없습니다.</h2>
      </Wrapper>
    );

  return (
    <Wrapper>
      <h1>주문서</h1>
      <Grid>
        {cart.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Grid>
      <OrderButton onClick={handleConfirmOrder}>주문 확정</OrderButton>
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
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ theme }) => theme.size.cardMin}, 1fr)
  );
  gap: 1.5rem;
`;
const OrderButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;
