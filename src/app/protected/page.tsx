// src/app/protected/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAuthListener } from "@/hooks/useAuthListener";

export default function ProtectedPage() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.isLoading);
  const router = useRouter();

  useAuthListener(); // Firebase 로그인 상태 유지

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // 비로그인 상태일 때 리디렉션
    }
  }, [loading, user]);

  if (loading) return <p>로딩 중...</p>;
  if (!user) return null; // 리디렉션 중에는 아무것도 안 보이게

  return (
    <div>
      <h1>🔐 보호된 페이지</h1>
      <p>{user.email}님만 볼 수 있는 콘텐츠입니다.</p>
    </div>
  );
}
