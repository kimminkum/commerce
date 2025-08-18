"use client";
import styled from "styled-components";

export default function SkipLink() {
  return <A href="#main">본문으로 건너뛰기</A>;
}

const A = styled.a`
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  &:focus {
    position: fixed;
    left: 16px;
    top: 16px;
    width: auto;
    height: auto;
    padding: 0.6rem 1rem;
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border-radius: ${({ theme }) => theme.radius.md};
    z-index: 9999;
    outline: none;
  }
`;
