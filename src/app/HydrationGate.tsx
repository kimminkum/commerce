// src/app/layout.tsx

export const metadata = {
  title: "My Commerce App",
  description: "My shopping app built with Next.js"
};

import StyledComponentsRegistry from "./StyledComponentsRegistry";
import ClientProviders from "./ClientProviders";

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
          href="/fonts/Pretendard.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ClientProviders>{children}</ClientProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
