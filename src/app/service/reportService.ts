import { mockList } from "@/lib/mock/mockList";
import { MockData } from "@/lib/types/MockData";
import { Report } from "@/lib/types/Report";


function normalizeUrl(u: string) {
    try {
        // Säkerställd URL -> ta origin + pathname, ta bort trailing slash och gör lowercase
        const url = new URL(u);
        return (url.origin + url.pathname).replace(/\/+$/, "").toLowerCase();
    } catch {
        // Stöd för värden utan protokoll (exempel: example.com/path)
        const cleaned = u.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "").toLowerCase();
        return cleaned.startsWith("www.") ? cleaned : cleaned;
    }
}

export async function getReportByUrl(rawUrl: string): Promise<MockData | null> {
    console.log("getReportByUrl called with:", rawUrl);
    const lookup = normalizeUrl(rawUrl);
    console.log("normalized lookup url:", lookup);

    const list = Array.isArray(mockList) ? mockList : [mockList];

    // mockList antas vara en array av MockData där varje MockData innehåller reports: Report[]
    for (const item of list) {
        if (!item.reports) continue;
        for (const r of item.reports) {
            const rUrl = normalizeUrl(r.url);
            console.log("comparing:", lookup, "vs", rUrl);
            if (rUrl === lookup) {
                console.log("getReportByUrl found match:", r);
                return item;
            }
        }
    }

    console.log("getReportByUrl: no match found");
    return null;
}