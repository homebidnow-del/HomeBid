import type { ReactNode } from "react";

export const metadata = {
  title: "HomeBid",
  description: "HomeBid platform",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
