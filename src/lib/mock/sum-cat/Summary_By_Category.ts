import { Category } from "@/lib/types/Category";
import { summary } from "./Summary";

export const Summary_By_Category: Record<Category, number> = {
    GDPR: summary.gdpr, 
    W3C: summary.w3c,
    Accessibility: summary.accessibility
}