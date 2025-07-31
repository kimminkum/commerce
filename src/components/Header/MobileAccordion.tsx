// src/components/Header/MobileAccordion.tsx
"use client";

import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { categories } from "@/data/categoryData";

export default function MobileAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Wrapper>
      {categories.map((cat, index) => (
        <Category key={cat.name}>
          <CategoryHeader
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {cat.icon} {cat.name}
          </CategoryHeader>
          {openIndex === index && (
            <SubList>
              {cat.subItems.map((sub) => (
                <li key={sub.name}>
                  <StyledLink href={sub.path}>{sub.name}</StyledLink>
                </li>
              ))}
            </SubList>
          )}
        </Category>
      ))}
    </Wrapper>
  );
}

// styled-components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Category = styled.div``;

const CategoryHeader = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  text-align: left;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem 0;
`;

const SubList = styled.ul`
  list-style: none;
  padding-left: 1rem;

  li {
    padding: 0.25rem 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #555;

  &:hover {
    color: #000;
  }
`;
