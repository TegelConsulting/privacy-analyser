import { Filter_Label } from "../Filter/Filter_Label";
import { IssueAdapter } from "./IssueAdapter";
import { ScriptInfoAdapter } from "./ScriptInfoAdapter";

export type ScanResultAdapter = {
    id: string;
    url: string;
    scanStatus: "completed" | "failed";
    timestamp: string;
    cookies: {
        name: string;
        value: string;
        domain: string;
        path: string;
        expires: number;
        httpOnly: boolean;
        secure: boolean;
        sameSite: "Strict" | "Lax" | "None";
    }[];   
    script: ScriptInfoAdapter[];
    forms: {
        action: string;
        method: string;
        inputs: {
            name: string;
            type: string;
        }[];
    }[]; 
    stats: Partial<Record<Filter_Label, number>>;
    issues?: IssueAdapter[];
}