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
    sectionTop: "2.4rem",
    gridGap: "1.5rem",
    xs: "6px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px"
  },
  size: {
    productImgH: "200px",
    cartImgH: "84px",
    containerMax: "1200px"
  },
  zIndex: { header: 1000, summaryBar: 900 }
};
export type AppTheme = typeof theme;
