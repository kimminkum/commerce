// src/app/page.tsx
"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import HomeBanner from "@/components/home/HomeBanner";

export default function HomePage() {
  return (
    <>
      {/* 배너 */}
      <BannerSection>
        <BannerInner>
          <HomeBanner />
        </BannerInner>
      </BannerSection>

      {/* 본문 */}
      <Main>
        <EventQuick>
          <EventLink href="/events/1">신상품 프로모션</EventLink>
          <EventLink href="/events/2">오늘의 특가 이벤트</EventLink>
        </EventQuick>

        <MainSection>
          <SectionTitle>🔥 인기 카테고리 바로가기</SectionTitle>
          <CategoryGrid>
            <CatCard href="/products/category/women">여성의류</CatCard>
            <CatCard href="/products/category/men">남성의류</CatCard>
            <CatCard href="/products/category/electronics">전자제품</CatCard>
            <CatCard href="/products/category/jewelery">쥬얼리</CatCard>
            <CatCard href="/products">전체상품</CatCard>
          </CategoryGrid>
        </MainSection>

        <MainSection>
          <SectionTitle>💎 오늘의 추천 상품</SectionTitle>
          <CardsGrid>
            <ProductCard>
              <CardImg
                src="/banner1.jpg"
                alt="남자 셔츠"
                width={90}
                height={90}
                loading="lazy"
              />
              <div>남자 셔츠</div>
              <div className="price">22.3$</div>
            </ProductCard>
            <ProductCard>
              <CardImg
                src="/banner2.jpg"
                alt="여성 자켓"
                width={90}
                height={90}
                loading="lazy"
              />
              <div>여성 자켓</div>
              <div className="price">29.95$</div>
            </ProductCard>
            <ProductCard>
              <CardImg
                src="/banner3.jpg"
                alt="삼성 모니터"
                width={90}
                height={90}
                loading="lazy"
              />
              <div>삼성 49인치 모니터</div>
              <div className="price">999.99$</div>
            </ProductCard>
          </CardsGrid>
        </MainSection>

        <MainSection>
          <SectionTitle>🚀 빠른 서비스 이동</SectionTitle>
          <QuickNav>
            <QuickLink href="/cart">장바구니</QuickLink>
            <QuickLink href="/wishlist">찜목록</QuickLink>
            <QuickLink href="/protected">마이페이지</QuickLink>
            <QuickLink href="/search">상품검색</QuickLink>
          </QuickNav>
        </MainSection>
      </Main>
    </>
  );
}

/* --- styles 그대로 --- */
const BannerSection = styled.section`
  width: 100%;
  margin: 2.5rem 0 1.5rem;
`;
const BannerInner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.bannerMax};
  min-width: ${({ theme }) => theme.size.min};
  margin: 0 auto;
  .swiper {
    border-radius: ${({ theme }) => theme.radius.card};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadow};
  }
`;
const Main = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  min-width: ${({ theme }) => theme.size.min};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.size.gutterMobile} 4.2rem;
  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }
`;
const EventQuick = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.1rem;
  margin-bottom: 1.5rem;
`;
const EventLink = styled(Link)`
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.55rem 1.3rem;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: background 0.14s;
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`;
const MainSection = styled.section`
  margin: 2.4rem 0 2.6rem;
`;
const SectionTitle = styled.h2`
  font-size: 1.23rem;
  font-weight: 700;
  margin-bottom: 1.3rem;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
`;
const CategoryGrid = styled.div`
  display: flex;
  gap: 1.6rem;
  flex-wrap: wrap;
`;
const CatCard = styled(Link)`
  flex: 1 1 140px;
  min-width: 120px;
  max-width: 180px;
  padding: 1.2rem 0.7rem;
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow};
  font-weight: 600;
  font-size: 1.07rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  transition: background 0.14s;
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`;
const CardsGrid = styled.div`
  display: grid;
  gap: 1.7rem;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ theme }) => theme.size.cardMin}, 1fr)
  );
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 1.2rem 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .price {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    margin-top: 0.4rem;
  }
`;
const CardImg = styled(Image)`
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: 1.1rem;
`;
const QuickNav = styled.div`
  display: flex;
  gap: 1.3rem;
  flex-wrap: wrap;
  margin-top: 0.9rem;
`;
const QuickLink = styled(Link)`
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.65rem 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.14s;
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`;
