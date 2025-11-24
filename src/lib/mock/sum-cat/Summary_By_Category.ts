import { Category_Label } from "@/lib/types/Filter/Category";
import { FullSummary} from "@/lib/types/Filter/Summary";

export const Summary_By_Category = (summary: FullSummary): Record<Category_Label, any> => ({
    gdpr: summary.gdpr,
    w3c: summary.w3c,
    accessibility: summary.accessibility,
    cookies: summary.cookies,
    scripts: summary.scripts,
    forms: summary.forms,
    httpOnly: summary.httpOnly,
    secure: summary.secure,
    inlineScripts: summary.inlineScripts,
    asyncScripts: summary.asyncScripts,
})