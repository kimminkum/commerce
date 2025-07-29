// src/components/AuthForm.tsx
"use client";

import { useState } from "react";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  type: "login" | "signup";
}

export default function AuthForm({ onSubmit, type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === "login" ? "로그인" : "회원가입"}</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{type === "login" ? "로그인" : "회원가입"}</button>
    </form>
  );
}
