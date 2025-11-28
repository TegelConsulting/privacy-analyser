import { Category_Label } from "../types/Filter/Category"; 
import { Filter_Label } from "../types/Filter/Filter_Label";
import { Report as AnalysisReport } from "../types/Result/Report";
import { Keys } from "../types/Result/ScanStats";

export const reports: AnalysisReport[] = [
  { 
    url: "https://exempel.se",  
    date: new Date("2025-10-16"), 
    tags: ["gdpr","w3c"] as Category_Label[], 
  },
  { 
    url: "https://hemsida.com", 
    date: new Date("2025-10-15"), 
    tags: ["accessibility"] as Category_Label[]
  },
];