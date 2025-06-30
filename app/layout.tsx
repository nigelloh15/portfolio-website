import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const LemonMilk = localFont({
  src: '../public/fonts/LEMONMILK-Regular.otf',
  variable: "--font-lemonmilk",
});

export const metadata: Metadata = {
  title: "Nigel Loh - Portfolio",
  description: "Portfolio for Nigel...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${LemonMilk.className}`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
