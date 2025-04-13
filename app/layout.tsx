import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://iceberg-photo-reveal.vercel.app'),
  title: "Главные тайны Тураходжаева данила и Мифтаховой Ксении",
  description: "Чем я занимаюсь?",
  openGraph: {
    title: "Главные тайны Тураходжаева данила и Мифтаховой Ксении",
    description: "Чем я занимаюсь?",
    url: 'https://iceberg-photo-reveal.vercel.app',
    siteName: 'Iceberg Photo Reveal',
    locale: 'ru_RU',
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Главные тайны Тураходжаева данила и Мифтаховой Ксении"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Главные тайны Тураходжаева данила и Мифтаховой Ксении",
    description: "Чем я занимаюсь?",
    images: ["/og-image.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 