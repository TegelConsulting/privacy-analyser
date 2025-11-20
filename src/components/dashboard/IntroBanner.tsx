"use client";

import Image from "next/image";
import logoColor from "@/app/assets/logo/privacy-logo.png";

export default function IntroBanner() {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        {/* Vänster – STÖRRE logga i hörnet */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <Image
            src={logoColor}
            alt="Privacy Analyser"
            width={320}
            height={120}
            priority
            className="w-auto h-[90px] md:h-[110px]" // <-- gör den stor, men kompakt
          />
        </div>

        {/* Höger – text */}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-1">
            Privacy Analyser · Dashboard
          </p>
          <p className="text-sm md:text-[15px] leading-relaxed text-slate-800">
            Analysera din webbplats ur ett integritets- och tillgänglighetsperspektiv
            och upptäck GDPR-brister, kodfel och tillgänglighetsproblem på bara
            några sekunder. Få tydliga rapporter med konkreta förbättringsförslag.
          </p>
        </div>
      </div>
    </section>
  );
}
