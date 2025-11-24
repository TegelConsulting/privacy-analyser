import { ScanStatus } from "./ScanStatus";

export interface ScanSlice {
    jobId?: string; 
    status: ScanStatus;
    progress: number;
}