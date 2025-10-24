// import { connectToDatabase } from "./lib/mongodb";
import Hero from "../components/Hero/Hero";


export default async function Home() {


  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-8">
      <Hero
        title="Optimera din webbsida"
        subtitle="Upptäck GDPR-brister, tillgänglighetsproblem och kodfel på bara några sekunder. Få en tydlig rapport med konkreta förbättringsförslag – snabbt och automatiserat."
        ctaText="Gör analys"
        ctaLink="/dashboard"
      />
    </main>
  );
}
