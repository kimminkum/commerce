// src/app/page.tsx
"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/** 배너 데이터 (최대 1920px) */
const bannerData = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    link: "/events/1",
    title: "🚀 신규 입점 기획전 OPEN",
    desc: "올여름 특가! 한정 기간 이벤트"
  },
  {
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1920&q=80",
    link: "/events/2",
    title: "🎉 회원 전용 쿠폰 증정",
    desc: "오늘 가입만 해도 10% 쿠폰 즉시 지급!"
  }
];

export default function HomePage() {
  return (
    <>
      {/* 배너: 화면 가득 + 중앙 정렬, 최대 1920px */}
      <BannerSection>
        <BannerInner>
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            loop
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ type: "fraction", clickable: true }}
            style={{ position: "relative" }}
          >
            {bannerData.map((bn, idx) => (
              <SwiperSlide key={idx}>
                <BannerSlide as={Link} href={bn.link}>
                  <BannerImg src={bn.img} alt={bn.title} />
                  <BannerOverlay>
                    <BannerTitle>{bn.title}</BannerTitle>
                    <BannerDesc>{bn.desc}</BannerDesc>
                  </BannerOverlay>
                </BannerSlide>
              </SwiperSlide>
            ))}
          </Swiper>
        </BannerInner>
      </BannerSection>

      {/* 본문: 1200px 컨테이너 + 좌우 여백 16/20px */}
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

      <Footer>
        <FooterInner>
          <div>
            <strong>My Commerce Demo</strong> <br />
            (c) 김민겸 포트폴리오
          </div>
          <div>문의: h24breaker@naver.com</div>
        </FooterInner>
      </Footer>
    </>
  );
}

/* --- 스타일 --- */

const BannerSection = styled.section`
  width: 100%;
  margin: 2.5rem 0 1.5rem 0;
`;
const BannerInner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.bannerMax};
  margin: 0 auto;

  .swiper {
    border-radius: ${({ theme }) => theme.radius.card};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadow};
  }

  /* 내부 pagination을 좌하단에 배치 */
  .swiper-pagination {
    position: absolute;
    left: 1.1rem;
    bottom: 1.2rem;
    width: auto;
    text-align: left;
    color: #fff;
    font-size: 1.05rem;
    font-weight: 500;
    background: rgba(30, 36, 51, 0.2);
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 0.17rem 0.9rem 0.2rem 0.9rem;
    letter-spacing: 0.06em;
  }
`;

const BannerSlide = styled(Link)`
  display: block;
  position: relative;
  min-height: 260px;
`;
const BannerImg = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
`;
const BannerOverlay = styled.div`
  position: absolute;
  left: 1.6rem;
  bottom: 2.1rem;
  z-index: 2;
  color: #fff;
  background: rgba(30, 36, 51, 0.22);
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1.1rem 1.6rem 1.3rem 1.6rem;
  box-shadow: ${({ theme }) => theme.shadow};
  @media (max-width: 600px) {
    left: 0.7rem;
    right: 0.7rem;
    padding: 0.7rem 1rem;
  }
`;
const BannerTitle = styled.div`
  font-size: 1.38rem;
  font-weight: 700;
  margin-bottom: 0.44rem;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.19);
`;
const BannerDesc = styled.div`
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.96;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.16);
`;

const Main = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};
  padding-bottom: 4.2rem;

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
  margin: 2.4rem 0 2.6rem 0;
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

/* 오늘의 추천: 모바일 2열 */
const CardsGrid = styled.div`
  display: grid;
  gap: 1.7rem;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
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

const Footer = styled.footer`
  width: 100%;
  background: #fafbfc;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2.5rem 0 2.1rem 0;
`;
const FooterInner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.max};
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.size.gutterMobile};
  padding-right: ${({ theme }) => theme.size.gutterMobile};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.05rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;

  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.size.gutterDesktop};
    padding-right: ${({ theme }) => theme.size.gutterDesktop};
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.8rem;
    font-size: 0.97rem;
    text-align: center;
  }
`;
