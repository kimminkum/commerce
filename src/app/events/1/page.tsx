"use client";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Event1Page() {
  return (
    <EventWrapper>
      <Image
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
        alt="신상품 BIG 이벤트"
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
      <Title>🔥 2025 신상품 프로모션 – 오늘만 특가!</Title>
      <SubTitle>아마존 & 11번가 스타일로 구성한 베스트 아이템</SubTitle>
      <Grid>
        <ProductCard>
          <Image src="/banner1.jpg" width={180} height={180} alt="신상1" />
          <ProdName>남자 셔츠</ProdName>
          <ProdPrice>22.3$</ProdPrice>
        </ProductCard>
        <ProductCard>
          <Image src="/banner2.jpg" width={180} height={180} alt="신상2" />
          <ProdName>여자 자켓</ProdName>
          <ProdPrice>29.95$</ProdPrice>
        </ProductCard>
        <ProductCard>
          <Image src="/banner3.jpg" width={180} height={180} alt="신상3" />
          <ProdName>삼성 모니터</ProdName>
          <ProdPrice>999.99$</ProdPrice>
        </ProductCard>
      </Grid>
      <Desc>
        다양한 인기 신상품을 <strong>최대 60% 할인</strong>으로 만나보세요!
        <br />
        <Link href="/products">전체 상품 바로가기 →</Link>
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
const SubTitle = styled.h3`
  font-size: 1.22rem;
  color: #1164f4;
  margin-bottom: 2rem;
  font-weight: 500;
`;
const Grid = styled.div`
  display: flex;
  gap: 2.2rem;
  flex-wrap: wrap;
  margin-bottom: 1.7rem;
`;
const ProductCard = styled.div`
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
const ProdName = styled.div`
  margin-top: 1.1rem;
  font-weight: 600;
  color: #2e3453;
  font-size: 1.08rem;
  margin-bottom: 0.4rem;
`;
const ProdPrice = styled.div`
  color: #1164f4;
  font-weight: bold;
  font-size: 1.02rem;
`;
const Desc = styled.div`
  margin-top: 2rem;
  background: #f6fafd;
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
