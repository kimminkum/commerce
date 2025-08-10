// src/app/order/complete/page.tsx
"use client";

import Link from "next/link";
import styled from "styled-components";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderCompletePage() {
  const router = useRouter();

  // 선택: 3초 뒤 자동 이동
  useEffect(() => {
    const t = setTimeout(() => router.push("/protected"), 3000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <Wrap>
      <Card>
        <Emoji>✅</Emoji>
        <Title>주문이 완료되었습니다</Title>
        <Desc>마이페이지 &gt; 주문 내역에서 확인할 수 있어요.</Desc>

        <Actions>
          <ActionLink href="/">메인으로</ActionLink>
          <ActionLink href="/protected">마이페이지</ActionLink>
          <ActionLink href="/products">계속 쇼핑하기</ActionLink>
        </Actions>

        <Hint>3초 후 자동으로 마이페이지로 이동합니다…</Hint>
      </Card>
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;
const Card = styled.div`
  width: 100%;
  max-width: 520px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  box-shadow: 0 8px 28px rgba(30, 40, 60, 0.08);
  padding: 2.2rem 1.6rem;
  text-align: center;
`;
const Emoji = styled.div`
  font-size: 2.2rem;
  margin-bottom: 0.6rem;
`;
const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
`;
const Desc = styled.p`
  color: #666;
  margin-bottom: 1.2rem;
`;
const Actions = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
`;
const ActionLink = styled(Link)`
  padding: 0.6rem 1rem;
  border-radius: 8px;
  background: #f5f7fb;
  color: #222;
  font-weight: 600;
  &:hover {
    background: #ebeff7;
  }
`;
const Hint = styled.div`
  margin-top: 0.4rem;
  font-size: 0.9rem;
  color: #9aa3af;
`;
