// src/app/cart/page.tsx
"use client";

import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ProductCard";

export default function CartPage() {
  const cart = useProductStore((state) => state.cart);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🛒 장바구니</h1>
      {cart.length === 0 ? (
        <p>장바구니에 담긴 상품이 없습니다.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem"
          }}
        >
          {cart.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
