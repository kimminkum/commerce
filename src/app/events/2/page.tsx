"use client";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Event2Page() {
  return (
    <EventWrapper>
      <Image
        src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80"
        alt="오늘의 특가 딜"
        width={900}
        height={270}
        style={{
          borderRadius: 16,
          width: "100%",
          height: "auto",
          objectFit: "cover",
          marginBottom: "1.7rem"
        }}
        priority
      />
      <Title>💡 오늘의 초특가 한정 이벤트</Title>
      <DealSection>
        <DealCard>
          <Image src="/banner1.jpg" width={180} height={180} alt="딜1" />
          <DealName>남성 셔츠</DealName>
          <DealDiscount>50% 할인</DealDiscount>
          <DealPrice>11.15$</DealPrice>
        </DealCard>
        <DealCard>
          <Image src="/banner3.jpg" width={180} height={180} alt="딜2" />
          <DealName>생활가전 핸디청소기</DealName>
          <DealDiscount>30% 할인</DealDiscount>
          <DealPrice>700$</DealPrice>
        </DealCard>
      </DealSection>
      <Desc>
        한정 수량, 한정 특가로 <strong>놓치지 마세요!</strong>
        <br />
        <Link href="/products">전체 상품 더 보러 가기 →</Link>
      </Desc>
    </EventWrapper>
  );
}

// --- 스타일 컴포넌트 동일 (생략) ---

// --- 스타일 ---
const EventWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.2rem 3rem 1.2rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #2e3453;
`;
const DealSection = styled.div`
  display: flex;
  gap: 2.2rem;
  flex-wrap: wrap;
  margin-bottom: 1.7rem;
`;
const DealCard = styled.div`
  background: #fff;
  border-radius: 11px;
  box-shadow: 0 2px 14px 0 rgba(110, 120, 140, 0.08);
  padding: 1.6rem 1.1rem;
  min-width: 190px;
  max-width: 210px;
  flex: 1 1 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DealName = styled.div`
  margin-top: 1.1rem;
  font-weight: 600;
  color: #222c4e;
  font-size: 1.08rem;
  margin-bottom: 0.2rem;
`;
const DealDiscount = styled.div`
  color: #e14747;
  font-weight: bold;
  margin-top: 0.3rem;
  font-size: 0.99rem;
`;
const DealPrice = styled.div`
  color: #1164f4;
  font-weight: bold;
  font-size: 1.05rem;
  margin-top: 0.2rem;
`;
const Desc = styled.div`
  margin-top: 2rem;
  background: #f8fbfd;
  border-radius: 12px;
  padding: 1.3rem 1rem;
  color: #333;
  font-size: 1.05rem;
  a {
    color: #1164f4;
    font-weight: 600;
    margin-left: 7px;
    text-decoration: underline;
  }
`;
