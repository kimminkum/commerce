"use client";

import QueryProvider from "@/providers/QueryProvider";
import GlobalStyles from "@/styles/GlobalStyles";
import SessionExpireWatcher from "@/components/SessionExpireWatcher";

// ⛔️ Header 제거 (중복 렌더 방지)
// ⛔️ ThemeProvider는 layout.tsx에서 감싸는 걸 권장

export default function ClientProviders({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <GlobalStyles />
      <SessionExpireWatcher />
      {children}
    </QueryProvider>
  );
}
