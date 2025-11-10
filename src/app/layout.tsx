import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TempHeader from "@/components/layout/TempHeader";
import TempFooter from "@/components/layout/TempFooter";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Privacy Analyser",
  description: "Analysera och förbättra din webbplats integritet",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white text-slate-900`}
      >
        {/* Header */}
        <TempHeader />

        {/* Innehåll — tar upp resterande höjd, scrollbart */}
        <main className="flex-1 w-full overflow-y-auto">
          {children}
        </main>

        {/* Footer — alltid längst ned */}
        <TempFooter />
      </body>
    </html>
  );
}
