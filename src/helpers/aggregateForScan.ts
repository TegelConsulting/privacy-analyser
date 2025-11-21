import { ScanResult } from "@/lib/types/ScanResult";

export function aggregateForScan(s: ScanResult) {
   const httpOnlyCookies = s.cookies.filter((c) => c.httpOnly).length;
   const secureCookies = s.cookies.filter((c) => c.secure).length;
   const inlineScripts = s.scripts.filter((sc) => sc.inline).length;
   const asyncScripts = s.scripts.filter((sc) => sc.async).length;

    return {
    site: new URL(s.url).hostname,
    cookies: s.cookies.length,
    scripts: s.scripts.length,
    forms: s.forms.length,
    httpOnlyCookies,
    secureCookies,
    inlineScripts,
    asyncScripts,
   }
}