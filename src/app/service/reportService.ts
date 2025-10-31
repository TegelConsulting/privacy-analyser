import { mockList } from "@/lib/mock";
import { MockData, Report } from "@/lib/types";

export async function getReportByUrl(url: string): Promise<MockData | null> {
    const found: Report | undefined = mockList.reports.find(
        (r) => r.url.toLowerCase() === url.toLowerCase()
    ); 

    if (!found) {
        return null
    }

    return mockList
}