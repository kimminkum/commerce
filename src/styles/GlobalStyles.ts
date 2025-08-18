// src/styles/GlobalStyles.ts
"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/Pretendard-SemiBold.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/Pretendard-Medium.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/Pretendard-Regular.woff') format('woff');
  }
  /* 기본 박스 설정 */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 기본 폰트 및 배경색 설정 */
  html, body {
    font-family: 'Pretendard', var(--font-pretendard), 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif';
    background-color: #fff;
    color: #333;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

   :focus-visible {
    outline: 2px solid #1164F4;
    outline-offset: 2px;
  }
`;

export default GlobalStyles;
