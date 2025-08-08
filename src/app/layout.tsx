import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header/Header";
import QueryProvider from "@/providers/QueryProvider";
import GlobalStyles from "@/styles/GlobalStyles";
import SessionExpireWatcher from "@/components/SessionExpireWatcher"; // ✅추가

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
