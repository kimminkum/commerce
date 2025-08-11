"use client";
import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import CartItemRow from "@/components/cart/CartItemRow";

export default function CartPage() {
  const cart = useCartStore((s) => s.cart);
  const quantities = useCartStore((s) => s.quantities); // ✅ 수량 맵을 구독
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const addOrder = useOrderStore((s) => s.addOrder);
  const router = useRouter();

  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const allIds = useMemo(() => cart.map((p) => p.id), [cart]);
  const isAllChecked =
    checkedIds.length > 0 && checkedIds.length === allIds.length;

  const handleCheck = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  const toggleAll = () => {
    setCheckedIds(isAllChecked ? [] : allIds);
  };
  const removeSelected = () => {
    if (checkedIds.length === 0) return;
    if (!confirm("선택한 상품을 삭제할까요?")) return;
    checkedIds.forEach((id) => removeFromCart(id));
    setCheckedIds([]);
  };

  // ✅ quantities를 의존성에 포함 → 수량 변경 시 합계 즉시 갱신
  const { selectedSubtotal, shipping, grandTotal } = useMemo(() => {
    const subtotal = cart
      .filter((p) => checkedIds.includes(p.id))
      .reduce((sum, p) => sum + p.price * (quantities[p.id] ?? 1), 0);
    const shippingFee = subtotal >= 50000 || subtotal === 0 ? 0 : 3000;
    return {
      selectedSubtotal: subtotal,
      shipping: shippingFee,
      grandTotal: subtotal + shippingFee
    };
  }, [cart, checkedIds, quantities]);

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
        <LeftControls>
          <label>
            <input
              type="checkbox"
              checked={isAllChecked}
              onChange={toggleAll}
              aria-label="전체 선택"
            />{" "}
            전체 선택
          </label>
          <DividerV />
          <ActionTextButton
            onClick={removeSelected}
            disabled={checkedIds.length === 0}
          >
            선택 삭제
          </ActionTextButton>
        </LeftControls>
        <Right>
          <span>선택 {checkedIds.length}개</span>
          <PrimaryButton onClick={handleOrderSelected}>
            선택 상품 주문
          </PrimaryButton>
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

      <SummaryBar role="region" aria-label="주문 요약">
        <SummaryRow>
          <dl>
            <div>
              <dt>상품 합계</dt>
              <dd>{selectedSubtotal.toLocaleString()}원</dd>
            </div>
            <div>
              <dt>배송비</dt>
              <dd>{shipping.toLocaleString()}원</dd>
            </div>
            <div className="total">
              <dt>총 결제금액</dt>
              <dd>{grandTotal.toLocaleString()}원</dd>
            </div>
          </dl>
          <PrimaryButton
            onClick={handleOrderSelected}
            disabled={checkedIds.length === 0}
            aria-disabled={checkedIds.length === 0}
          >
            선택 상품 주문
          </PrimaryButton>
        </SummaryRow>
        <Hint>₩50,000 이상 무료배송</Hint>
      </SummaryBar>
    </Wrapper>
  );
}

// --- styles ---
const Wrapper = styled.div`
  padding: 2rem 1.25rem 8rem;
  max-width: 980px;
  margin: 0 auto;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  label {
    cursor: pointer;
    input {
      accent-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
const DividerV = styled.span`
  width: 1px;
  height: 16px;
  background: ${({ theme }) => theme.colors.border};
  display: inline-block;
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

const PrimaryButton = styled.button`
  padding: 0.9rem 1.6rem;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ActionTextButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.subtext};
  cursor: pointer;
  padding: 0.25rem 0.4rem;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:enabled {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: underline;
  }
`;

const SummaryBar = styled.aside`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 -6px 18px rgba(0, 0, 0, 0.04);
  margin-top: 1.5rem;
`;

const SummaryRow = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 0.9rem 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  dl {
    display: flex;
    gap: 1.2rem;
    margin: 0;
  }
  dt {
    color: ${({ theme }) => theme.colors.subtext};
    font-weight: 500;
    margin-right: 0.35rem;
  }
  dd {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
  }
  .total dt,
  .total dd {
    font-size: 1.05rem;
  }
`;

const Hint = styled.p`
  max-width: 980px;
  margin: 0.2rem auto 0.7rem;
  color: ${({ theme }) => theme.colors.subtext};
  font-size: 0.92rem;
`;

const Empty = styled.div`
  padding: 2.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.subtext};
`;
