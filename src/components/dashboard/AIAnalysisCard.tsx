"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { AIResponse } from "@/lib/types";
import { ScanState } from "./ScanState";

export function AIAnalysisCard() {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState<AIResponse | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleAnalyze = async () => {
    if (!url) return;

    setState("loading");
    setAnalysis(null);

    try {
      const res = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: url })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Unknown error");

      setAnalysis(data);
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <Card title="AI-integrerad analys">
      <div className="grid gap-4">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://dinhemsida.se"
          className="pa-input pa-input--lg"
        />

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-center gap-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Checkbox label="GDPR" />
            <Checkbox label="W3C" />
            <Checkbox label="Accessibility" />
          </div>
          <Button variant="primary" size="sm" onClick={handleAnalyze}>
            Starta AI-analys
          </Button>
        </div>

        <ScanState state={state} />

        {analysis && (
          <div className="mt-4 space-y-2 text-sm">
            <p><strong>Översikt:</strong> {analysis.overview}</p>

            <p><strong>Risker och brister:</strong></p>
            <ul className="list-disc pl-5">
              {analysis.risks_and_weaknesses.map((r, i) => <li key={i}>{r}</li>)}
            </ul>

            <p><strong>Rekommendationer:</strong></p>
            <ul className="list-disc pl-5">
              {analysis.recommendations.map((r, i) => <li key={i}>{r}</li>)}
            </ul>

            {analysis.sources && analysis.sources.length > 0 && (
              <>
                <p><strong>Källor:</strong></p>
                <ul className="list-disc pl-5">
                  {analysis.sources.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
