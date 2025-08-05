// src/components/Header/MobileAccordion.tsx
"use client";

import styled from "styled-components";
import Link from "next/link";
import { categories } from "@/data/categoryData";

export default function MobileAccordion({
  closeMenu
}: {
  closeMenu?: () => void;
}) {
  return (
    <Wrapper>
      {/* 전체상품 */}
      <AllLink href="/products" onClick={closeMenu}>
        전체 상품
      </AllLink>
      {/* 카테고리 모두 펼쳐진 상태 */}
      {categories.map((cat) => (
        <CategoryBlock key={cat.name}>
          <CategoryHeader href={cat.path} onClick={closeMenu}>
            {cat.icon} {cat.name}
          </CategoryHeader>
          <SubList>
            {cat.subItems.map((sub) => (
              <li key={sub.name}>
                <SubLink href={sub.path} onClick={closeMenu}>
                  {sub.name}
                </SubLink>
              </li>
            ))}
          </SubList>
        </CategoryBlock>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1rem 0;
`;

const AllLink = styled(Link)`
  font-weight: bold;
  color: #4d4d4d;
  padding: 0.5rem 0 1rem 0;
  text-decoration: none;
  border-bottom: 1px solid #eee;
  margin-bottom: 0.8rem;
`;

const CategoryBlock = styled.div``;

const CategoryHeader = styled(Link)`
  font-weight: bold;
  font-size: 1rem;
  color: #222;
  text-decoration: none;
  padding: 0.5rem 0 0.2rem 0;
  display: block;
`;

const SubList = styled.ul`
  list-style: none;
  padding: 0 0 0 1.1rem;
  margin: 0;
  li {
    padding: 0.2rem 0;
  }
`;

const SubLink = styled(Link)`
  color: #555;
  font-size: 0.98rem;
  text-decoration: none;
  display: block;
  padding: 0.18rem 0;
  &:hover {
    color: #000;
  }
`;
