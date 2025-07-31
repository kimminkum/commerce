// src/components/Header/Header.tsx
"use client";

import TopBar from "./TopBar";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav"; // ✅ 추가
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
  }, [isDrawerOpen]);

  return (
    <HeaderContainer>
      <TopBar
        isMobile={isMobile}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      {!isMobile && <Nav />} {/* ✅ PC에서만 GNB 보이게 */}
      {isMobile && isDrawerOpen && (
        <MobileMenu closeMenu={() => setIsDrawerOpen(false)} />
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ddd;
`;
