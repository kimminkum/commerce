"use client";
import styled from "styled-components";
import { useState, useRef, useMemo } from "react";
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
    }, 100);
  };

  // 현재 선택된(hover된) 카테고리와 서브 존재 여부
  const current = useMemo(
    () => categories.find((c) => c.name === hoveredCategory),
    [hoveredCategory]
  );
  const hasSub = !!(current?.subItems && current.subItems.length > 0);

  return (
    <DropdownWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Trigger href="/products">상품 ▾</Trigger>

      {isOpen && (
        <DropdownArea role="menu" aria-label="상품 카테고리" $hasSub={hasSub}>
          {/* 왼쪽: 중카테고리 목록 */}
          <LeftColumn>
            {categories.map((cat) => (
              <CategoryItem
                key={cat.name}
                onMouseEnter={() => setHoveredCategory(cat.name)}
                onFocus={() => setHoveredCategory(cat.name)}
                tabIndex={0}
              >
                <CategoryLink href={cat.path}>
                  {cat.icon} {cat.name}
                </CategoryLink>
              </CategoryItem>
            ))}
          </LeftColumn>

          {/* 오른쪽: 소카테고리 패널 (소분류 없으면 display:none) */}
          <RightPanel $visible={hasSub}>
            {hasSub && (
              <SubList>
                {current!.subItems!.map((sub) => (
                  <li key={sub.name}>
                    <SubLink href={sub.path}>{sub.name}</SubLink>
                  </li>
                ))}
              </SubList>
            )}
          </RightPanel>
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
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
`;

const DropdownArea = styled.div<{ $hasSub: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  display: grid;
  /* 소분류가 있으면 2열, 없으면 1열 */
  grid-template-columns: ${({ $hasSub }) =>
    $hasSub ? "200px 240px" : "200px"};
  align-items: stretch;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  overflow: hidden;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  background: ${({ theme }) => theme.colors.bg};
`;

const CategoryItem = styled.div`
  border-radius: ${({ theme }) => theme.radius.sm};
  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

const CategoryLink = styled(Link)`
  display: block;
  padding: 10px 12px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 600;
`;

const RightPanel = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? "block" : "none")};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  padding: 8px;
  min-height: 100%;
`;

const SubList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SubLink = styled(Link)`
  display: block;
  padding: 10px 12px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: #000;
    text-decoration: underline;
  }
`;
