import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-8">
      <Hero
        title="Privacy Analyser"
        subtitle="Analysera din webbplats ur ett integritets- och tillgänglighetsperspektiv. Upptäck GDPR-brister, kodfel och tillgänglighetsproblem på några sekunder."
        ctaText="Starta analys"
        ctaLink="#"
      />
    </main>
  );
}
