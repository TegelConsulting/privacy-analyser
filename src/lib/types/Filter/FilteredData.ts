import { Category_Label } from "./Category";
import { Issue } from "@/lib/types"; 
import { Report as AnalysisReport } from "@/lib/types"; 

export type FilteredData = {
    filteredIssues: Issue[];
    filteredSummaries: {
        cat: Category_Label;
        label: string;
        value: number;
    }[];
    filteredReports: AnalysisReport[];
}