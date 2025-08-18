"use client";

import styled from "styled-components";

export default function Footer() {
  return (
    <FooterWrap role="contentinfo">
      <FooterInner>
        <div>
          <strong>My Commerce Demo</strong> <br />
          (c) 김민겸 포트폴리오
        </div>
        <div>
          문의: <a href="mailto:h24breaker@naver.com">h24breaker@naver.com</a>
        </div>
      </FooterInner>
    </FooterWrap>
  );
}

const FooterWrap = styled.footer`
  width: 100%;
  background: #fafbfc;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2.5rem 0 2.1rem 0;
`;

const FooterInner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  min-width: ${({ theme }) => theme.size.min};
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};

  color: ${({ theme }) => theme.colors.text};
  font-size: 1.05rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;

  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.8rem;
    font-size: 0.97rem;
    text-align: center;
  }
`;
