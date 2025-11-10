"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { summary } from "@/lib/mock/sum-cat/Summary";

export function SummaryCard() {
  const [open, setOpen] = useState(false);

  return (
    <Card title="Sammanfattning av sökresultat">
      <div className="grid gap-4">
        <div className="grid grid-cols-5 items-center gap-3">
          <div className="col-span-1 text-sm text-gray-700">GDPR</div>
          <div className="col-span-3">
            <ProgressBar value={summary.gdpr} tone="bad" aria-label="GDPR" />
          </div>
          <div className="col-span-1 text-sm">{summary.gdpr} %</div>
        </div>

        <div className="grid grid-cols-5 items-center gap-3">
          <div className="col-span-1 text-sm text-gray-700">W3C</div>
          <div className="col-span-3">
            <ProgressBar value={summary.w3c} tone="ok" aria-label="W3C" />
          </div>
          <div className="col-span-1 text-sm">{summary.w3c} %</div>
        </div>

        <div className="grid grid-cols-5 items-center gap-3">
          <div className="col-span-1 text-sm text-gray-700">Accessibility</div>
          <div className="col-span-3">
            <ProgressBar value={summary.accessibility} tone="info" aria-label="Accessibility" />
          </div>
          <div className="col-span-1 text-sm">{summary.accessibility} %</div>
        </div>

        <p className="text-sm text-gray-700">
          Analysen visar att webbplatsen delvis uppfyller aktuella standarder men har flera områden
          med förbättringspotential. Fokusera på tillgänglighet och integritet först.
        </p>

        {open && (
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li><strong>GDPR:</strong> Samtycke för spårning saknas/otydligt. Cookie-policy bör ses över.</li>
            <li><strong>W3C:</strong> Mindre valideringsfel i HTML/CSS. Förbättra semantiken.</li>
            <li><strong>Accessibility:</strong> Alt-texter saknas, vissa fält saknar etiketter.</li>
          </ul>
        )}

        {/* Högerställd länk, exakt som “Visa alla” i RecentReports */}
        <div className="mt-1 text-right">
          <button
            type="button"
            className="pa-link-cta text-sm cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? "Visa mindre" : "Visa mer"}
          </button>
        </div>
      </div>
    </Card>
  );
}
