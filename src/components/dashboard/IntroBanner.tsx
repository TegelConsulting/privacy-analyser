"use client";

import Image from "next/image";
import logoColor from "@/app/assets/logo/privacy-logo.png";

export default function IntroBanner() {
  return (
    <section className="mb-6">
      {/* Mobil: staplad. Desktop: två kolumner med samma höjd */}
      <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
        {/* Vänster – logga */}
        <div className="shrink-0 md:flex md:items-center md:justify-start md:h-[88px]">
          <Image
            src={logoColor}
            alt="Privacy Analyser"
            width={320}
            height={120}
            priority
            className="w-auto h-auto md:h-[88px] max-w-full"
          />
        </div>

        {/* Höger – infobox */}
        <div className="flex-1">
          <div className="rounded-xl border border-slate-300 bg-white px-5 py-4 shadow-[0_2px_0_rgba(0,0,0,0.18)] md:h-[88px] md:flex md:items-center">
            <p className="text-[15px] leading-relaxed text-slate-800">
              Analysera din webbplats ur ett integritets- och tillgänglighetsperspektiv
              &amp; upptäck GDPR-brister, kodfel och tillgänglighetsproblem på några sekunder.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
