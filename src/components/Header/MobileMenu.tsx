// src/components/Header/MobileMenu.tsx
"use client";
import styled from "styled-components";
import Link from "next/link";
import MobileAccordion from "./MobileAccordion";
import SearchBar from "./SearchBar";
import { useAuthStore } from "@/store/authStore";

export default function MobileMenu({ closeMenu }: { closeMenu: () => void }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  return (
    <Overlay onClick={closeMenu}>
      <Drawer onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={closeMenu} aria-label="닫기">
          ✕
        </CloseBtn>
        <DrawerContent>
          {/* 상단: 검색창 */}
          <SearchBarWrapper>
            <SearchBar />
          </SearchBarWrapper>
          {/* 메뉴 */}
          <MenuList>
            <MenuItem>
              <Link href="/wishlist">찜</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/cart">장바구니</Link>
            </MenuItem>
            {/* 추가 메뉴 필요시 */}
          </MenuList>
          {/* 카테고리 트리 */}
          <AccordionWrapper>
            <MobileAccordion />
          </AccordionWrapper>
        </DrawerContent>
        {/* 하단 고정: 로그인/회원가입 */}
        <BottomFixed>
          {user ? (
            <LogoutButton onClick={logout}>로그아웃</LogoutButton>
          ) : (
            <>
              <DrawerLink href="/login">로그인</DrawerLink>
              <DrawerLink href="/signup">회원가입</DrawerLink>
            </>
          )}
        </BottomFixed>
      </Drawer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 3000;
  display: flex;
  justify-content: flex-end;
`;

const Drawer = styled.div`
  background: #fff;
  width: 320px;
  max-width: 90vw;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.6rem;
  border: none;
  background: none;
  cursor: pointer;
`;

const DrawerContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2.5rem 1.5rem 6rem 1.5rem; // 아래 여백은 하단 고정 메뉴용
  overflow-y: auto;
`;

const SearchBarWrapper = styled.div`
  margin-bottom: 1.2rem;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const MenuItem = styled.li`
  font-size: 1.08rem;
  a {
    color: #222;
    text-decoration: none;
  }
`;

const AccordionWrapper = styled.div`
  margin-top: 1.2rem;
`;

const BottomFixed = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1.1rem 0 1.5rem 0;
  background: #fff;
  border-top: 1px solid #eee;
`;
const LogoutButton = styled.button`
  color: #fff;
  background: #222;
  border: none;
  border-radius: ${({ theme }) => theme.radius.button};
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #333;
  }
`;
const DrawerLink = styled(Link)`
  color: #333;
  background: #f5f5f5;
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.radius.button};
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  &:hover {
    background: #ececec;
  }
`;
