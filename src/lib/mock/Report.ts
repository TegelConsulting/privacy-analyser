import { Category } from "../types/Category"; 
import { Report as AnalysisReport } from "../types/Report";

export const reports: AnalysisReport[] = [
  { 
    url: "https://exempel.se",  
    date: new Date("2025-10-16"), 
    tags: ["GDPR","W3C"] as Category[] 
  },
  { 
    url: "https://hemsida.com", 
    date: new Date("2025-10-15"), 
    tags: ["Accessibility"] as Category[]
  },
];