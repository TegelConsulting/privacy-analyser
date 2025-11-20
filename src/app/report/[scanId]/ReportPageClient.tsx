"use client";

import { useEffect, useState } from "react";
import type { ScanReport } from "@/types/report";
import ReportLayout from "./ReportLayout";

type Props = {
  scanId?: string; // undefined i demo-läge
  onClose?: () => void;
};

export default function ReportPageClient({ scanId, onClose }: Props) {
  const [report, setReport] = useState<ScanReport | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!scanId) {
      // Demo direkt om ingen scanId finns
      setReport(getDemoReport());
      setError("Visar demodata (ingen riktig scanId angiven).");
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(undefined);

        const res = await fetch(`/api/scan/${scanId}`);

        if (!res.ok) {
          throw new Error(`Kunde inte hämta rapport (${res.status})`);
        }

        const data = (await res.json()) as ScanReport;
        if (!cancelled) {
          setReport(data);
        }
      } catch (err: unknown) {
        // Typ-säkert felmeddelande
        const message =
          err instanceof Error ? err.message : "Okänt fel vid hämtning av rapport";

        console.error("Kunde inte hämta rapport:", err);

        if (!cancelled) {
          setReport(getDemoReport());
          setError(
            `Kunde inte läsa rapport från servern. Visar demodata. (${message})`
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [scanId]);

  const handleExport = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
      {/* Klick på bakgrunden = stäng */}
      <div className="absolute inset-0" onClick={handleClose} />

      <div
        className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-100/70 p-6 shadow-[0_32px_80px_rgba(15,23,42,0.85)] border border-slate-700/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal-header */}
        <div className="mb-4 flex items-center justify-between text-xs text-slate-300">
          <span className="uppercase tracking-[0.25em] text-slate-400">
            Rapport-preview
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExport}
              className="rounded-full border border-slate-500/60 bg-slate-900/40 px-3 py-1.5 text-[11px] font-medium text-slate-50 hover:bg-slate-800 transition"
            >
              Exportera som PDF
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="rounded-full bg-slate-100/80 px-3 py-1.5 text-[11px] font-medium text-slate-700 border border-slate-200 hover:bg-white transition"
            >
              Stäng
            </button>
          </div>
        </div>

        {/* Innehåll */}
        {loading && !report ? (
          <div className="min-h-[320px] flex items-center justify-center text-slate-500 text-sm">
            Hämtar rapport…
          </div>
        ) : report ? (
          <ReportLayout report={report} errorMessage={error} />
        ) : (
          <div className="min-h-[320px] flex items-center justify-center text-slate-500 text-sm">
            Kunde inte visa rapporten.
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Demo fallback data                             */
/* -------------------------------------------------------------------------- */

function getDemoReport(): ScanReport {
  return {
    _id: "demo",
    url: "https://dinhemsida.se",
    title: "Demo-rapport",
    gdprScore: 35,
    accessibilityScore: 13,
    w3cScore: 67,
    issues: [
      { name: "Saknar alt-text", percent: 32 },
      { name: "Saknar cookie-policy", percent: 21 },
      { name: "Ogiltiga formulärfält", percent: 15 },
    ],
    durationMs: 2100,
    createdAt: new Date().toISOString(),
  };
}
