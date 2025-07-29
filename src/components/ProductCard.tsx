// src/components/ProductCard.tsx
"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { useFavoriteStore } from "@/store/favoriteStore";
import { useCartStore } from "@/store/cartStore";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { favorites, toggleFavorite } = useFavoriteStore();
  const { addToCart } = useCartStore();

  const isFavorite = favorites.includes(product.id);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        position: "relative"
      }}
    >
      <button
        onClick={() => toggleFavorite(product.id)}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          color: isFavorite ? "red" : "gray",
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
      <button onClick={() => addToCart(product)}>🛒 장바구니에 담기</button>
    </div>
  );
}
