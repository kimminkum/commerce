"use client";
export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ padding: 24 }}>
        <h2>문제가 발생했어요 😢</h2>
        <p style={{ color: "#666" }}>{error.message}</p>
        <button onClick={() => reset()}>다시 시도</button>
      </body>
    </html>
  );
}
