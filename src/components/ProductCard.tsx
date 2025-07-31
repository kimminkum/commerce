// src/components/ProductCard.tsx
"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { useProductStore } from "@/store/productStore";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { toggleWishlist, toggleCart, isInWishlist, isInCart } =
    useProductStore();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        position: "relative"
      }}
    >
      <button
        onClick={() => toggleWishlist(product)}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          color: isInWishlist(product.id) ? "red" : "gray",
          cursor: "pointer"
        }}
      >
        ♥
      </button>
      <Image
        src={product.image}
        alt={product.title}
        width={150}
        height={150}
        style={{ objectFit: "contain" }}
      />
      <h3 style={{ fontSize: "1rem" }}>{product.title}</h3>
      <p>{product.price.toLocaleString()}원</p>
      <button onClick={() => toggleCart(product)}>
        {isInCart(product.id) ? "🛒 제거" : "🛒 장바구니에 담기"}
      </button>
    </div>
  );
}
