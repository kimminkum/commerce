// src/app/StyledComponentsRegistry.tsx
"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children
}: {
  children: React.ReactNode;
}) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    return <>{styles}</>;
  });

  // 클라이언트: 바로 통과
  if (typeof window !== "undefined") return <>{children}</>;

  // 서버: 스타일 수집
  return (
    <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
}
