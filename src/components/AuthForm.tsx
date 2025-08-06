// src/components/AuthForm.tsx
"use client";

import { useState } from "react";
import styled from "styled-components";

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
    <Wrapper>
      <FormTitle>{type === "login" ? "로그인" : "회원가입"}</FormTitle>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit" disabled={!email || !password}>
          {type === "login" ? "로그인" : "회원가입"}
        </SubmitButton>
      </Form>
      {/* 부가 안내 or 링크 영역 예시 */}
      {type === "login" ? (
        <HelperText>
          아직 회원이 아니신가요?{" "}
          <StyledLink href="/signup">회원가입</StyledLink>
        </HelperText>
      ) : (
        <HelperText>
          이미 계정이 있으신가요? <StyledLink href="/login">로그인</StyledLink>
        </HelperText>
      )}
    </Wrapper>
  );
}

// --- Styled Components ---
import Link from "next/link";

const Wrapper = styled.div`
  max-width: 340px;
  margin: 5vh auto 0 auto;
  padding: 2.5rem 2rem 2rem 2rem;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 6px 32px 0 rgba(80, 80, 110, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #222;
  letter-spacing: -0.01em;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Input = styled.input`
  padding: 0.9rem 1.1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.5px solid #e3e6ed;
  background: #fafafd;
  transition: border 0.18s;
  outline: none;
  &:focus {
    border: 1.7px solid #1164f4;
    background: #fff;
  }
`;

const SubmitButton = styled.button`
  margin-top: 0.6rem;
  padding: 0.95rem 0;
  font-size: 1.08rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: #1164f4;
  color: #fff;
  cursor: pointer;
  transition: background 0.18s;
  &:hover:enabled {
    background: #0033a5;
  }
  &:disabled {
    background: #b0b8c1;
    cursor: not-allowed;
  }
`;

const HelperText = styled.div`
  margin-top: 1.5rem;
  font-size: 0.97rem;
  color: #666;
`;

const StyledLink = styled(Link)`
  color: #1164f4;
  text-decoration: underline;
  font-weight: 500;
  margin-left: 3px;
  &:hover {
    color: #0033a5;
  }
`;
