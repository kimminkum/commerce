"use client";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Event2Page() {
  return (
    <EventWrapper>
      <Banner
        src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80"
        alt="회원 전용 쿠폰"
        width={900}
        height={270}
        priority
      />
      <Title>🎉 회원 전용 쿠폰 증정</Title>
      <SubTitle>오늘 가입만 해도 10% 쿠폰 즉시 지급!</SubTitle>
      <Grid>
        <ProductCard>
          <Image src="/banner1.jpg" width={180} height={180} alt="추천1" />
          <ProdName>남자 셔츠</ProdName>
          <ProdPrice>22.3$</ProdPrice>
        </ProductCard>
        <ProductCard>
          <Image src="/banner2.jpg" width={180} height={180} alt="추천2" />
          <ProdName>여자 자켓</ProdName>
          <ProdPrice>29.95$</ProdPrice>
        </ProductCard>
        <ProductCard>
          <Image src="/banner3.jpg" width={180} height={180} alt="추천3" />
          <ProdName>삼성 모니터</ProdName>
          <ProdPrice>999.99$</ProdPrice>
        </ProductCard>
      </Grid>
      <Desc>
        회원 가입하고 다양한 혜택을 받아보세요!
        <br />
        <Link href="/signup">회원가입 바로가기 →</Link>
      </Desc>
    </EventWrapper>
  );
}

const EventWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.2rem 3rem 1.2rem;
`;
const Banner = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.card};
  margin-bottom: 1.7rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
`;
const SubTitle = styled.h3`
  font-size: 1.22rem;
  color: ${({ theme }) => theme.colors.primary};
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
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow};
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
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.08rem;
  margin-bottom: 0.4rem;
`;
const ProdPrice = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: 1.02rem;
`;
const Desc = styled.div`
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1.3rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.05rem;
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    margin-left: 7px;
    text-decoration: underline;
  }
`;
