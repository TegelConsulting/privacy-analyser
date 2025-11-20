import type { ScanResult } from "@/lib/types/Result/ScanResult";

export const normalizeScanResult = (incoming: ScanResult): ScanResult => {
    const s = incoming?.stats ?? {};  
    return {
        ...incoming,
        stats: {
            gdpr: Number(s.gdpr ?? 0),
            w3c: Number(s.accessibility ?? 0),
            accessibility: Number(s.accessibility ?? 0)
        }
    }
}