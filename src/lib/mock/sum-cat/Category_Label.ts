import type { Category_Label } from "@/lib/types/Category";

export const CategoryList: Record<Category_Label, string> = {
  w3c: "W3C",
  gdpr: "GDPR",
  accessibility: "Tillgänglighet",
  cookies: "Cookies",
  scripts: "Scripts",
  forms: "Formulär",
  httpOnly: "HttpOnly-cookies",
  secure: "Secure-cookies",
  inlineScripts: "Inline scripts",
  asyncScripts: "Async scripts",
};