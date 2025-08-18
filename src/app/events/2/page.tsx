"use client";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Event2Page() {
  return (
    <EventWrapper>
      <Banner
        src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80"
        alt="회원 전용 쿠폰"
        width={1600}
        height={480}
        priority
        sizes="(max-width: 768px) 100vw, 1200px"
        quality={80}
      />
      <Title>🎉 회원 전용 쿠폰 증정</Title>
      <SubTitle>오늘 가입만 해도 10% 쿠폰 즉시 지급!</SubTitle>
      <Grid>
        <Card>
          <Image src="/banner1.jpg" width={180} height={180} alt="추천1" />
          <Name>남자 셔츠</Name>
          <Price>22.3$</Price>
        </Card>
        <Card>
          <Image src="/banner2.jpg" width={180} height={180} alt="추천2" />
          <Name>여자 자켓</Name>
          <Price>29.95$</Price>
        </Card>
        <Card>
          <Image src="/banner3.jpg" width={180} height={180} alt="추천3" />
          <Name>삼성 모니터</Name>
          <Price>999.99$</Price>
        </Card>
      </Grid>
      <Desc>
        회원 가입하고 다양한 혜택을 받아보세요!{" "}
        <Link href="/signup">회원가입 바로가기 →</Link>
      </Desc>
    </EventWrapper>
  );
}

const EventWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  min-width: ${({ theme }) => theme.size.min};
  margin: 0 auto;
  padding: 2.4rem 0 3rem 0;
  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};
  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }
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
  font-weight: 800;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
`;
const SubTitle = styled.h3`
  font-size: 1.22rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  font-weight: 600;
`;
const Grid = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ theme }) => theme.size.cardMin}, 1fr)
  );
  margin-bottom: 1.7rem;
`;
const Card = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 1.4rem 1rem;
  text-align: center;
`;
const Name = styled.div`
  margin-top: 0.9rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;
const Price = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
  margin-top: 0.3rem;
`;
const Desc = styled.div`
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1.2rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    margin-left: 0.4rem;
    text-decoration: underline;
  }
`;
