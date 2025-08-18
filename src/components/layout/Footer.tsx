// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import styled from "styled-components";

export default function Footer() {
  return (
    <Foot role="contentinfo">
      <Inner>
        <BrandArea>
          <strong>My Commerce Demo</strong>
          <Small>© {new Date().getFullYear()} 김민겸 포트폴리오</Small>
          <Small>
            문의: <a href="mailto:h24breaker@naver.com">h24breaker@naver.com</a>
          </Small>
        </BrandArea>

        <NavArea aria-label="푸터 내 사이트 탐색">
          <Col>
            <ColTitle>서비스</ColTitle>
            <Ul>
              <Li>
                <FooterLink href="/products">상품</FooterLink>
              </Li>
              <Li>
                <FooterLink href="/cart">장바구니</FooterLink>
              </Li>
              <Li>
                <FooterLink href="/wishlist">찜목록</FooterLink>
              </Li>
              <Li>
                <FooterLink href="/protected">마이페이지</FooterLink>
              </Li>
            </Ul>
          </Col>

          <Col>
            <ColTitle>프로젝트</ColTitle>
            <Ul>
              <Li>
                <FooterLink href="/start-here">Start Here</FooterLink>
              </Li>
              <Li>
                <FooterLink href="/docs/a11y-checklist">접근성 체크</FooterLink>
              </Li>
              <Li>
                <FooterLink href="/docs/tests">테스트 리포트</FooterLink>
              </Li>
            </Ul>
          </Col>

          <Col>
            <ColTitle>정책</ColTitle>
            <Ul>
              <Li>
                <FooterLink href="/not-found">약관(예시)</FooterLink>
              </Li>
              <Li>
                <FooterLink href="/not-found">개인정보(예시)</FooterLink>
              </Li>
            </Ul>
          </Col>
        </NavArea>
      </Inner>

      <BottomBar>
        <BottomInner>
          <Small>
            Built with Next.js · Styled-Components · Zustand · React Query
          </Small>
          <Small>배포 예시: Vercel</Small>
        </BottomInner>
      </BottomBar>
    </Foot>
  );
}

/* --- styles --- */
const Foot = styled.footer`
  width: 100%;
  background: #fafbfc;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 3rem;
`;

const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  min-width: ${({ theme }) => theme.size.min};
  margin: 0 auto;

  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};
  padding-top: 2rem;
  padding-bottom: 2rem;

  display: grid;
  gap: 1.6rem;
  grid-template-columns: 1.1fr 2fr;

  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const BrandArea = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

const Small = styled.div`
  color: ${({ theme }) => theme.colors.subtext};
  font-size: 0.95rem;
  margin-top: 0.3rem;
  a {
    text-decoration: underline;
  }
`;

const NavArea = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Col = styled.div``;

const ColTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const Li = styled.li`
  margin: 0.3rem 0;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: #f5f7fb;
`;

const BottomInner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  min-width: ${({ theme }) => theme.size.min};
  margin: 0 auto;

  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;

  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.subtext};
  font-size: 0.92rem;

  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    gap: 0.4rem;
  }
`;
