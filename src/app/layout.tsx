// src/app/layout.tsx
export const metadata = {
  title: "My Commerce App",
  description: "My shopping app built with Next.js"
};

import StyledComponentsRegistry from "./StyledComponentsRegistry";
import ClientProviders from "./ClientProviders";
import Header from "@/components/Header/Header";
import Footer from "@/components/layout/Footer";
import ThemeProviderClient from "./ThemeProviderClient";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 프리로드는 GlobalStyles의 실제 포맷과 맞추세요(woff/woff2 중 하나로 통일) */}
        <link
          rel="preload"
          as="font"
          href="/fonts/Pretendard-Regular.woff"
          type="font/woff"
          crossOrigin="anonymous"
        />
        {/* 스킵링크 전역 스타일(간단/안전하게 head에 둡니다) */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .skip-link {
                position: absolute;
                left: -9999px;
                top: auto;
                z-index: 1000;
              }
              .skip-link:focus {
                left: 16px;
                top: 16px;
                background: #000;
                color: #fff;
                padding: 8px 12px;
                border-radius: 8px;
                border: 2px solid #000;
                outline: none;
              }
            `
          }}
        />
      </head>
      <body>
        <a href="#maincontent" className="skip-link">
          본문 바로가기
        </a>

        <StyledComponentsRegistry>
          <ThemeProviderClient>
            <Header />
            <ClientProviders>{children}</ClientProviders>
            <Footer />
          </ThemeProviderClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
