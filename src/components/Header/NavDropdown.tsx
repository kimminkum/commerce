// src/components/Header/NavDropdown.tsx
"use client";
import styled from "styled-components";
import { useState, useRef } from "react";
import Link from "next/link";
import { categories } from "@/data/categoryData";

export default function NavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredCategory(null);
    }, 100); // 0.1초 후 닫힘
  };

  return (
    <DropdownWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Trigger href="/products">상품 ▾</Trigger>
      {isOpen && (
        <DropdownArea>
          <MiddleColumn>
            {categories.map((cat) => (
              <CategoryItem
                key={cat.name}
                onMouseEnter={() => setHoveredCategory(cat.name)}
              >
                {/* 중카테고리 클릭 시 해당 카테고리로 이동 */}
                <CategoryLabel as={Link} href={cat.path}>
                  {cat.icon} {cat.name}
                </CategoryLabel>

                {/* 소카테고리 (hover 시 보임, 클릭 시 하위 경로 이동) */}
                {hoveredCategory === cat.name &&
                  cat.subItems &&
                  cat.subItems.length > 0 && (
                    <SubMenu
                      onMouseEnter={() => setHoveredCategory(cat.name)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {cat.subItems.map((sub) => (
                        <SubLink key={sub.name} href={sub.path}>
                          {sub.name}
                        </SubLink>
                      ))}
                    </SubMenu>
                  )}
              </CategoryItem>
            ))}
          </MiddleColumn>
        </DropdownArea>
      )}
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Trigger = styled(Link)`
  color: #333;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
`;

const DropdownArea = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 0;
  display: flex;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  z-index: 1000;
`;

const MiddleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  min-width: 140px;
`;

const CategoryItem = styled.div`
  position: relative;
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  &:hover {
    background: #f5f5f5;
  }
`;

const CategoryLabel = styled.div`
  font-weight: bold;
`;

const SubMenu = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 1rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1rem;
  min-width: 140px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1001;
`;

const SubLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 0.95rem;
  &:hover {
    color: #000;
  }
`;
