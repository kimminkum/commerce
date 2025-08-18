"use client";
import Script from "next/script";

export default function StructuredData() {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://kmkcommerce.vercel.app";
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "My Commerce Demo",
    url: base,
    logo: `${base}/og-default.png`
  };
  return (
    <Script
      id="ld-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
    />
  );
}
