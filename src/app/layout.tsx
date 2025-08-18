// src/app/layout.tsx
export const metadata = {
  title: "My Commerce App",
  description: "My shopping app built with Next.js",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://kmkcommerce.vercel.app"
  ),
  openGraph: {
    title: "My Commerce Demo",
    description: "포트폴리오용 Next.js 커머스 데모",
    url: "/",
    siteName: "My Commerce Demo",
    images: [
      { url: "/og-default.png", width: 1200, height: 630, alt: "My Commerce" }
    ],
    locale: "ko_KR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "My Commerce Demo",
    description: "포트폴리오용 Next.js 커머스 데모",
    images: ["/og-default.png"]
  }
};

import StyledComponentsRegistry from "./StyledComponentsRegistry";
import ClientProviders from "./ClientProviders";
import Header from "@/components/Header/Header";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/StructuredData";
import SkipLink from "@/components/a11y/SkipLink";

// ⬇️ 클라이언트 전용 테마 래퍼 사용(서버에서 직접 ThemeProvider 쓰지 않음)
import ThemeProviderClient from "./ThemeProviderClient";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preload"
          as="font"
          href="/fonts/Pretendard-Regular.woff"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fakestoreapi.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProviderClient>
            <SkipLink />
            <Header />
            <StructuredData />
            <ClientProviders>
              <main id="main">{children}</main>
            </ClientProviders>
            <Footer />
          </ThemeProviderClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
