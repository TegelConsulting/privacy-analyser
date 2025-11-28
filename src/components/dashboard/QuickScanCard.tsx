"use client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useMemo, useState } from "react";
import { useAppStore } from "@/hooks/useAppStore";
import { ScanResult } from "@/lib/types/Result/ScanResult";
import { useRouter } from "next/navigation";
import { Filter_Label } from "@/lib/types/Filter/Filter_Label";
import { ALL_FILTERS } from "@/app/functions/getFiltered";
import { FilterList } from "@/lib/mock/sum-cat/FilterLabels";
import { getReportByUrl } from "@/app/service/reportService";
import { Loader } from "../analysis/Loader";
import Modal from "../analysis/Modal";
import { Summary } from "../analysis/Summary";
import { PaymentPlan } from "@/lib/paymentModels";
import { normalizeScanResult, type NormalizeScanResult } from "../../../utils/normalizeScanResult";
export function QuickScanCard() {
  const {
    targetUrl,
    setTargetUrl,
    selectedFilters,
    setSelectedFilters,
    startScan,
    finishScan,
    failScan,
    scan
  } = useAppStore();

  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);


  const normalizedScan: NormalizeScanResult | null = useMemo(() => {
    if (!scan.result) return null;
    return normalizeScanResult(scan.result); 
  }, [scan.result])

  const selected = selectedFilters;

  const onToggle = (f: Filter_Label) => {
    setSelectedFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    console.log("Submit triggered");
    setError(null);

    if (!/^https?:\/\//i.test(targetUrl)) {
      setError("Ange en giltig URL som börjar med http(s)://");
      return;
    }

    startScan(); // status -> pending i store
    setLoading(true);
    await delay(2000);

    try {
      console.log("Fetching report for:", targetUrl);
      const res = await getReportByUrl(targetUrl);
      console.log("Got response:", res);

      setScanResult(res);       // lokalt resultat till Summary
      setOpen(true);
      finishScan(res);    // uppdatera store (status / result / count)
      localStorage.setItem("scan", JSON.stringify(res));

    } catch (err: any) {
      console.error(err);
      const msg = err?.message ?? "Kunde inte hämta analys."

      setScanResult(null);
      setError(msg);
      failScan(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange: React.Dispatch<
    React.SetStateAction<Filter_Label[]
  >> = (valueOrUpdater) => {
    setSelectedFilters((prev) =>
      typeof valueOrUpdater === "function"
        ? (valueOrUpdater as (p: Filter_Label[]) => Filter_Label[])(prev)
        : valueOrUpdater
    );
  };

  return (
    <Card title="Snabbanalys av URL">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <input
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://dinhemsida.se"
            className="pa-input pa-input--lg"
          />

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-center gap-3">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {(ALL_FILTERS as unknown as Filter_Label[]).map((f) => (
                <Checkbox
                  key={f}
                  checked={selected.includes(f)}
                  onChange={() => onToggle(f)}
                  label={FilterList[f]}
                />
              ))}
            </div>
            <Button
              variant="primary"
              size="sm"
              className="justify-self-start sm:justify-self-end"
              type="submit"
              disabled={loading}
            >
              {loading ? "Analyserar..." : "Starta analys"}
            </Button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Sammanfattning av analys"
          >
            <Summary
              scan={normalizedScan}
              selected={selected}
              onSelectedChange={handleSelectChange}
            />
          </Modal>
        </div>
      </form>
    </Card>
  );
}
