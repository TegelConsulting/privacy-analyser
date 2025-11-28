import { Keys } from "@/lib/types/Result/ScanStats";
import { NormalizeScanResult } from "../../../../utils/normalizeScanResult";
import { SummaryStr } from "./buildSummary";


export function buildSummaryFromStats( stats: NormalizeScanResult["stats"]): SummaryStr<Keys> {
    return {
        gdpr: String(stats.gdpr),
        w3c: String(stats.w3c),
        accessibility: String(stats.accessibility),
    }
} 