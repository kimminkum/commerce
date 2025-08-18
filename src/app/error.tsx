"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div style={{ padding: 24 }}>
      <h2>해당 페이지에서 오류가 발생했습니다.</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  );
}
