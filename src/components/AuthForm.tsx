"use client";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => void;
  type: "login" | "signup";
}

export default function AuthForm({ onSubmit, type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }
    setError("");
    onSubmit(email, password);
  };

  return (
    <FormWrapper>
      <FormTitle>{type === "login" ? "로그인" : "회원가입"}</FormTitle>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
        />
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          autoComplete={type === "login" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <SubmitBtn type="submit" disabled={!email || !password}>
          {type === "login" ? "로그인" : "회원가입"}
        </SubmitBtn>
      </form>
      {/* 부가 안내문구 추가 */}
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
    </FormWrapper>
  );
}

// --- styled-components 동일하게 사용 ---
const FormWrapper = styled.div`
  background: #fff;
  max-width: 350px;
  margin: 3rem auto;
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: 0 4px 24px rgba(32, 44, 68, 0.07);
  padding: 2rem 2.2rem 2.5rem 2.2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.45rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  text-align: center;
  letter-spacing: -0.02em;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.3rem;
  margin-top: 0.9rem;
  display: block;
  font-size: 0.97rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid #dde2ec;
  margin-bottom: 0.3rem;
  font-size: 1rem;
  background: #f6f7fa;
  &:focus {
    outline: 2px solid #1164f4;
    border-color: #1164f4;
    background: #fff;
  }
`;

const ErrorMsg = styled.div`
  color: #d4001b;
  font-size: 0.95rem;
  margin-bottom: 0.6rem;
  margin-top: 0.2rem;
  text-align: left;
`;

const SubmitBtn = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.9rem 0;
  font-size: 1.07rem;
  background: #1164f4;
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: pointer;
  transition: background 0.16s;
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
