"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo/PrivacyAnalyserShield.svg";

export default function TempHeader() {
  return (
    <header className="w-full bg-black">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Privacy Analyser"
            width={28}
            height={28}
            className="h-7 w-7 invert hover:opacity-90 transition"
            priority
          />
          {/* Ingen text – bara logga */}
          <span className="sr-only">Privacy Analyser</span>
        </Link>
      </div>
    </header>
  );
}
