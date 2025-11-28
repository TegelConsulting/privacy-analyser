export interface ScanSlice {
    jobId?: string; 
    status: "idle"  | "pending" | "completed" | "failed";
    progress: number;
}