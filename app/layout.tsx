import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Notion Workshop - Belajar Notion untuk Pemula",
  description: "Workshop Notion gratis untuk pemula. Belajar dasar-dasar Notion, membuat pages, blocks, to-do lists, dan mengorganisir catatan dengan mudah. Daftar sekarang!",
  keywords: ["notion", "workshop", "produktivitas", "notion indonesia", "belajar notion", "notion pemula", "notion gratis"],
  authors: [{ name: "Nadya" }],
  openGraph: {
    title: "Notion Workshop - Belajar Notion untuk Pemula",
    description: "Workshop Notion gratis untuk pemula. Pelajari dasar-dasar Notion dan tingkatkan produktivitas Anda!",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notion Workshop - Belajar Notion untuk Pemula",
    description: "Workshop Notion gratis untuk pemula. Pelajari dasar-dasar Notion dan tingkatkan produktivitas Anda!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
