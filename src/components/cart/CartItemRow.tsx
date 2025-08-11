"use client";
import Image from "next/image";
import styled from "styled-components";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface Props {
  product: Product;
  checked: boolean;
  onCheck: (id: number) => void;
  onRemove?: (id: number) => void;
}

export default function CartItemRow({
  product,
  checked,
  onCheck,
  onRemove
}: Props) {
  // ✅ 수량을 selector로 구독 → 수량 변경 시 자동 리렌더
  const qty = useCartStore((s) => s.quantities[product.id] ?? 1);
  const incQty = useCartStore((s) => s.incQty);
  const decQty = useCartStore((s) => s.decQty);
  const setQty = useCartStore((s) => s.setQty);

  const price = product.price;
  const lineTotal = price * qty;

  return (
    <Item>
      <CheckBox
        type="checkbox"
        checked={checked}
        onChange={() => onCheck(product.id)}
        aria-label="상품 선택"
      />

      <Thumb>
        <Image
          src={product.image}
          alt={product.title}
          width={96}
          height={96}
          style={{ objectFit: "contain" }}
        />
      </Thumb>

      <Info>
        <Title title={product.title}>{product.title}</Title>
        <Meta>
          <span>카테고리: {product.category}</span>
        </Meta>
      </Info>

      <Price>
        <div className="unit">{price.toLocaleString()}원</div>
        <div className="total">{lineTotal.toLocaleString()}원</div>
      </Price>

      <Actions>
        <Stepper aria-label="수량 조절">
          <StepBtn
            type="button"
            onClick={() => decQty(product.id)}
            aria-label="수량 감소"
          >
            −
          </StepBtn>
          <QtyInput
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="수량"
            value={qty}
            onChange={(e) => setQty(product.id, Number(e.target.value))}
            onBlur={(e) => {
              const v = Number(e.target.value);
              setQty(product.id, Number.isFinite(v) ? v : 1);
            }}
          />
          <StepBtn
            type="button"
            onClick={() => incQty(product.id)}
            aria-label="수량 증가"
          >
            +
          </StepBtn>
        </Stepper>

        {onRemove && (
          <RemoveBtn
            onClick={() => onRemove(product.id)}
            aria-label="장바구니에서 삭제"
          >
            삭제
          </RemoveBtn>
        )}
      </Actions>
    </Item>
  );
}

// --- styles ---
const Item = styled.li`
  display: grid;
  grid-template-columns: 28px 96px 1fr auto auto;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: ${({ theme }) => theme.shadow};

  @media (max-width: 640px) {
    grid-template-columns: 24px 72px 1fr;
    grid-template-rows: auto auto;
    gap: 10px 12px;

    & > :nth-child(4),
    & > :nth-child(5) {
      grid-column: 3 / -1;
      justify-self: end;
    }
  }
`;

const CheckBox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const Thumb = styled.div`
  width: 96px;
  height: 96px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const Info = styled.div`
  min-width: 0;
`;

const Title = styled.h3`
  font-size: 1rem;
  line-height: 1.35;
  margin: 0 0 4px 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Meta = styled.div`
  color: ${({ theme }) => theme.colors.subtext};
  font-size: 0.88rem;
`;

const Price = styled.div`
  white-space: nowrap;
  margin-left: 8px;
  text-align: right;

  .unit {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.subtext};
  }
  .total {
    margin-top: 4px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  height: 32px;
`;

const StepBtn = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  background: ${({ theme }) => theme.colors.gray100};
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`;

const QtyInput = styled.input`
  width: 42px;
  height: 32px;
  border: 0;
  text-align: center;
  font-size: 0.95rem;
  outline: none;
  background: ${({ theme }) => theme.colors.bg};
`;

const RemoveBtn = styled.button`
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 8px 12px;
  font-size: 0.92rem;
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`;
