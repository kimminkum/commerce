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
      </head>
      <body>
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
