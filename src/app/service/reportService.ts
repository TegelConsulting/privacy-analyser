import { ScanResult } from "@/lib/types/ScanResult";

/** ===== Mock API (guarantees stats/id) ===== */
export async function getReportByUrl(targetUrl: string): Promise<ScanResult> {
  await new Promise((r) => setTimeout(r, 250)); // fake delay
  return {
    id: `scan-${Date.now()}`,
    url: targetUrl,
    timestamp: new Date().toISOString(),
    cookies: [],
    scripts: [],
    forms: [],
    stats: { gdpr: 3, w3c: 5, accessibility: 2 },
  };
}