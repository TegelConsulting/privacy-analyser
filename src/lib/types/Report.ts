import { Category } from "./Category";

export type Report = { 
    url: string; 
    date: Date; 
    tags: Category[]; 
    downloadUrl?: string 
};