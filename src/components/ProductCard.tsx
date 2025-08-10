// src/components/ProductCard.tsx
"use client";

import styled from "styled-components";
import Image from "next/image";
import { Product } from "@/types/product";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { toggleWishlist, isInWishlist } = useProductStore();
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const cart = useCartStore((s) => s.cart);

  const isInCart = cart.some((p) => p.id === product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card>
        <ImageWrapper>
          <StyledImage
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
          />
          <WishlistButton
            onClick={handleWishlistClick}
            aria-label={isInWishlist(product.id) ? "찜 취소" : "찜 추가"}
          >
            {isInWishlist(product.id) ? "❤️" : "🤍"}
          </WishlistButton>
        </ImageWrapper>

        <Info>
          <Title>{product.title}</Title>
          <Price>{product.price.toLocaleString()}원</Price>
        </Info>

        <Actions>
          <ActionButton
            onClick={handleCartClick}
            aria-label={isInCart ? "장바구니에서 제거" : "장바구니에 추가"}
          >
            {isInCart ? "🛒 담김" : "➕ 담기"}
          </ActionButton>
        </Actions>
      </Card>
    </Link>
  );
}

// 스타일
const Card = styled.div`
  /* 고정 레이아웃: 이미지 / 정보 / 액션 3행 */
  display: grid;
  grid-template-rows: 200px auto auto;
  gap: 0.75rem;

  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.03);
  position: relative;
  height: 100%; /* 그리드 셀 높이 맞추기 */
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px; /* 이미지 영역 고정 */
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  border-radius: 4px;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* 아래 Title의 min-height와 합쳐 카드 높이 안정화 */
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0.25rem 0;

  /* 2줄 고정 + 말줄임 처리 */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 줄 수 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 줄 높이에 맞춘 고정 높이 (2줄) */
  line-height: 1.3;
  min-height: calc(1.3em * 2);
`;

const Price = styled.p`
  font-weight: bold;
  color: #333;
  margin-top: 0.35rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ActionButton = styled.button`
  border: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
`;
