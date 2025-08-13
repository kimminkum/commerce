"use client";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Event2Page() {
  return (
    <>
      {/* 히어로: 풀블리드 배너 (최대 1920px) */}
      <Hero>
        <HeroInner>
          <Image
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1920&q=80"
            alt="회원 전용 쿠폰"
            width={1920}
            height={360}
            priority
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </HeroInner>
      </Hero>

      {/* 본문 컨테이너 */}
      <EventWrapper>
        <Title>🎉 회원 전용 쿠폰 증정</Title>
        <SubTitle>오늘 가입만 해도 10% 쿠폰 즉시 지급!</SubTitle>

        {/* 모바일 2열 */}
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
    </>
  );
}

/* --- 스타일 --- */

const Hero = styled.div`
  width: 100%;
  margin: 0 0 1.7rem 0;
  background: transparent;
`;
const HeroInner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.bannerMax};
  margin: 0 auto;
`;

const EventWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  margin: 0 auto;
  padding: 2.5rem 0 3rem 0;
  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};

  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }
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

// 모바일 2열
const Grid = styled.div`
  display: grid;
  gap: 1.7rem;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  margin-bottom: 1.7rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 1.6rem 1.1rem;
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
