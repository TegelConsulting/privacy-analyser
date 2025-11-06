import { Category } from "./Category";

export type Issue = { 
    id: string; 
    title: string; 
    percent: number; 
    severity: "low"|"medium"|"high";
    categories: Category[];
};
