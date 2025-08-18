export default function Loading() {
  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          height: 260,
          borderRadius: 12,
          background:
            "linear-gradient(90deg,#f6f7f8 25%,#edeef1 37%,#f6f7f8 63%)",
          backgroundSize: "400% 100%",
          animation: "shimmer 1.1s infinite linear"
        }}
      />
      <style>{`
        @keyframes shimmer { 0%{background-position:100% 0} 100%{background-position:-100% 0} }
      `}</style>
    </div>
  );
}
