// src/app/test/page.tsx
"use client";

import { useAuthStore } from "@/store/authStore";
import { useAuthListener } from "@/hooks/useAuthListener";
import { logout } from "@/auth/authService";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const loading = useAuthStore((state) => state.isLoading);
  const router = useRouter();

  useAuthListener(); // 로그인 상태 감지

  const handleLogout = async () => {
    await logout(); // Firebase 로그아웃
    setUser(null); // Zustand 상태 초기화
    router.push("/login"); // 로그인 페이지로 이동
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>테스트 페이지</h1>
      {user ? (
        <>
          <p>로그인됨: {user.email}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <p>로그인 안 됨</p>
      )}
    </div>
  );
}
