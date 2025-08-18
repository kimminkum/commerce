// src/app/signup/page.tsx
"use client";

import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function SignupPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSignup = async (email: string, password: string) => {
    try {
      const { signUp } = await import("@/auth/authService");
      const user = await signUp(email, password);
      if (!user.uid || !user.email)
        throw new Error("잘못된 사용자 정보입니다.");
      const expiresAt = Date.now() + 60 * 60 * 1000;
      setUser({ uid: user.uid, email: user.email }, expiresAt);
      router.push("/");
    } catch (err) {
      alert("회원가입 실패");
      console.error(err);
    }
  };

  return <AuthForm onSubmit={handleSignup} type="signup" />;
}
