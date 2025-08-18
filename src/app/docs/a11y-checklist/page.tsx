// src/app/docs/a11y-checklist/page.tsx
"use client";

import styled from "styled-components";

export default function A11yChecklistPage() {
  return (
    <Wrap>
      <h1>접근성 1차 체크리스트</h1>

      <Section>
        <h2>키보드 탐색</h2>
        <Ul>
          <li>
            스킵 링크 제공(✓) – <code>SkipLink</code> + <code>main#main</code>
          </li>
          <li>
            포커스 링 표시(✓) – <code>:focus-visible</code> 글로벌 스타일
          </li>
          <li>모달(모바일 드로어) 포커스 트랩(△) – 추후 trap 추가 예정</li>
        </Ul>
      </Section>

      <Section>
        <h2>ARIA</h2>
        <Ul>
          <li>
            검색 폼{" "}
            <code>
              role={'"'}search{'"'}
            </code>
            , 버튼 <code>aria-label</code> 적용(✓)
          </li>
          <li>
            네비게이션 <code>nav</code>와 <code>aria-label</code> 구분(△)
          </li>
          <li>
            드롭다운/드로어 <code>aria-expanded</code>, ESC 닫기(△)
          </li>
        </Ul>
      </Section>

      <Section>
        <h2>대비/문자</h2>
        <Ul>
          <li>본문 대비 4.5:1 이상(✓, 테마 컬러 기준)</li>
          <li>폰트 가독성(✓) – 시스템 폰트 fallback + Pretendard</li>
        </Ul>
      </Section>

      <Note>△ 항목은 보완 예정 포인트로 README의 “Roadmap”에 명시합니다.</Note>
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
`;
const Ul = styled.ul`
  padding-left: 1.1rem;
  li {
    list-style: disc;
    margin: 0.3rem 0;
  }
  code {
    background: #f6f7fb;
    padding: 0.1rem 0.3rem;
    border-radius: 6px;
  }
`;
const Note = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.subtext};
`;
