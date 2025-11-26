import type { ScanReport } from "@/types/report";

export const demoReport: ScanReport = {
  _id: "demo",
  url: "https://dinhemsida.se",
  title: "Demo-rapport",
  gdprScore: 35,
  w3cScore: 67,
  accessibilityScore: 13,
  issues: [
    { name: "Saknar alt-text", percent: 32 },
    { name: "Saknar cookie-policy", percent: 21 },
    { name: "Ogiltiga formulärfält", percent: 15 },
  ],
  durationMs: 2100,
  createdAt: new Date().toISOString(),
};
