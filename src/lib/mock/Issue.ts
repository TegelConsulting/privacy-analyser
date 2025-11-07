import { Issue } from "../types/Issue";

export const issues: Issue[] = [
  { id: "i1", title: "Saknar cookie-policy",  percent: 21, severity: "medium", categories: ["GDPR"]},
  { id: "i2", title: "Saknar alt-text",       percent: 32, severity: "high",   categories:["W3C"]},
  { id: "i3", title: "Ogiltiga formulärfält", percent: 15, severity: "medium", categories: ["Accessibility"]},
];