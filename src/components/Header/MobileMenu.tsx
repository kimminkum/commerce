import Link from "next/link";
import styled from "styled-components";
import MobileAccordion from "./MobileAccordion";

interface Props {
  closeMenu: () => void;
}

export default function MobileMenu({ closeMenu }: Props) {
  return (
    <DrawerOverlay onClick={closeMenu}>
      <Drawer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeMenu}>✕</CloseButton>

        {/* 일반 메뉴 */}
        <DrawerLink href="/wishlist">찜</DrawerLink>
        <DrawerLink href="/cart">장바구니</DrawerLink>
        <DrawerLink href="/login">로그인</DrawerLink>

        {/* 상품 아코디언 */}
        <MobileAccordion />
      </Drawer>
    </DrawerOverlay>
  );
}

const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
  display: flex;
  justify-content: flex-end;
`;

const Drawer = styled.div`
  width: 240px;
  height: 100%;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DrawerLink = styled(Link)`
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  color: #333;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
`;
