// src/app/test/page.tsx
"use client";

import { useAuthStore } from "@/store/authStore";
import { useAuthListener } from "@/hooks/useAuthListener";

export default function TestPage() {
  useAuthListener(); // 로그인 상태 감지

  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.isLoading);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>테스트 페이지</h1>
      {user ? <p>로그인됨: {user.email}</p> : <p>로그인 안 됨</p>}
    </div>
  );
}
