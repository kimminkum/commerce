// src/store/productStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

interface ProductStore {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (product) => {
        const { wishlist } = get();
        const exists = wishlist.find((item) => item.id === product.id);
        const updated = exists
          ? wishlist.filter((item) => item.id !== product.id)
          : [...wishlist, product];
        set({ wishlist: updated });
      },

      isInWishlist: (id) => {
        return get().wishlist.some((item) => item.id === id);
      }
    }),
    {
      name: "product-storage" // localStorage key
    }
  )
);
