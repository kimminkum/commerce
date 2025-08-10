// src/components/cart/CartItemRow.tsx
"use client";
import Image from "next/image";
import styled from "styled-components";
import type { Product } from "@/types/product";

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

      <Price>{product.price.toLocaleString()}원</Price>

      <Actions>
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
  border: 1px solid #eceef3;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(10, 16, 31, 0.03);

  @media (max-width: 640px) {
    grid-template-columns: 24px 72px 1fr;
    grid-template-rows: auto auto;
    gap: 10px 12px;

    /* 가격/액션을 아래 줄로 */
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
  accent-color: #1164f4; /* 크롬/엣지 네이티브 */
`;

const Thumb = styled.div`
  width: 96px;
  height: 96px;
  display: grid;
  place-items: center;
  background: #f6f7fa;
  border-radius: 10px;
`;

const Info = styled.div`
  min-width: 0; /* 말줄임 동작을 위해 */
`;

const Title = styled.h3`
  font-size: 1rem;
  line-height: 1.35;
  margin: 0 0 4px 0;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2줄 고정 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Meta = styled.div`
  color: #778;
  font-size: 0.88rem;
`;

const Price = styled.div`
  font-weight: 700;
  color: #111a2c;
  white-space: nowrap;
  margin-left: 8px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const RemoveBtn = styled.button`
  background: #f3f5f9;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.92rem;
  &:hover {
    background: #e8ecf5;
  }
`;
