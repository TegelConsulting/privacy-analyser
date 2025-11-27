"use client";

import { mockReports } from "@/data/mockReports";

type ReportDetailProps = {
  params: { id: string };
};

export default function ReportDetail({ params }: ReportDetailProps) {
  const report = mockReports.find((r) => r.id === params.id);

  if (!report) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center space-y-4 max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800">Analysen kunde inte hittas</h2>
        <p className="text-gray-500">
          Den här analysen verkar saknas eller har tagits bort.
        </p>

        {/* Placeholder button - no link yet */}
        <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
        >
          Tillbaka till historik
        </button>
      </div>
    </main>
  );
}


  return (
    <main className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <section className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
        {/* Header */}
        <header className="border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Rapportdetaljer</h1>
          <p className="text-sm text-gray-500">Datum: {report.date}</p>
          <p className="text-sm text-gray-500">Visar analys-ID: {report.id}</p>
        </header>

        {/* Domain info */}
        <div className="bg-gray-100 rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Domäninformation</h2>
          <p className="text-gray-700">{report.domain}</p>
        </div>

{/* Result summary */}
<div className="bg-gray-100 rounded-md p-4">
  <h2 className="text-lg font-semibold mb-2 text-gray-900">Resultatöversikt</h2>
  <ul className="list-disc list-inside text-gray-700 space-y-1">
    <li>Tillgänglighet: {report.results.accessibility}%</li>
    <li>Prestanda: {report.results.performance}%</li>
    <li>SEO: {report.results.seo}%</li>
  </ul>
</div>


{/* Risk level indicators */}
<div className="bg-gray-100 rounded-md p-4">
  <h2 className="text-lg font-semibold mb-2 text-gray-900">Risknivåer</h2>
  <div className="flex gap-4">
    <span className="px-3 py-1 rounded-full bg-green-200 text-green-800 font-medium">
      Låg risk
    </span>
    <span className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 font-medium">
      Medel risk
    </span>
    <span className="px-3 py-1 rounded-full bg-red-200 text-red-800 font-medium">
      Hög risk
    </span>
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
