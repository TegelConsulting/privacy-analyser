import { Category_Label } from "./Category";

export type Report = { 
    url: string; 
    date: Date; 
    tags: Category_Label[]; 
    downloadUrl?: string 
};