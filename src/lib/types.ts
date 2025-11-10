export type Issue = { id: string; title: string; percent: number; severity: "low"|"medium"|"high" };
export type Report = { url: string; date: string; tags: string[]; downloadUrl?: string };
export type Summary = { gdpr: number; w3c: number; accessibility: number };

// Scan types
export interface CookieInfo {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
}

export interface ScriptInfo {
  src: string | null;
  type: string | null;
  async: boolean;
  defer: boolean;
  inline: boolean;
  content?: string;
}

export interface FormField {
  type: string;
  name: string | null;
  id: string | null;
  required: boolean;
  placeholder: string | null;
}

export interface FormInfo {
  action: string | null;
  method: string;
  id: string | null;
  name: string | null;
  fields: FormField[];
}

export interface ScanResult {
  url: string;
  timestamp: string;
  cookies: CookieInfo[];
  scripts: ScriptInfo[];
  forms: FormInfo[];
  error?: string;
}
