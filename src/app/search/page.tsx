// src/app/search/page.tsx
import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "2rem", textAlign: "center" }}>검색 중...</div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
