// src/components/ProductCard.tsx
"use client";

import styled from "styled-components";
import Image from "next/image";
import { Product } from "@/types/product";
import { useProductStore } from "@/store/productStore";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { toggleWishlist, toggleCart, isInWishlist, isInCart } =
    useProductStore();

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
            onClick={() => toggleWishlist(product)}
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
            onClick={() => toggleCart(product)}
            aria-label={
              isInCart(product.id) ? "장바구니에서 제거" : "장바구니에 추가"
            }
          >
            {isInCart(product.id) ? "🛒 담김" : "➕ 담기"}
          </ActionButton>
        </Actions>
      </Card>
    </Link>
  );
}

// 스타일
const Card = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.03);
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
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
  flex: 1;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0.25rem 0;
`;

const Price = styled.p`
  font-weight: bold;
  color: #333;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  border: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
`;
