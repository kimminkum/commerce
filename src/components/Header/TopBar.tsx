import styled from "styled-components";
import Link from "next/link";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

// TopBarProps는 유지
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

  // 마이페이지 클릭 핸들러 (컴포넌트 내부에서 useRouter 사용!)
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
        {!isMobile && (
          <>
            {user ? (
              <LogoutButton onClick={logout}>로그아웃</LogoutButton>
            ) : (
              <>
                <TopLink href="/login">로그인</TopLink>
                <TopLink href="/signup">회원가입</TopLink>
              </>
            )}
            <TopButton type="button" onClick={goToMypage}>
              마이페이지
            </TopButton>
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

// 스타일
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
// **Button 컴포넌트 분리**
const TopButton = styled.button`
  color: #333;
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
  color: #333;
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
  border-radius: 20px;
  padding: 0.4rem 1.1rem;
  font-weight: 500;
  font-size: 0.97rem;
  cursor: pointer;
  margin-right: 0.2rem;
  &:hover {
    background: #444;
  }
`;
