import { Category_Label } from "./Category";
import { Issue } from "./Issue"
import { Report as AnalysisReport } from "./Report";

export type FilteredData = {
    filteredIssues: Issue[];
    filteredSummaries: {
        cat: Category_Label;
        label: string;
        value: number;
    }[];
    filteredReports: AnalysisReport[];
}