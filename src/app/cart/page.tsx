// src/app/cart/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import CartItemRow from "@/components/cart/CartItemRow";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import type { Product } from "@/types/product";

const FREE_SHIPPING_THRESHOLD = 50; // 데모: $50 이상 무료
const SHIPPING_FEE = 3.99; // 데모: 기본 배송비

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const getQty = useCartStore((s) => s.getQty);

  const addOrder = useOrderStore((s) => s.addOrder);
  const router = useRouter();

  // ✅ 수량 변화만 감지하는 '서명' 문자열(새 객체 반환 X → 무한루프 방지)
  const qtySignature = useCartStore((s) =>
    s.cart.map((p) => `${p.id}:${s.getQty(p.id) ?? 1}`).join("|")
  );

  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  // 카트 변경 시, 존재하지 않는 id는 선택 해제
  useEffect(() => {
    if (checkedIds.length === 0) return;
    const idSet = new Set(cart.map((p) => p.id));
    setCheckedIds((prev) => prev.filter((id) => idSet.has(id)));
  }, [cart, checkedIds.length]);

  const allIds = useMemo<number[]>(() => cart.map((p) => p.id), [cart]);
  const isAllChecked =
    checkedIds.length > 0 && checkedIds.length === cart.length;

  const handleCheck = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setCheckedIds((prev) => (prev.length === cart.length ? [] : [...allIds]));
  };

  const handleDeleteSelected = () => {
    if (checkedIds.length === 0) return alert("선택된 상품이 없습니다.");
    checkedIds.forEach((id) => removeFromCart(id));
    setCheckedIds([]);
  };

  const handleOrderSelected = () => {
    const selected: Product[] = cart.filter((p) => checkedIds.includes(p.id));
    if (selected.length === 0) return alert("선택된 상품이 없습니다.");

    addOrder({
      id: Date.now().toString(),
      items: selected,
      date: new Date().toLocaleString()
    });

    // 선택 항목만 제거
    selected.forEach((p) => removeFromCart(p.id));
    setCheckedIds([]);
    router.replace("/order/complete");
  };

  // ✅ 합계 계산: 수량 변경 시 qtySignature 덕분에 재계산됨
  const { subtotal, shipping, total } = useMemo(() => {
    const checked = new Set(checkedIds);
    let sum = 0;

    for (const p of cart) {
      if (!checked.has(p.id)) continue;
      sum += p.price * (getQty(p.id) ?? 1);
    }

    const ship =
      sum === 0 ? 0 : sum >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    return { subtotal: sum, shipping: ship, total: sum + ship };
    // 의도적으로 qtySignature를 deps에 포함 (수량 변화 트리거)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, checkedIds, getQty, qtySignature]);

  if (cart.length === 0) return <Empty>장바구니가 비었습니다.</Empty>;

  return (
    <Wrapper>
      <TopBar>
        <LeftControls>
          <label>
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={toggleAll}
              aria-label="전체 선택"
            />
            <span>전체 선택</span>
          </label>
          <Divider />
          <ActionText
            type="button"
            onClick={handleDeleteSelected}
            disabled={checkedIds.length === 0}
            aria-disabled={checkedIds.length === 0}
          >
            선택 삭제
          </ActionText>
          <ActionText
            type="button"
            onClick={() => {
              if (confirm("모든 상품을 삭제하시겠어요?")) {
                clearCart();
                setCheckedIds([]);
              }
            }}
          >
            전체 삭제
          </ActionText>
        </LeftControls>

        <Right>
          <span>선택 {checkedIds.length}개</span>
          <OrderButton
            onClick={handleOrderSelected}
            disabled={checkedIds.length === 0}
            aria-disabled={checkedIds.length === 0}
          >
            선택 상품 주문
          </OrderButton>
        </Right>
      </TopBar>

      <List role="list">
        {cart.map((product: Product) => (
          <CartItemRow
            key={product.id}
            product={product}
            checked={checkedIds.includes(product.id)}
            onCheck={handleCheck}
            onRemove={removeFromCart}
          />
        ))}
      </List>

      {/* 하단 고정 요약 바 (sticky) */}
      <SummaryBar role="region" aria-label="주문 요약">
        <SummaryLeft aria-live="polite">
          <Row>
            <span>상품 합계</span>
            <strong>{subtotal.toLocaleString()}</strong>
          </Row>
          <Row>
            <span>배송비</span>
            <strong>{shipping.toLocaleString()}</strong>
          </Row>
          <Row className="total">
            <span>총 결제금액</span>
            <strong>{total.toLocaleString()}</strong>
          </Row>
        </SummaryLeft>

        <SummaryRight>
          <OrderButton
            onClick={handleOrderSelected}
            disabled={checkedIds.length === 0}
            aria-disabled={checkedIds.length === 0}
          >
            선택 {checkedIds.length}개 주문
          </OrderButton>
        </SummaryRight>
      </SummaryBar>
    </Wrapper>
  );
}

/* --- styles --- */
const Wrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  min-width: ${({ theme }) => theme.size.min};
  margin: 0 auto;
  /* 아래 sticky summary 높이 고려 */
  padding: 2rem 0 6.5rem 0;
  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};
  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }
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

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.subtext};

  label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }
`;

const Divider = styled.span`
  display: inline-block;
  width: 1px;
  height: 16px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0 6px;
`;

const ActionText = styled.button`
  background: none;
  border: 0;
  color: ${({ theme }) => theme.colors.text};
  padding: 0;
  font-size: 0.95rem;
  opacity: 0.85;
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.subtext};
  font-size: 0.95rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const OrderButton = styled.button<{ disabled?: boolean }>`
  padding: 0.9rem 1.6rem;
  font-size: 1rem;
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray200 : theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.15s ease;
  &:hover {
    background: ${({ theme, disabled }) =>
      disabled ? theme.colors.gray200 : theme.colors.primaryHover};
  }
`;

const SummaryBar = styled.aside`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.9rem 0;
  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};
  box-shadow: 0 -6px 18px rgba(20, 24, 40, 0.05);

  @supports (backdrop-filter: blur(4px)) {
    background: color-mix(
      in oklab,
      ${({ theme }) => theme.colors.bg} 90%,
      #fff
    );
    backdrop-filter: blur(4px);
  }

  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
    flex-direction: row;
  }
`;

const SummaryLeft = styled.div`
  display: grid;
  gap: 6px;
  .total strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.12rem;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0px;

  span {
    color: ${({ theme }) => theme.colors.subtext};
    width: 90px;
  }
  strong {
    min-width: 100px;
    text-align: right;
  }
`;

const SummaryRight = styled.div``;

const Empty = styled.div`
  padding: 2.5rem;
  text-align: center;
`;
