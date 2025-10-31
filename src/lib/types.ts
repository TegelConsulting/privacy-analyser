export type Issue = { id: string; title: string; percent: number; severity: "low"|"medium"|"high" };
export type Report = { url: string; date: string; tags: string[]; downloadUrl?: string };
export type Summary = { gdpr: number; w3c: number; accessibility: number };
export type MockData = {issues: Issue[]; reports: Report[]; summary: Summary};