// src/app/docs/tests/page.tsx
"use client";

import styled from "styled-components";
import Link from "next/link";

export default function TestsSummaryPage() {
  return (
    <Wrap>
      <h1>테스트 요약</h1>
      <Section>
        <h2>유닛 (Vitest)</h2>
        <ul>
          <li>
            Zustand <code>cartStore</code> – 수량/추가/삭제 로직
          </li>
          <li>계산 유틸(합계/배송비 임계치) – 경계값 테스트</li>
        </ul>
        <p>
          예시 코드: <code>tests/cartStore.test.ts</code>
        </p>
      </Section>

      <Section>
        <h2>E2E (Playwright)</h2>
        <ul>
          <li>홈 → 상품 → 장바구니 담기 → 장바구니 수량 변경 → 주문 완료</li>
        </ul>
        <p>
          예시 코드: <code>e2e/cart-order.spec.ts</code>
        </p>
      </Section>

      <Section>
        <h2>CI</h2>
        <p>
          GitHub Actions에서 <code>lint</code>/<code>typecheck</code>/
          <code>test</code>/<code>build</code> 자동화, PR마다 체크 제공.
        </p>
        <p>
          워크플로: <code>.github/workflows/ci.yml</code>
        </p>
      </Section>

      <Links>
        <Link href="/start-here">← Start Here로 돌아가기</Link>
      </Links>
    </Wrap>
  );
}

const Wrap = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
`;
const Section = styled.section`
  margin: 1.25rem 0;
  h2 {
    font-size: 1.15rem;
    margin-bottom: 0.45rem;
  }
  code {
    background: #f6f7fb;
    padding: 0.1rem 0.3rem;
    border-radius: 6px;
  }
`;
const Links = styled.div`
  margin-top: 1.2rem;
  a {
    text-decoration: underline;
  }
`;
