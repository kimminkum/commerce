// src/components/Header/Nav.tsx
"use client";

import styled from "styled-components";
import Link from "next/link";
import NavDropdown from "./NavDropdown";

export default function Nav() {
  return (
    <NavContainer>
      <NavList>
        <NavDropdown />
        <NavItem href="/wishlist">찜</NavItem>
        <NavItem href="/cart">장바구니</NavItem>
      </NavList>
    </NavContainer>
  );
}

// 스타일 컴포넌트

const NavContainer = styled.nav`
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const NavList = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavItem = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;
