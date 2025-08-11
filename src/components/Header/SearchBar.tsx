// src/components/Header/SearchBar.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    setKeyword("");
  };

  return (
    <Form role="search" onSubmit={handleSearch}>
      <Input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="상품 검색"
        aria-label="검색"
      />
      <Button type="submit" aria-label="검색">
        🔍
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const Input = styled.input`
  padding: 0.6rem 1.2rem;
  border: 1px solid #ddd;
  border-radius: ${({ theme }) => theme.radius.md};
  outline: none;
  font-size: 1rem;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  font-size: 1.1rem;
  cursor: pointer;
  margin-left: -2.5rem;
  z-index: 1;
  padding: 0;
`;
