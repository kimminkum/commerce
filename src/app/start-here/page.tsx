"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export default function StartHerePage() {
  return (
    <Wrap>
      <Hero>
        <h1>Review First — 5분 컷 ✅</h1>
        <p>채용 리뷰어가 바로 보면 좋은 핵심 산출물 Top 5</p>
      </Hero>

      <Flex>
        <Card>
          <h3>1) 성능·SEO 리포트</h3>
          <p>Lighthouse Desktop/Mobile 90+ 스냅샷 및 측정일자</p>
          <BtnRow>
            <A href="/reports/lh-desktop.png" target="_blank" rel="noreferrer">
              Desktop
            </A>
            <A href="/reports/lh-mobile.png" target="_blank" rel="noreferrer">
              Mobile
            </A>
            <LinkBtn href="https://vercel.com/analytics" target="_blank">
              Vercel Analytics
            </LinkBtn>
          </BtnRow>
          <Thumb>
            <Image
              src="/reports/lh-mobile.png"
              alt="Lighthouse Mobile"
              fill
              sizes="320px"
            />
          </Thumb>
        </Card>

        <Card>
          <h3>2) 접근성 체크</h3>
          <p>키보드 탐색/포커스/대비/모달 트랩 점검표</p>
          <BtnRow>
            <LinkBtn href="/docs/a11y-checklist">Checklist</LinkBtn>
          </BtnRow>
        </Card>

        <Card>
          <h3>3) 테스트 리포트</h3>
          <p>핵심 여정 E2E(장바구니→주문) & 스토어 유닛</p>
          <BtnRow>
            <LinkBtn href="/docs/tests">Test Summary</LinkBtn>
          </BtnRow>
        </Card>

        <Card>
          <h3>4) 핵심 코드 Top 3</h3>
          <ul>
            <li>
              <code>store/cartStore.ts</code> — 수량/합계/퍼시스트
            </li>
            <li>
              <code>components/Header/*</code> — PC/MO 네비, 드로어
            </li>
            <li>
              <code>app/page.tsx</code> — 배너, 컨테이너 토큰화
            </li>
          </ul>
        </Card>

        <Card>
          <h3>5) 아키텍처 다이어그램</h3>
          <p>상태/데이터 흐름 한 장 요약</p>
          <BtnRow>
            <A href="/docs/architecture.svg" target="_blank" rel="noreferrer">
              Open Diagram
            </A>
          </BtnRow>
        </Card>
      </Flex>
    </Wrap>
  );
}

const Wrap = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  min-width: ${({ theme }) => theme.size.min};
  margin: 0 auto;
  padding: 2rem ${({ theme }) => theme.size.gutterMobile} 3rem;
  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }
`;
const Hero = styled.header`
  margin-bottom: 1.4rem;
  h1 {
    font-size: 1.8rem;
    font-weight: 800;
  }
  p {
    color: ${({ theme }) => theme.colors.subtext};
    margin-top: 0.4rem;
  }
`;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Card = styled.article`
  width: 100%;
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 1rem 1rem 1.1rem;
  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
  }
  p {
    color: ${({ theme }) => theme.colors.subtext};
    margin-bottom: 0.6rem;
  }
  ul {
    margin-left: 1rem;
    list-style: disc;
    color: ${({ theme }) => theme.colors.text};
  }
`;
const BtnRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
`;
const A = styled.a`
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.4rem 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`;
const LinkBtn = styled(Link)<{ target?: string }>`
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.4rem 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`;
const Thumb = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  border: 1px dashed ${({ theme }) => theme.colors.border};
`;
