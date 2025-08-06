// src/app/cart/page.tsx
"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import ProductCard from "@/components/ProductCard";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const addOrder = useOrderStore((s) => s.addOrder);
  const router = useRouter();

  // 체크된 상품 id 관리
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
    // 선택 상품만 장바구니에서 제거
    selected.forEach((item) => removeFromCart(item.id));
    setCheckedIds([]);
    router.replace("/order/complete");
  };

  if (cart.length === 0)
    return <div style={{ padding: 32 }}>장바구니가 비었습니다.</div>;

  return (
    <Wrapper>
      <h1>🛒 장바구니</h1>
      <Grid>
        {cart.map((product) => (
          <ProductCardWithCheck
            key={product.id}
            product={product}
            checked={checkedIds.includes(product.id)}
            onCheck={handleCheck}
          />
        ))}
      </Grid>
      <OrderButton onClick={handleOrderSelected}>선택 상품 주문</OrderButton>
    </Wrapper>
  );
}

interface ProductCardWithCheckProps {
  product: Product;
  checked: boolean;
  onCheck: (id: number) => void;
}

function ProductCardWithCheck({
  product,
  checked,
  onCheck
}: ProductCardWithCheckProps) {
  return (
    <ProductCardWrapper>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheck(product.id)}
        style={{ marginRight: 8 }}
      />
      <ProductCard product={product} />
    </ProductCardWrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
`;
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;
const OrderButton = styled.button`
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  background: #1164f4;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #0033a5;
  }
`;
const ProductCardWrapper = styled.div`
  display: flex;
  align-items: center;
`;
