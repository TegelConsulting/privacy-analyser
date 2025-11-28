import { Issue } from "../types";

export const mockIssues: Issue[] = [
  {
    id: "issue-1",
    title: "Bristande cookieinformation",
    percent: 82,
    severity: "high",
  },
  {
    id: "issue-2",
    title: "Saknar tydlig integritetspolicy på landningssidan",
    percent: 65,
    severity: "medium",
  },
  {
    id: "issue-3",
    title: "Formulär utan info om hur data lagras",
    percent: 47,
    severity: "medium",
  },
  {
    id: "issue-4",
    title: "Otydlig information om tredjepartscookies",
    percent: 33,
    severity: "low",
  },
  {
    id: "issue-5",
    title: "Ingen länk till integritetspolicy i sidfoten",
    percent: 28,
    severity: "low",
  },
  {
    id: "issue-6",
    title: "Automatiskt ikryssade nyhetsbrevs-rutor",
    percent: 74,
    severity: "high",
  },
  {
    id: "issue-7",
    title: "Oklar rättslig grund för spårning",
    percent: 59,
    severity: "medium",
  },
  {
    id: "issue-8",
    title: "Svårt att hitta kontaktuppgifter till personuppgiftsansvarig",
    percent: 41,
    severity: "medium",
  },
  {
    id: "issue-9",
    title: "Otydlig information om hur länge data sparas",
    percent: 52,
    severity: "medium",
  },
  {
    id: "issue-10",
    title: "Ingen enkel möjlighet att återkalla samtycke",
    percent: 88,
    severity: "high",
  },
];
