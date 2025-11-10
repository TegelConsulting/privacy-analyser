"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

/**
 * Hero utan fullskärms-centrering.
 * Ligger nära toppen, med lagom vertikal padding.
 * Grid på två kolumner, responsiv.
 */
export default function Hero({ title, subtitle, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-16 py-16 md:py-24 grid gap-12 md:gap-16 md:grid-cols-2 items-center">
        {/* Vänster sida — text och knappar */}
        <motion.div
          className="text-left space-y-8"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight">
            {title}
          </h1>

          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-xl">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href={ctaLink}
              className="rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              {ctaText}
            </Link>
            <Link
              href="/betalmodeller"
              className="rounded-lg border border-slate-300 px-8 py-3 font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Produkter
            </Link>
          </div>
        </motion.div>

        {/* Höger sida — bild + kort brödtext */}
        <motion.div
          className="flex flex-col items-center md:items-end"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <div className="w-full max-w-[520px]">
            <Image
              src="/images/hero/hero-illustration.png" // byt till robot om du vill: import robot from "@/app/assets/logo/robot.svg"
              alt="Illustration av webbanalys"
              width={520}
              height={520}
              priority
              className="w-full h-auto object-contain opacity-90"
            />
          </div>

          <p className="mt-4 max-w-md text-center md:text-right text-slate-600 leading-relaxed">
            Vi tror på en web som är både säker och tillgänglig för alla.
            <br />
            Privacy Analyser gör det enkelt att förstå hur din webbplats hanterar
            integritet, tillgänglighet och kodstandard – på bara några sekunder.{" "}
            <Link
              href="/about"
              className="inline-block font-medium text-black underline underline-offset-4 hover:text-slate-700 ml-1"
            >
              Läs mer →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
