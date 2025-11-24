"use client";
import React, { useState } from "react";
import "../../app/styles/analysis/AnalysisView.css";
import { Checkbox } from "@/components/ui/Checkbox";
import type { Filter_Label } from "@/lib/types/Filter/Filter_Label";
import type { ScanResult } from "@/lib/types/Result/ScanResult";
import { FilterList } from "@/lib/mock/sum-cat/FilterLabels";
import { ALL_FILTERS } from "@/app/functions/getFiltered";
import { useAppStore } from "@/hooks/useAppStore";
import { useRouter } from "next/navigation";
import ClientClock from "@/components/analysis/ClientClock";
import { isValidUrl } from "../functions/isValidUrl";
import { Button } from "@/components/ui/Button";

export default function Page() {
  const {
    targetUrl,
    setTargetUrl,
    selectedFilters,
    setSelectedFilters,
  } = useAppStore();

  const [scan, setScan] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const selected = selectedFilters;

  const onToggle = (f: Filter_Label) => {
    setSelectedFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const handlePay = async () => {
    console.log("🔹 handlePay clicked"); // <-- FÖR TEST

    setError(null);

    if (!/^https?:\/\//i.test(targetUrl)) {
      setError("Ange en giltig URL som börjar med http(s)://");
      console.log("❌ Ogiltig URL:", targetUrl);
      return;
    }

    try {
      setLoading(true);

      const selectedOrAll: Filter_Label[] = selected.length
        ? selected
        : (ALL_FILTERS as unknown as Filter_Label[]);

      const params = new URLSearchParams();
      params.set("url", targetUrl);
      params.set("filters", selectedOrAll.join(","));

      console.log("➡️ Navigerar till:", `/betalmodeller?${params.toString()}`);

      router.push(`/betalmodeller?${params.toString()}`);
    } catch (err: any) {
      console.error("⚠️ Fel i handlePay:", err);
      setScan(null);
      setError(err?.message ?? "Kunde inte hämta analys.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await handlePay();
  };

  return (
    <section className="analysisView-container">
      <section className="analysisView">
        <header className="analysisViewHeader">
          <h1>Analys</h1>
          <ClientClock />
        </header>

        <form className="form-container" onSubmit={onSubmit}>
          <section className="input-container flex gap-2">
            <input
              className="urlInput flex-1 bg-white rounded text-black p-1"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://dinsajt.se"
            />
            <Button
              className="shrink-0 rounded-md bg-slate-900 text-white hover:bg-black w-[15%] h-[10%]"
              variant="primary"
              type="submit"          // <-- INGEN onClick här
              // disabled={loading}   // testa först utan disabled
              size="md"
            >
              Betala
            </Button>
            
          </section>

          {error && <p className="errorText">{error}</p>}

          <section className="label-container">
            <section className="labels">
              {(ALL_FILTERS as unknown as Filter_Label[]).map((f) => (
                <Checkbox
                  key={f}
                  checked={selected.includes(f)}
                  onChange={() => onToggle(f)}
                  label={FilterList[f]}
                />
              ))}
            </section>
          </section>
        </form>
      </section>
    </section>
  );
}
