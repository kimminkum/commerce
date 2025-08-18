"use client";

import QueryProvider from "@/providers/QueryProvider";
import GlobalStyles from "@/styles/GlobalStyles";
import SessionExpireWatcher from "@/components/SessionExpireWatcher";

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
