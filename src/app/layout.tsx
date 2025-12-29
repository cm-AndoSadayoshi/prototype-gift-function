import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ソーシャルギフトアセット - デモ",
  description: "グロースパック for LINE デモ環境",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
