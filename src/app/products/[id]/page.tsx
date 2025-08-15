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
  const { id } = useParams<{ id: string }>();
  const { toggleWishlist, isInWishlist } = useProductStore();
  const cart = useCartStore((s) => s.cart);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const isInCart = useCallback(
    (pid: number) => cart.some((i) => i.id === pid),
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
    queryFn: () => fetchProduct(id!),
    enabled: !!id
  });

  if (isLoading) return <Message>불러오는 중...</Message>;
  if (error || !product)
    return <Message>상품 정보를 불러올 수 없습니다.</Message>;

  const handleCart = () => {
    if (isInCart(product.id)) removeFromCart(product.id);
    else addToCart(product);
  };

  return (
    <DetailWrapper>
      <ImageBox>
        <Image
          src={product.image}
          alt={product.title}
          width={420}
          height={420}
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
            aria-label="바로 주문"
          >
            🏷️ 바로 주문
          </ActionBtn>
        </ActionGroup>
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  min-width: ${({ theme }) => theme.size.min};
  margin: 0 auto;
  padding: 2rem 0;
  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};
  display: grid;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1.4fr;
  }
  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }
`;
const ImageBox = styled.div``;
const Info = styled.div`
  display: grid;
  gap: 1rem;
`;
const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
`;
const Description = styled.div`
  color: #555;
  margin: 0.5rem 0 1rem 0;
`;
const ActionGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;
const ActionBtn = styled.button`
  padding: 0.55rem 1.1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #fff;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }
`;
const Message = styled.div`
  padding: 2rem;
  text-align: center;
`;
