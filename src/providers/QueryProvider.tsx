// src/providers/QueryProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000, // 1분: 캐시 신선
            gcTime: 5 * 60_000, // 5분: 가비지 컬렉션
            refetchOnWindowFocus: false, // 탭 전환시 재요청 방지
            retry: 1 // 실패 재시도 1회
          }
        }
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
