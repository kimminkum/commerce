// src/app/test/page.tsx
"use client";

import { useAuthStore } from "@/store/authStore";
import { useAuthListener } from "@/hooks/useAuthListener";
import { logout } from "@/auth/authService";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const loading = useAuthStore((s) => s.isLoading);
  const router = useRouter();

  // 로그인 상태 감지
  useAuthListener();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push("/login");
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
