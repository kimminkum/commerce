// src/store/orderStore.ts
import { create } from "zustand";
import { Product } from "@/types/product";

interface Order {
  id: string;
  items: Product[];
  date: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] }))
}));
