import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

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
    <html lang="pl" data-scroll-behavior="smooth">
      <body>
        <Header />
        <main id="main-content" tabIndex={-1} className="min-h-[48vh] focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
