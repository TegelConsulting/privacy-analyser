import { ScanResult } from "@/lib/types/Result/ScanResult";
import { ScanResultAdapter } from "@/lib/types/Result/ScanResultAdapter";
import { Issue } from "@/lib/types";
import { buildSummaryAdapterToIssue } from "./buildSummaryAdapterToIssue";
import { buildSummaryAdapterToFormInfo } from "./buildSummaryAdapterToFormInfo";
import { buildSummaryAdapterToScriptInfo } from "./buildSummaryAdapterToScriptInfo";
import { mapStats } from "../mapStats";

export function buildSummaryAdapter(src: ScanResultAdapter): ScanResult {
    console.log("RAW adapter src.issues", src.issues);

    const flatIssues: Issue[] = (src.issues ?? []) 
        .flat()
        .map(buildSummaryAdapterToIssue)
    
    const mapped: ScanResult = {
        id: src.id,
        url: src.url,
        timestamp: src.timestamp,
        scanStatus: src.scanStatus,
        cookies: src.cookies,
        scripts: (src.script ?? []).map(buildSummaryAdapterToScriptInfo),
        forms: (src.forms ?? []).map(buildSummaryAdapterToFormInfo),
        stats: mapStats(src.stats),
        issues: flatIssues,
    }
    return mapped;
    
} 