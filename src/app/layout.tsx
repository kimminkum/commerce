// src/app/layout.tsx
export const metadata = {
  title: "My Commerce App",
  description: "My shopping app built with Next.js"
};

import ClientProviders from "./ClientProviders";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
