// src/app/products/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import Image from "next/image";
import { useCallback } from "react";

const fetchProduct = async (id: string) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };

  // 찜
  const { toggleWishlist, isInWishlist } = useProductStore();

  // 장바구니
  const cart = useCartStore((s) => s.cart);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  // 안전한 isInCart
  const isInCart = useCallback(
    (productId: number) => cart.some((item) => item.id === productId),
    [cart]
  );

  const addOrder = useOrderStore((s) => s.addOrder);
  const router = useRouter();

  const {
    data: product,
    isLoading,
    error
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id
  });

  if (isLoading) return <Message>불러오는 중...</Message>;
  if (error || !product)
    return <Message>상품 정보를 불러올 수 없습니다.</Message>;

  // 장바구니 토글
  const handleCart = () => {
    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <DetailWrapper>
      <ImageBox>
        <Image
          src={product.image}
          alt={product.title}
          width={380}
          height={380}
          style={{
            borderRadius: "8px",
            background: "#f6f6f6",
            objectFit: "contain"
          }}
          priority
        />
      </ImageBox>
      <Info>
        <h1>{product.title}</h1>
        <Price>{product.price.toLocaleString()}원</Price>
        <Description>{product.description}</Description>
        <ActionGroup>
          <ActionBtn
            onClick={() => toggleWishlist(product)}
            aria-label={isInWishlist(product.id) ? "찜 취소" : "찜 추가"}
          >
            {isInWishlist(product.id) ? "❤️ 찜됨" : "🤍 찜"}
          </ActionBtn>
          <ActionBtn
            onClick={handleCart}
            aria-label={
              isInCart(product.id) ? "장바구니에서 제거" : "장바구니에 추가"
            }
          >
            {isInCart(product.id) ? "🛒 담김" : "➕ 장바구니"}
          </ActionBtn>
          <ActionBtn
            onClick={() => {
              addOrder({
                id: Date.now().toString(),
                items: [product],
                date: new Date().toLocaleString()
              });
              router.replace("/order/complete");
            }}
          >
            🏷️ 바로 주문
          </ActionBtn>
        </ActionGroup>
      </Info>
    </DetailWrapper>
  );
}

// --- Styled Components 동일 ---
const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  @media (min-width: 800px) {
    flex-direction: row;
  }
`;
const ImageBox = styled.div`
  flex: 1;
  min-width: 280px;
  img {
    width: 100%;
    max-width: 380px;
    border-radius: 8px;
    background: #f6f6f6;
    object-fit: contain;
  }
`;
const Info = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;
const Description = styled.div`
  color: #555;
  margin: 0.5rem 0 1rem 0;
`;
const ActionGroup = styled.div`
  display: flex;
  gap: 1rem;
`;
const ActionBtn = styled.button`
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  border: none;
  background: #f5f5f5;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #ffeaea;
  }
`;
const Message = styled.div`
  padding: 2rem;
`;
