// src/app/layout.tsx

import Header from "@/components/Header/Header";
import QueryProvider from "@/providers/QueryProvider";
import GlobalStyles from "@/styles/GlobalStyles";
import SessionExpireWatcher from "@/components/SessionExpireWatcher";

export const metadata = {
  title: "My Commerce App",
  description: "My shopping app built with Next.js"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <GlobalStyles />
          <Header />
          <SessionExpireWatcher />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
