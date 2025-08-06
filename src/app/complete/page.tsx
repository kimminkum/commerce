// src/app/order/complete/page.tsx
"use client";
import styled from "styled-components";
import Link from "next/link";

export default function OrderCompletePage() {
  return (
    <Wrapper>
      <h1>주문이 완료되었습니다!</h1>
      <p>감사합니다. 마이페이지에서 주문 내역을 확인할 수 있습니다.</p>
      <BackLink href="/mypage">마이페이지로 이동</BackLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 3rem;
  text-align: center;
`;
const BackLink = styled(Link)`
  margin-top: 2rem;
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #222;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
`;
