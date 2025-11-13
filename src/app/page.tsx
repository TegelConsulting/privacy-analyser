"use client";

import Hero from "@/components/Hero/Hero";
import ReportList from "./reportcard/ReportList";
import ReportButtons from "./reportcard/ReportButtons";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero
        title="Optimera din webbsida"
        subtitle="Upptäck GDPR-brister, tillgänglighetsproblem och kodfel på bara några sekunder. Få en tydlig rapport med konkreta förbättringsförslag – snabbt och automatiserat."
        ctaText="Gör analys"
        ctaLink="/dashboard"
      />
        <section className="flex flex-col items-center justify-center p-8 bg-gray-50 gap-6">
        <h1 className="text-3xl font-bold">Analysrapport</h1>
        <ReportList />
        <ReportButtons />
      </section>
    </main>
  );
}
