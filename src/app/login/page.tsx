// src/app/login/page.tsx
"use client";

import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import { signIn } from "@/auth/authService";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await signIn(email, password);
      if (!user.uid || !user.email)
        throw new Error("잘못된 사용자 정보입니다.");

      const expiresAt = Date.now() + 60 * 60 * 1000;
      setUser({ uid: user.uid, email: user.email }, expiresAt);
      router.push("/");
    } catch (err) {
      alert("로그인 실패");
      console.error(err);
    }
  };

  return <AuthForm onSubmit={handleLogin} type="login" />;
}
