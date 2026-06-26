import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"]
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "W Centrum Duszy",
    template: "%s | W Centrum Duszy"
  },
  description:
    "A calm digital space for reflection, guided practice, workshops, and personal growth with Joanna Radek-Petersen.",
  metadataBase: new URL("https://wcentrumduszy.dk")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Header />
        <main id="main-content" tabIndex={-1} className="min-h-[48vh] focus:outline-none">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
