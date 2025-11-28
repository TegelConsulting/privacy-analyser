import { Filter_Label, Label } from "@/lib/types/Filter/Filter_Label";
import type { ScanResult } from "@/lib/types/Result/ScanResult";

export type NormalizeScanResult = Omit<ScanResult, "stats"> & {
    stats: Label;
}

export const normalizeScanResult = (incoming: ScanResult): NormalizeScanResult => {
    return {
        ...incoming,
        stats: {
            gdpr: Number(incoming.stats?.gdpr ?? 0),
            w3c: Number(incoming.stats?.w3c ?? 0),
            accessibility: Number(incoming.stats?.accessibility ?? 0)
        }
    }
}