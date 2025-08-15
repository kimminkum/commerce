"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = keyword.trim();
    if (!q) return;
    router.push(`/search?keyword=${encodeURIComponent(q)}`);
    setKeyword("");
  };

  return (
    <Form role="search" aria-label="상품 검색" onSubmit={handleSearch}>
      <SrOnly as="label" htmlFor="site-search">
        상품 검색
      </SrOnly>
      <Input
        id="site-search"
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="상품 검색"
        autoComplete="off"
        enterKeyHint="search"
      />
      <Button type="submit" aria-label="검색">
        🔍
      </Button>
    </Form>
  );
}

const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: 520px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem 2.5rem 0.6rem 1rem; /* 오른쪽 아이콘 공간 확보 */
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.subtext};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(17, 100, 244, 0.12);
  }
`;

const Button = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  font-size: 1.1rem;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.subtext};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SrOnly = styled.span`
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
