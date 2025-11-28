import { Issue } from "@/lib/types";
import { CookieInfo } from "../Form/CookieInfo";
import { FormInfo } from "../Form/FormInfo"; 
import { ScriptInfo } from "./ScriptInfo";
import { Filter_Label } from "../Filter/Filter_Label";

export interface ScanResult {
  id: string;
  url: string;
  scanStatus: "idle"  | "pending" | "completed" | "failed";
  timestamp: string; // ISO
  cookies: CookieInfo[];
  scripts: ScriptInfo[];
  forms: FormInfo[];
  error?: string | null;
  stats: Partial<Record<Filter_Label, string | number>> | null;
  issues?: Issue[];
}

