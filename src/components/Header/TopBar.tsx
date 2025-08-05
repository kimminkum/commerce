// src/components/Header/TopBar.tsx
// src/components/Header/TopBar.tsx
"use client";
import styled from "styled-components";
import Link from "next/link";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

// ✅ props 타입 명확히!
interface TopBarProps {
  isMobile: boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopBar({
  isMobile,
  isDrawerOpen,
  setIsDrawerOpen
}: TopBarProps) {
  return (
    <Wrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      {!isMobile && (
        <SearchBarWrapper>
          <SearchBar />
        </SearchBarWrapper>
      )}
      <RightMenu>
        {!isMobile && (
          <>
            <TopLink href="/login">로그인</TopLink>
            <TopLink href="/signup">회원가입</TopLink>
            <TopLink href="/protected">마이페이지</TopLink>
          </>
        )}
        {isMobile && (
          <HamburgerButton
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="메뉴 열기"
          >
            ☰
          </HamburgerButton>
        )}
      </RightMenu>
    </Wrapper>
  );
}

// ... 이하 스타일 동일 (생략)

const Wrapper = styled.div`
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const SearchBarWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 200px;
  margin: 0 2rem;
`;
const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
const TopLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  &:hover {
    color: #000;
  }
`;
const HamburgerButton = styled.button`
  background: none;
  border: none;
  font-size: 1.75rem;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #000;
  }
  @media (min-width: 769px) {
    display: none;
  }
`;
