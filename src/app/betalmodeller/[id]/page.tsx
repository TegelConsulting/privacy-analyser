// src/app/betalmodeller/[id]/page.tsx
import { paymentModels } from '@/lib/paymentModels';
import Link from 'next/link';

type Props = { params: { id: string } };

export default function PaymentModelDetail({ params }: Props) {
  const model = paymentModels.find(m => m.id === params.id);

  if (!model) {
    return (
      <main className="p-6">
        <h1 className="text-2xl">Modell hittades inte</h1>
        <p className="mt-2">Kontrollera URL eller återgå till <Link href="/betalmodeller" className="text-blue-600">listan</Link>.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">{model.title}</h1>
      <p className="text-gray-600 mt-2">{model.description}</p>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div><strong>Pris:</strong> {model.pricePerMonth === null ? 'Offert' : `${model.pricePerMonth} SEK / mån`}</div>
        <div className="mt-2"><strong>Analyskvot:</strong> {model.analysesPerMonth === -1 ? 'Obegränsat' : `${model.analysesPerMonth} / månad`}</div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link href={`/signup?plan=${model.id}`} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Välj plan</Link>
        <Link href="/betalmodeller" className="px-4 py-2 rounded-lg border">Tillbaka</Link>
      </div>
    </main>
  );
}
