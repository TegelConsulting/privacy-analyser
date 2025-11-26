// Gemensamma kategorityper (EN sann källa)
export type Category_Label = 
"gdpr" | 
"w3c" | 
"accessibility" | 
"cookies" |
"scripts" |
  "forms" |
  "httpOnly" |
  "secure" |
  "inlineScripts" | 
  "asyncScripts" 

// Hjälptyper för "Summary"-records
export type ByCat<T, K extends Category_Label = Category_Label> = Record<K, T>;

export type SummaryStr<K extends Category_Label = Category_Label> = ByCat<string, K>;
export type SummaryNum<K extends Category_Label = Category_Label> = ByCat<number, K>;