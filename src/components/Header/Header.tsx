"use client";
import TopBar from "./TopBar";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav";
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
      {!isMobile && <Nav />}
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
