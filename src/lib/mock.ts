import type { Issue, Report, Summary } from "./types";

export const summary: Summary = { gdpr: 35, w3c: 67, accessibility: 13 };
export const issues: Issue[] = [
  { id: "i1", title: "Saknar alt-text",       percent: 32, severity: "high" },
  { id: "i2", title: "Saknar cookie-policy",  percent: 21, severity: "medium" },
  { id: "i3", title: "Ogiltiga formulärfält", percent: 15, severity: "medium" },
];
export const reports: Report[] = [
  { url: "https://exempel.se",  date: "2025-10-16", tags: ["GDPR","W3C"] },
  { url: "https://hemsida.com", date: "2025-10-15", tags: ["Accessibility"] },
];
