// src/app/cart/page.tsx
"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import CartItemRow from "@/components/cart/CartItemRow";

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const addOrder = useOrderStore((s) => s.addOrder);
  const router = useRouter();

  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const handleCheck = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleOrderSelected = () => {
    const selected = cart.filter((p) => checkedIds.includes(p.id));
    if (selected.length === 0) return alert("선택된 상품이 없습니다.");
    addOrder({
      id: Date.now().toString(),
      items: selected,
      date: new Date().toLocaleString()
    });
    selected.forEach((item) => removeFromCart(item.id));
    setCheckedIds([]);
    router.replace("/order/complete");
  };

  if (cart.length === 0) return <Empty>장바구니가 비었습니다.</Empty>;

  return (
    <Wrapper>
      <TopBar>
        <h1>🛒 장바구니</h1>
        <Right>
          <span>선택 {checkedIds.length}개</span>
          <OrderButton onClick={handleOrderSelected}>
            선택 상품 주문
          </OrderButton>
        </Right>
      </TopBar>

      <List>
        {cart.map((product) => (
          <CartItemRow
            key={product.id}
            product={product}
            checked={checkedIds.includes(product.id)}
            onCheck={handleCheck}
            onRemove={removeFromCart}
          />
        ))}
      </List>

      <BottomBar>
        <OrderButton onClick={handleOrderSelected}>선택 상품 주문</OrderButton>
      </BottomBar>
    </Wrapper>
  );
}

// --- styles ---
const Wrapper = styled.div`
  padding: 2rem 1.25rem 3.5rem;
  max-width: 980px;
  margin: 0 auto;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  h1 {
    font-size: 1.5rem;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #667;
  font-size: 0.95rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const BottomBar = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

const OrderButton = styled.button`
  padding: 0.9rem 1.6rem;
  font-size: 1rem;
  background: #1164f4;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #0033a5;
  }
`;

const Empty = styled.div`
  padding: 2.5rem;
  text-align: center;
`;
