export type Summary = { 
    gdpr: number; 
    w3c: number;
    accessibility: number; 
    
};

export type FullSummary = {
    gdpr: string; 
    w3c: string;
    accessibility: string; 
    cookies?: number;
    scripts?: number;
    forms?: number;
    httpOnly?: number;
    secure?: number;
    inlineScripts?: number;
    asyncScripts: number;
}