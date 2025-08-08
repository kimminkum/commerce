// src/components/SessionExpireWatcher.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function SessionExpireWatcher() {
  const user = useAuthStore((s) => s.user);
  const expiresAt = useAuthStore((s) => s.expiresAt);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (user && expiresAt && Date.now() > expiresAt) {
      alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
      logout();
      window.location.reload();
    }
  }, [user, expiresAt, logout]);

  return null; // 렌더링할 UI 없음
}
