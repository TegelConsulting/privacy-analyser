"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-24 px-6 md:px-16 pt-8 md:pt-20 max-w-7xl mx-auto overflow-hidden">
      {/* LEFT SIDE — TEXT & CTA BUTTONS */}
      <motion.div
        className="flex-1 text-left space-y-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
          Optimera din webbsida
        </h1>

        <p className="text-gray-600 text-xl leading-relaxed max-w-lg">
          Upptäck brister i GDPR, tillgänglighet och kodstandard.
          <br />
          Få en tydlig rapport med konkreta förbättringsförslag – snabbt och automatiserat.
        </p>

        <div className="flex flex-wrap gap-5 pt-4">
          <Link
            href="/dashboard"
            className="bg-black text-white px-10 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
          >
            Gör analys
          </Link>
          <Link
            href="/products"
            className="bg-black text-white px-10 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
          >
            Produkter
          </Link>
        </div>
      </motion.div>

      {/* RIGHT SIDE — IMAGE & ABOUT TEXT */}
      <motion.div
        className="flex-1 flex flex-col items-center text-center md:items-center md:text-center -translate-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      >
        {/* Bilden */}
        <div className="w-full max-w-3xl">
          <Image
            src="/images/hero/hero-illustration.png"
            alt="Illustration av webbanalys"
            width={900}
            height={900}
            priority
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Text under bilden centrerad och nära bilden */}
        <p className="text-gray-600 text-base md:text-lg max-w-md leading-relaxed mt-4 text-center">
          <span className="whitespace-nowrap">
            Vi tror på en web som är både säker och tillgänglig för alla.
          </span>
          <br />
          Privacy Analyser gör det enkelt att förstå hur din webbplats hanterar
          integritet, tillgänglighet och kodstandard – på bara några sekunder.{" "}
          <Link
            href="/about"
            className="inline-block text-black font-medium underline underline-offset-4 hover:text-gray-700 transition-colors ml-1"
          >
            Läs mer →
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
