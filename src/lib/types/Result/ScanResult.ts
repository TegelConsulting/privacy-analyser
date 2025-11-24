import { CookieInfo } from "../Form/CookieInfo";
import { FormInfo } from "../Form/FormInfo"; 
import { ScriptInfo } from "./ScriptInfo";

export interface ScanResult {
  id: string;
  url: string;
  timestamp: string; // ISO
  cookies: CookieInfo[];
  scripts: ScriptInfo[];
  forms: FormInfo[];
  error?: string;
  stats: {
    gdpr: number;
    w3c: number;
    accessibility: number;
  };
}

