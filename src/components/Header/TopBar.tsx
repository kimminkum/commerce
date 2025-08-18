// src/components/Header/TopBar.tsx
"use client";

import styled from "styled-components";
import Link from "next/link";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const goToMypage = () => {
    if (!user) {
      if (window.confirm("로그인이 필요합니다.\n로그인 페이지로 이동할까요?")) {
        router.push("/login");
      }
      return;
    }
    router.push("/protected");
  };

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
        {!isMobile ? (
          <>
            {/* Start Here는 한 번만 */}
            <StartHere href="/start-here" aria-label="프로젝트 요점집">
              Start Here
            </StartHere>

            {user ? (
              <>
                <TopButton type="button" onClick={goToMypage}>
                  마이페이지
                </TopButton>
                <LogoutButton onClick={logout}>로그아웃</LogoutButton>
              </>
            ) : (
              <>
                <TopLink href="/login">로그인</TopLink>
                <TopLink href="/signup">회원가입</TopLink>
                <TopButton type="button" onClick={goToMypage}>
                  마이페이지
                </TopButton>
              </>
            )}
          </>
        ) : (
          <HamburgerButton
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label={isDrawerOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-drawer"
          >
            ☰
          </HamburgerButton>
        )}
      </RightMenu>
    </Wrapper>
  );
}

// 스타일
const Wrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.bannerMax};
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};
  padding-top: 1rem;
  padding-bottom: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }
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
  gap: 1.1rem;
`;

const TopLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  &:hover {
    color: #000;
  }
`;

const TopButton = styled.button`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: 0.95rem;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: #000;
    text-decoration: underline;
  }
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  font-size: 1.75rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    color: #000;
  }
  @media (min-width: 769px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  color: #fff;
  background: #222;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md}; /* 토큰 일치 */
  padding: 0.4rem 1.1rem;
  font-weight: 500;
  font-size: 0.97rem;
  cursor: pointer;
  margin-right: 0.2rem;
  &:hover {
    background: #444;
  }
`;

const StartHere = styled(Link)`
  padding: 0.4rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.gray100};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`;
