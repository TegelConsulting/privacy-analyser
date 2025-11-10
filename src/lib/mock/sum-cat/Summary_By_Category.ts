import { Category_Label } from "@/lib/types/Category";
import { Summary } from "@/lib/types/Summary";
export const Summary_By_Category = (summary: Summary): Record<Category_Label, any> => ({
    gdpr: summary.gdpr,
    w3c: summary.w3c,
    accessibility: summary.accessibillity,
    cookies: summary.cookies,
    scripts: summary.scripts,
    forms: summary.forms,
    httpOnly: summary.httpOnly,
    secure: summary.secure,
    inlineScripts: summary.inlineScripts,
    asyncScripts: summary.asyncScripts,
})