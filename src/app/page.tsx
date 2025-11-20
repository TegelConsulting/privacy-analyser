'use client';

import Hero from '@/components/Hero/Hero';

export default function Home() {
  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Hero
          title='Optimera din webbsida'
          subtitle='Upptäck GDPR-brister, tillgänglighetsproblem och kodfel på bara några sekunder. Få en tydlig rapport med konkreta förbättringsförslag – snabbt och automatiserat.'
          ctaText='Gör analys'
          ctaLink='/dashboard'
        />
      </main>
    </div>
  );
}
