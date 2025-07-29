// src/app/signup/page.tsx
"use client";

import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import { signUp } from "@/auth/authService";
import { useAuthStore } from "@/store/authStore";

export default function SignupPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSignup = async (email: string, password: string) => {
    try {
      const user = await signUp(email, password);
      setUser({ uid: user.uid, email: user.email });
      router.push("/");
    } catch (err) {
      alert("회원가입 실패");
      console.error(err);
    }
  };

  return <AuthForm onSubmit={handleSignup} type="signup" />;
}
