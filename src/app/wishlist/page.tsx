// src/app/wishlist/page.tsx
"use client";

import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const wishlist = useProductStore((state) => state.wishlist);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>❤️ 찜한 상품</h1>
      {wishlist.length === 0 ? (
        <p>찜한 상품이 없습니다.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem"
          }}
        >
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
