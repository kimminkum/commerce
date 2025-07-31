// src/styles/GlobalStyles.ts
"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* 기본 박스 설정 */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 기본 폰트 및 배경색 설정 */
  html, body {
    font-family: 'Pretendard', sans-serif;
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
`;

export default GlobalStyles;
