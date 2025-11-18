"use client";

type ReportDetailProps = {
  params: { id: string };
};

export default function ReportDetail({ params }: ReportDetailProps) {
  return (
    <main className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <section className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
        {/* Header */}
        <header className="border-b pb-4">
          <h1 className="text-2xl font-bold">Rapportdetaljer</h1>
          <p className="text-sm text-gray-500">Datum: 2025-11-13</p>
          <p className="text-sm text-gray-500">Visar analys-ID: {params.id}</p>
        </header>

        {/* Domain info */}
        <div className="bg-gray-100 rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Domäninformation</h2>
          <p className="text-gray-700">www.example.com</p>
        </div>

        {/* Result summary */}
        <div className="bg-gray-100 rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Resultatöversikt</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Tillgänglighet: 87%</li>
            <li>Prestanda: 75%</li>
            <li>SEO: 90%</li>
          </ul>
        </div>

        {/* Risk level indicators */}
        <div className="bg-gray-100 rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Risknivåer</h2>
          <div className="flex gap-4">
            <span className="px-3 py-1 rounded-full bg-green-200 text-green-800 font-medium">Låg risk</span>
            <span className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 font-medium">Medel risk</span>
            <span className="px-3 py-1 rounded-full bg-red-200 text-red-800 font-medium">Hög risk</span>
          </div>
        </div>

        {/* Message area */}
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
          <p>⚠️ Ingen data hittades för denna domän.</p>
        </div>
      </section>
    </main>
  );
}
 