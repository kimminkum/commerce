// src/styles/theme.ts
export const theme = {
  colors: {
    primary: "#1164F4",
    primaryHover: "#0033A5",
    gray100: "#F6F7FA",
    gray200: "#E6E9F1",
    text: "#111111",
    subtext: "#555",
    border: "#E6E9F1",
    danger: "#E5484D",
    bg: "#FFFFFF"
  },
  // ✅ 실무형 값
  radius: {
    card: "16px",
    button: "12px",
    sm: "4px",
    md: "8px"
  },
  shadow: "0 2px 14px rgba(110,120,140,0.07)",
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px", // 모바일 기본 좌우 여백
    xl: "20px", // 데스크톱 좌우 여백
    "2xl": "24px"
  },
  size: {
    max: "1200px", // 컨텐츠 폭
    gutterMobile: "16px",
    gutterDesktop: "20px",
    bannerMax: "1920px" // 배너 최대 폭
  },
  zIndex: { header: 1000, summaryBar: 900 }
};
export type AppTheme = typeof theme;
