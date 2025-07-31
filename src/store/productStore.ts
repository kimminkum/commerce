// src/store/productStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

interface ProductStore {
  wishlist: Product[];
  cart: Product[];

  toggleWishlist: (product: Product) => void;
  toggleCart: (product: Product) => void;

  isInWishlist: (id: number) => boolean;
  isInCart: (id: number) => boolean;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      cart: [],

      toggleWishlist: (product) => {
        const { wishlist } = get();
        const exists = wishlist.find((item) => item.id === product.id);
        const updated = exists
          ? wishlist.filter((item) => item.id !== product.id)
          : [...wishlist, product];
        set({ wishlist: updated });
      },

      toggleCart: (product) => {
        const { cart } = get();
        const exists = cart.find((item) => item.id === product.id);
        const updated = exists
          ? cart.filter((item) => item.id !== product.id)
          : [...cart, product];
        set({ cart: updated });
      },

      isInWishlist: (id) => {
        return get().wishlist.some((item) => item.id === id);
      },

      isInCart: (id) => {
        return get().cart.some((item) => item.id === id);
      }
    }),
    {
      name: "product-storage" // localStorage key
    }
  )
);
