// buildSummary.ts
import type { ScanResult } from "@/lib/types/Result/ScanResult";

type Keys = "gdpr" | "w3c" | "accessibility";
type StatsAdapter = Partial<Record<Keys, string | number>> | null;

// t.ex. din SummaryStr-typ
export type SummaryStr<K extends string> = Record<K, string>;

export function buildSummary(stats: StatsAdapter): SummaryStr<Keys> {
  const s: Partial<Record<Keys, string | number>> = stats ?? {}; 
  
  const gdpr = Number(s.gdpr ?? 0);
  const w3c = Number(s.w3c ?? 0);
  const accessibility = Number(s.accessibility ?? 0);

  return {
    gdpr: String(gdpr),
    w3c: String(w3c),
    accessibility: String(accessibility),
  };
}
