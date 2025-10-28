import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center">
      <Hero
        title="Optimera din webbsida"
        subtitle="Upptäck GDPR-brister, tillgänglighetsproblem och kodfel på bara några sekunder. Få en tydlig rapport med konkreta förbättringsförslag – snabbt och automatiserat."
        ctaText="Gör analys"
        ctaLink="/dashboard"
      />
    </main>
  );
}
