import { Issue } from "./Issue";
import { Report as AnalysisReport } from "./Report";
import { Summary } from "./Summary";

export type MockData = {
    issues: Issue[]; 
    reports: AnalysisReport[]; 
    summary: Summary
};