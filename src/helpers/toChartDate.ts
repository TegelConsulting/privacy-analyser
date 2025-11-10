import { ScanResult } from "@/lib/types/ScanResult";
import { aggregateForScan } from "./aggregateForScan";

export function toChartDate(s: ScanResult) {
  const a = aggregateForScan(s);
  return {
    site: a.site,
    Cookies: a.cookies,
    Scripts: a.scripts,
    Forms: a.forms,
    HttpOnly: a.httpOnlyCookies,
    Secure: a.secureCookies,
    InlineScripts: a.inlineScripts,
    AsyncScripts: a.asyncScripts,
  };
}