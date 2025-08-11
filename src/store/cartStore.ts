// src/store/cartStore.ts
import { create } from "zustand";
import { Product } from "@/types/product";

interface CartState {
  cart: Product[];
  quantities: Record<number, number>;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  incQty: (id: number) => void;
  decQty: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  getQty: (id: number) => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  quantities: {},

  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.some((p) => p.id === product.id);
      if (exists) {
        const curr = state.quantities[product.id] ?? 1;
        return { quantities: { ...state.quantities, [product.id]: curr + 1 } };
      }
      return {
        cart: [...state.cart, product],
        quantities: { ...state.quantities, [product.id]: 1 }
      };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const restQty = { ...state.quantities };
      delete restQty[id];
      return {
        cart: state.cart.filter((p) => p.id !== id),
        quantities: restQty
      };
    }),

  clearCart: () => set({ cart: [], quantities: {} }),

  incQty: (id) =>
    set((state) => {
      const curr = state.quantities[id] ?? 1;
      return { quantities: { ...state.quantities, [id]: curr + 1 } };
    }),

  decQty: (id) =>
    set((state) => {
      const curr = state.quantities[id] ?? 1;
      const next = Math.max(1, curr - 1);
      return { quantities: { ...state.quantities, [id]: next } };
    }),

  setQty: (id, qty) =>
    set((state) => {
      const safe = Math.max(1, Math.min(99, Math.floor(qty || 1)));
      return { quantities: { ...state.quantities, [id]: safe } };
    }),

  getQty: (id) => get().quantities[id] ?? 1
}));
