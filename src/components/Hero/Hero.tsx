"use client";
import SummaryCard from "./SummaryCard";
import ReportList from "./ReportList";
import IssuesList from "./IssuesList";

export default function Hero() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-6 flex flex-col gap-12">
      {/* Snabbanalys av URL */}
      <div className="bg-white shadow-md rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Snabbanalys av URL
        </h1>
        <p className="text-gray-600 mb-8">
          Analysera din webbplats för GDPR, tillgänglighet och kodstandarder.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="https://example.com"
            className="border border-gray-300 rounded-md px-4 py-2 w-80"
          />

          <div className="flex gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked /> GDPR
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> W3C
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Accessibility
            </label>
          </div>

          <button className="bg-black text-white rounded-md px-6 py-2 hover:bg-gray-800 transition">
            Starta analys
          </button>
        </div>
      </div>

      {/* Sammanfattning */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Sammanfattning av sökresultat
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard title="GDPR" percentage={35} />
          <SummaryCard title="W3C" percentage={67} />
          <SummaryCard title="Accessibility" percentage={82} />
        </div>
      </div>

      {/* Senaste rapporter */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Senaste rapporter</h2>
        <ReportList />
      </div>

      {/* Top 3 issues */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Top 3 Issues</h2>
        <IssuesList />
      </div>
    </section>
  );
}
