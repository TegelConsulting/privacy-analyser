import { IssueAdapter } from "./IssueAdapter"; 
import { Report as AnalysisReport } from "./Report";
import { Summary } from "./Summary";

export type MockData = {
    issues: IssueAdapter[]; 
    reports: AnalysisReport[]; 
    summary: Summary
};