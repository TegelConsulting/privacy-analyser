// src/types/report.ts
export type Issue = {
  name: string;
  percent: number;
};

export type ScanReport = {
  _id: string;
  url: string;
  title: string;
  gdprScore: number | null;
  w3cScore: number | null;
  accessibilityScore: number | null;
  issues: Issue[];
  durationMs: number;
  createdAt: string;
};
