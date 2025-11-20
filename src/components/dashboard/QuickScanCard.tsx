"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import ReportLayout from "@/app/report/[scanId]/ReportLayout";
import { demoReport } from "@/components/analysis/demoReport";

export function QuickScanCard() {
  const [url, setUrl] = useState("");
  const [showReport, setShowReport] = useState(false);

  function handleStart() {
    // här skulle du senare kunna:
    // 1) POST:a till /api/scan med url + valda checkboxar
    // 2) få tillbaka ett scanId
    // 3) antingen öppna modal eller navigera till /report/scanId
    setShowReport(true);
  }

  const reportForView = {
    ...demoReport,
    url: url || demoReport.url,
  };

  return (
    <>
      <Card title="Snabbanalys av URL">
        <div className="grid gap-4">
          {/* lite större, lugnare input */}
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://dinhemsida.se"
            className="pa-input pa-input--lg"
          />

          {/* vänster: kryss, höger: knapp – robust även responsivt */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-center gap-3">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Checkbox label="GDPR" />
              <Checkbox label="W3C" />
              <Checkbox label="Accessibility" />
            </div>

            <Button
              variant="primary"
              size="sm"
              className="justify-self-start sm:justify-self-end"
              onClick={handleStart}
            >
              Starta analys
            </Button>
          </div>
        </div>
      </Card>

      {showReport && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <button
              onClick={() => setShowReport(false)}
              className="absolute right-4 top-4 text-sm text-slate-500 hover:text-slate-800"
            >
              Stäng ✕
            </button>

            {/* Själva rapporten inuti modalen */}
            <ReportLayout
              report={reportForView}
              errorMessage="Visar demodata just nu (kunde inte läsa riktig rapport från servern)."
            />
          </div>
        </div>
      )}
    </>
  );
}
