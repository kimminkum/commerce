"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// 샘플 배너 이미지
const bannerData = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    link: "/events/1",
    title: "🚀 신규 입점 기획전 OPEN",
    desc: "올여름 특가! 한정 기간 이벤트"
  },
  {
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    link: "/events/2",
    title: "🎉 회원 전용 쿠폰 증정",
    desc: "오늘 가입만 해도 10% 쿠폰 즉시 지급!"
  }
];

export default function HomePage() {
  return (
    <>
      <Main>
        {/* 배너 Swiper */}
        <BannerSection>
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{
              type: "fraction",
              clickable: true,
              el: ".banner-swiper-pagination"
            }}
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
            <BannerPagination className="banner-swiper-pagination" />
          </Swiper>
        </BannerSection>

        {/* 이벤트 퀵 바로 연결 (별도 영역) */}
        <EventQuick>
          <EventLink href="/events/1">신상품 프로모션</EventLink>
          <EventLink href="/events/2">오늘의 특가 이벤트</EventLink>
        </EventQuick>

        {/* 카테고리/추천 등 대형 이커머스 스타일 샘플 */}
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
          <FlexRow>
            <ProductCard>
              <Image
                src="/banner1.jpg"
                alt="남자 셔츠"
                width={90}
                height={90}
                style={{
                  objectFit: "contain",
                  borderRadius: "7px",
                  marginBottom: "1.1rem"
                }}
                priority
              />
              <div>남자 셔츠</div>
              <div className="price">22.3$</div>
            </ProductCard>
            <ProductCard>
              <Image
                src="/banner2.jpg"
                alt="여성 자켓"
                width={90}
                height={90}
                style={{
                  objectFit: "contain",
                  borderRadius: "7px",
                  marginBottom: "1.1rem"
                }}
                priority
              />
              <div>여성 자켓 </div>
              <div className="price">29.95$</div>
            </ProductCard>
            <ProductCard>
              <Image
                src="/banner3.jpg"
                alt="삼성 모니터"
                width={90}
                height={90}
                style={{
                  objectFit: "contain",
                  borderRadius: "7px",
                  marginBottom: "1.1rem"
                }}
                priority
              />
              <div>삼성 49인치 모니터</div>
              <div className="price">999.99$</div>
            </ProductCard>
          </FlexRow>
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
            (c) 2025 토끼 만렙
          </div>
          <div>
            <a href="mailto:contact@mycommerce.com">
              문의: contact@mycommerce.com
            </a>
          </div>
        </FooterInner>
      </Footer>
    </>
  );
}

// --- 스타일 --- //
const Main = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding-bottom: 4.2rem;
`;

const BannerSection = styled.section`
  margin: 2.5rem 0 1.5rem 0;
  position: relative;
  .swiper {
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 8px 32px 0 rgba(40, 50, 80, 0.08);
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

const EventQuick = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.1rem;
  margin-bottom: 1.5rem;
`;
const EventLink = styled(Link)`
  background: #f5f7fb;
  color: #222;
  padding: 0.55rem 1.3rem;
  border-radius: 7px;
  font-weight: 600;
  font-size: 1.05rem;
  box-shadow: 0 2px 8px rgba(120, 130, 160, 0.04);
  transition: background 0.14s;
  &:hover {
    background: #ebeff7;
  }
`;
const BannerPagination = styled.div`
  position: absolute;
  left: 1.1rem;
  bottom: 1.2rem;
  z-index: 10;
  color: #fff;
  .swiper-pagination-fraction {
    font-size: 1.05rem;
    font-weight: 500;
    background: rgba(30, 36, 51, 0.2);
    border-radius: 7px;
    padding: 0.17rem 0.9rem 0.2rem 0.9rem;
    letter-spacing: 0.06em;
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
  background: #f9faff;
  border-radius: 13px;
  box-shadow: 0 2px 8px rgba(120, 130, 160, 0.04);
  font-weight: 600;
  font-size: 1.07rem;
  color: #1d2951;
  text-align: center;
  transition: background 0.14s;
  &:hover {
    background: #f1f7ff;
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1.7rem;
  flex-wrap: wrap;
`;
const ProductCard = styled.div`
  flex: 1 1 190px;
  min-width: 180px;
  max-width: 230px;
  background: #fff;
  border: 1px solid #e6e9f1;
  border-radius: 11px;
  box-shadow: 0 2px 14px 0 rgba(110, 120, 140, 0.04);
  padding: 1.2rem 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 90px;
    height: 90px;
    object-fit: contain;
    border-radius: 7px;
    margin-bottom: 1.1rem;
  }
  .price {
    color: #1164f4;
    font-weight: bold;
    margin-top: 0.4rem;
  }
`;

const QuickNav = styled.div`
  display: flex;
  gap: 1.3rem;
  flex-wrap: wrap;
  margin-top: 0.9rem;
`;
const QuickLink = styled(Link)`
  background: #fafafd;
  color: #223;
  border-radius: 7px;
  padding: 0.65rem 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.14s;
  &:hover {
    background: #e6eef7;
  }
`;

const Footer = styled.footer`
  width: 100%;
  background: #fafbfc;
  border-top: 1px solid #eee;
  padding: 2.5rem 0 2.1rem 0;
`;
const FooterInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  color: #222;
  font-size: 1.05rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.8rem;
    font-size: 0.97rem;
    text-align: center;
  }
`;
const BannerOverlay = styled.div`
  position: absolute;
  left: 1.6rem;
  bottom: 2.1rem;
  z-index: 2;
  color: #fff;
  background: rgba(30, 36, 51, 0.22);
  border-radius: 10px;
  padding: 1.1rem 1.6rem 1.3rem 1.6rem;
  box-shadow: 0 2px 16px rgba(20, 24, 40, 0.18);
  @media (max-width: 600px) {
    left: 0.7rem;
    right: 0.7rem;
    padding: 0.7rem 1rem;
  }
`;
