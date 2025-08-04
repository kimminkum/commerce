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
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredCategory(null);
    }, 100); // ⏱ 200ms 딜레이 후 닫힘
  };

  return (
    <HoverZone onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Trigger href="/products">상품 ▾</Trigger>

      {isOpen && (
        <DropdownArea>
          <DropdownMenu>
            <MiddleColumn>
              {categories.map((cat) => (
                <CategoryItem
                  key={cat.name}
                  onMouseEnter={() => setHoveredCategory(cat.name)}
                >
                  <CategoryLabel>
                    {cat.icon} {cat.name}
                  </CategoryLabel>

                  {hoveredCategory === cat.name && (
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
          </DropdownMenu>
        </DropdownArea>
      )}
    </HoverZone>
  );
}

const HoverZone = styled.div`
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
  z-index: 1000;
`;

const DropdownMenu = styled.div`
  display: flex;
  position: relative;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const MiddleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryItem = styled.div`
  position: relative;
  padding: 0.5rem 1rem;
  white-space: nowrap;
  font-weight: bold;
  cursor: pointer;

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
  border-radius: 8px;
  padding: 1rem;
  min-width: 140px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SubLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 0.95rem;

  &:hover {
    color: #000;
  }
`;
