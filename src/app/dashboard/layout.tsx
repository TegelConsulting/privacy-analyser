// src/app/dashboard/layout.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ShieldCheck from "@/components/icons/ShieldCheck";
import logo from "@/app/assets/logo/privacy-logo.png";

export const metadata = {
  title: "Dashboard – Privacy Analyser",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-50 text-gray-900 flex flex-col min-h-0 overflow-x-hidden">
      {/* 🖤 Navbar med svart bakgrund och vit ikon */}
      <header className="bg-black text-gray-200 shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          {/* Endast logga (ingen text) */}
          <ShieldCheck className="w-6 h-6 text-white opacity-90 hover:opacity-100 transition" />

          <nav className="space-x-6 text-sm">
            <Link href="/" className="text-gray-300 hover:text-white transition">
              Hem
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
            <Link href="/reports" className="text-gray-300 hover:text-white transition">
              Rapporter
            </Link>
          </nav>
        </div>
      </header>

      {/* Scrollområde */}
      <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        {/* Hero-rad */}
        <section className="bg-gray-50">
          <div className="mx-auto max-w-6xl px-6 pt-6 pb-2">
            <div className="flex items-center gap-8">
              <div className="flex-shrink-0">
                <Image
                  src={logo}
                  alt="Privacy Analyser"
                  width={260}
                  height={260}
                  priority
                />
              </div>
              <p className="text-gray-600 text-[15px] leading-relaxed max-w-lg pa-gloss-text">
                Analysera din webbplats ur ett integritets- och tillgänglighetsperspektiv
                och upptäck GDPR-brister, kodfel och tillgänglighetsproblem på några sekunder.
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard-innehåll */}
        <div className="max-w-6xl mx-auto px-6 pt-2 pb-16 w-full">
          {children}
        </div>
      </main>

      {/* 🖤 Footer */}
{/* 🖤 Footer – minimalistisk variant utan ikon */}
<footer className="bg-black text-gray-400 py-6 border-t border-gray-800 text-center">
  <span className="text-xs tracking-wide">
    © {new Date().getFullYear()} Privacy Analyser
  </span>
</footer>

    </div>
  );
}
