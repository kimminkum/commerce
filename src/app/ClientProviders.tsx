// src/app/ClientProviders.tsx
"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme"; // ← 변경: named import
import QueryProvider from "@/providers/QueryProvider";
import GlobalStyles from "@/styles/GlobalStyles";
import SessionExpireWatcher from "@/components/SessionExpireWatcher";
import Header from "@/components/Header/Header";

export default function ClientProviders({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <QueryProvider>
        <GlobalStyles />
        <Header />
        <SessionExpireWatcher />
        {children}
      </QueryProvider>
    </ThemeProvider>
  );
}
