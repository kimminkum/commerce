// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  uid: string;
  email: string;
}
interface AuthState {
  user: User | null;
  expiresAt: number | null;
  isLoading: boolean;
  setUser: (user: User | null, expiresAt?: number | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      expiresAt: null,
      isLoading: false,
      setUser: (user, expiresAt = null) => set({ user, expiresAt }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: async () => {
        try {
          const { logout } = await import("@/auth/authService");
          await logout();
        } finally {
          set({ user: null, expiresAt: null });
        }
      }
    }),
    { name: "auth-storage" }
  )
);
