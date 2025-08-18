// src/components/home/HomeBanner.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

/** 배너 데이터 (원하는 대로 교체 가능) */
const banners = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    link: "/events/1",
    title: "🚀 신규 입점 기획전 OPEN",
    desc: "올여름 특가! 한정 기간 이벤트"
  },
  {
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    link: "/events/2",
    title: "🎉 회원 전용 쿠폰 증정",
    desc: "오늘 가입만 해도 10% 쿠폰 즉시 지급!"
  }
];

export default function HomeBanner() {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<number | null>(null);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const len = banners.length;

  // 뷰포트 밖/탭 비활성화 시 오토플레이 정지
  useEffect(() => {
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 인덱스 변경 시 트랙 위치 반영
  useEffect(() => {
    snapTo(index);
  }, [index]);

  // 오토플레이 (reduce-motion이면 비활성)
  useEffect(() => {
    if (reduced) return;
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduced]);

  function start() {
    stop();
    autoplayRef.current = window.setTimeout(() => {
      setIndex((i) => (i + 1) % len);
    }, 3000);
  }
  function stop() {
    if (autoplayRef.current != null) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  function snapTo(i: number) {
    const el = trackRef.current;
    if (!el) return;
    el.style.transform = `translateX(${-i * 100}%)`;
  }

  // 스와이프
  function onPointerDown(e: React.PointerEvent) {
    setDragging(true);
    stop();
    startX.current = e.clientX;
    deltaX.current = 0;
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || !trackRef.current) return;
    deltaX.current = e.clientX - startX.current;
    trackRef.current.style.transform = `translateX(calc(${-index * 100}% + ${
      deltaX.current
    }px))`;
  }
  function onPointerUp() {
    if (!dragging) return;
    setDragging(false);
    const threshold = 50; // 스와이프 최소 픽셀
    if (deltaX.current < -threshold) setIndex((i) => (i + 1) % len);
    else if (deltaX.current > threshold) setIndex((i) => (i - 1 + len) % len);
    else snapTo(index);

    deltaX.current = 0;
    if (!reduced) start();
  }

  return (
    <Carousel role="region" aria-label="프로모션 배너">
      <Viewport
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={stop}
        onMouseLeave={() => !reduced && start()}
      >
        <Track
          ref={trackRef}
          $dragging={dragging}
          style={{ transform: `translateX(${-index * 100}%)` }}
        >
          {banners.map((bn, i) => (
            <Slide key={i}>
              <ItemLink href={bn.link} aria-label={`${bn.title} – ${bn.desc}`}>
                <ImgWrap>
                  <Image
                    src={bn.img}
                    alt={bn.title}
                    fill
                    priority={i === 0} // ✅ LCP 담당
                    sizes="(max-width: 768px) 100vw, 1200px"
                    style={{ objectFit: "cover" }}
                  />
                </ImgWrap>
                <Overlay>
                  <Title>{bn.title}</Title>
                  <Desc>{bn.desc}</Desc>
                </Overlay>
              </ItemLink>
            </Slide>
          ))}
        </Track>
      </Viewport>

      <Controls aria-label="배너 컨트롤">
        <Btn
          onClick={() => setIndex((i) => (i - 1 + len) % len)}
          aria-label="이전 배너"
        >
          ‹
        </Btn>
        <Dots>
          {banners.map((_, i) => (
            <Dot
              key={i}
              aria-label={`${i + 1}번째 배너`}
              aria-current={index === i}
              $active={index === i}
              onClick={() => setIndex(i)}
            />
          ))}
        </Dots>
        <Btn
          onClick={() => setIndex((i) => (i + 1) % len)}
          aria-label="다음 배너"
        >
          ›
        </Btn>
      </Controls>
    </Carousel>
  );
}

/** OS 접근성 설정 반영 */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const run = () => setReduced(mq.matches);
    run();
    mq.addEventListener?.("change", run);
    return () => mq.removeEventListener?.("change", run);
  }, []);
  return reduced;
}

/* ---------- styles (필요 최소한) ---------- */
const Carousel = styled.section`
  width: 100%;
`;
const Viewport = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow};
  height: 260px;
`;
const Track = styled.div<{ $dragging: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: ${({ $dragging }) =>
    $dragging ? "none" : "transform 380ms ease"};
`;
const Slide = styled.div`
  position: relative;
  flex: 0 0 100%;
  height: 100%;
`;
const ItemLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
`;
const ImgWrap = styled.div`
  position: absolute;
  inset: 0;
`;
const Overlay = styled.div`
  position: absolute;
  left: 1.6rem;
  bottom: 2.1rem;
  z-index: 1;
  color: #fff;
  background: rgba(30, 36, 51, 0.22);
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1.1rem 1.6rem 1.3rem;
  box-shadow: ${({ theme }) => theme.shadow};
  @media (max-width: 600px) {
    left: 0.7rem;
    right: 0.7rem;
    padding: 0.7rem 1rem;
  }
`;
const Title = styled.div`
  font-size: 1.38rem;
  font-weight: 700;
  margin-bottom: 0.44rem;
`;
const Desc = styled.div`
  font-size: 1rem;
  opacity: 0.96;
`;
const Controls = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const Btn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`;
const Dots = styled.div`
  display: flex;
  gap: 6px;
`;
const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  margin-top: 4px;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.text : theme.colors.gray600};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
`;
