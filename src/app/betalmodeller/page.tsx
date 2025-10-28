// src/app/betalmodeller/page.tsx
import React from 'react';
import Link from 'next/link';
import { PaymentModel, paymentModels } from '@/lib/paymentModels';

function Price({ model }: { model: PaymentModel }) {
  if (model.pricePerMonth === null) return <span className="text-sm">Pris: Offert</span>;
  if (model.pricePerMonth === 0) return <span className="text-sm">Gratis</span>;
  return <span className="text-sm font-semibold">{model.pricePerMonth} SEK / mån</span>;
}

export default function BetalmodellerPage() {
  // Server-side rendering: använder mock direkt (ingen fetch). 
  // Om du vill hälla från API: använd fetch('/api/payment-models') med { cache: 'no-store' } i client-side.
  const models = paymentModels;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Betalmodeller</h1>
        <p className="text-gray-600 mt-2">Välj den plan som matchar din användning. Antal analyser anges per månad.</p>
      </header>

      <section className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {models.map(m => (
          <article key={m.id} className={`p-6 rounded-2xl border ${m.recommended ? 'border-blue-500 shadow-lg' : 'border-gray-200'} bg-white`}>
            {m.recommended && <div className="text-xs font-medium uppercase text-blue-600 mb-2">Rekommenderad</div>}
            <h2 className="text-xl font-medium">{m.title}</h2>
            <p className="text-gray-600 mt-2">{m.description}</p>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <Price model={m} />
                <div className="text-sm text-gray-500">
                  {m.analysesPerMonth === -1 ? 'Obegränsat antal analyser' : `${m.analysesPerMonth} analyser / månad`}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link href={`/betalmodeller/${m.id}`} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm inline-block text-center">
                  Detaljer
                </Link>
                <Link href={`/signup?plan=${m.id}`} className="px-4 py-2 rounded-lg border text-sm text-center">
                  Välj
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
