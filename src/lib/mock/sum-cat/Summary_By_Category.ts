import { Category_Label } from "@/lib/types/Category";
import { summary } from "./Summary";

export const Summary_By_Category: Record<Category_Label, number> = {
    GDPR: summary.gdpr, 
    W3C: summary.w3c,
    Accessibility: summary.accessibility
}