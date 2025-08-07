import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  uid: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  expiresAt: number | null;
  setUser: (user: User | null, expiresAt?: number) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      expiresAt: null,
      isLoading: false,
      setUser: (user, expiresAt) => set({ user, expiresAt: expiresAt ?? null }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null })
    }),
    {
      name: "auth-storage"
    }
  )
);
