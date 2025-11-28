import { ScanResult } from "./ScanResult"; 

export type ScanState = {
    status: "idle"  | "pending" | "completed" | "failed";
    progress: number;
    result: ScanResult | null;
    error: string | null;
} 