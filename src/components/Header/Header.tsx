// src/components/Header/Header.tsx
"use client";
import dynamic from "next/dynamic"; // ✅ 추가
import TopBar from "./TopBar";
// import MobileMenu from "./MobileMenu";        // ❌ 제거
// import Nav from "./Nav";                      // ❌ 제거
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuthExpire } from "@/hooks/useAuthExpire";

// ✅ 필요할 때만 로드(클라 전용)
const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });
const Nav = dynamic(() => import("./Nav"), { ssr: false });

export default function Header() {
  useAuthExpire();
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
      {!isMobile && <Nav />}
      {isMobile && isDrawerOpen && (
        <MobileMenu
          id="mobile-drawer"
          closeMenu={() => setIsDrawerOpen(false)}
        />
      )}
    </HeaderContainer>
  );
}
const HeaderContainer = styled.header`
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ddd;
`;
