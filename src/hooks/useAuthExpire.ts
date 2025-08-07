"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export function useAuthExpire() {
  const { user, expiresAt, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || !expiresAt) return;
    const remain = expiresAt - Date.now();
    if (remain <= 0) {
      alert("로그인 세션이 만료되었습니다.");
      logout();
      router.push("/login");
      return;
    }
    const timeout = setTimeout(() => {
      alert("로그인 세션이 만료되었습니다.");
      logout();
      router.push("/login");
    }, remain);

    return () => clearTimeout(timeout);
  }, [user, expiresAt, logout, router]);
}
