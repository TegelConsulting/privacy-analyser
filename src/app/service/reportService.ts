import { mockScans } from "@/lib/mock/mockList";
import { ScanResult } from "@/lib/types/Result/ScanResult";

/** ===== Mock API (guarantees stats/id) ===== */

export async function getReportByUrl(targetUrl: string): Promise<ScanResult> {
  const cleaned = targetUrl.trim();

  const isUnsafe = cleaned.startsWith("http://");
  const isReal = cleaned.startsWith("https://");

  // 1️⃣ Ogiltigt protokoll → direkt failed
  if (!isUnsafe && !isReal) {
    return {
      id: `scan-${Date.now()}`,
      url: cleaned,
      scanStatus: "failed",
      timestamp: new Date().toISOString(),
      cookies: [],
      scripts: [],
      forms: [],
      error: "Ogiltig url",
      stats: null,
    };
  }

  // liten fejk-delay
  await new Promise((r) => setTimeout(r, 400));

  // 2️⃣ Osäker (http) → pending (om du vill ha det)
  if (isUnsafe) {
    return {
      id: `scan-${Date.now()}`,
      url: cleaned,
      scanStatus: "pending",
      timestamp: new Date().toISOString(),
      cookies: [],
      scripts: [],
      forms: [],
      error: undefined,
      stats: null,
    };
  }

  // 3️⃣ HTTPS – hämta mockad scan
  const found = mockScans.find((s) => s.url === cleaned);

  if (!found) {
    throw new Error("Ingen mockad scan hittades för den här URL:en");
  }

  // 4️⃣ Returnera mocken som en “lyckad” scan
  return {
    ...found,
    id: `scan-${Date.now()}`,  // nytt id för varje körning om du vill
    url: cleaned,
    scanStatus: "completed",
    error: null,
  };
}
