import { ScriptInfo } from "@/lib/types/Result/ScriptInfo";
import { ScriptInfoAdapter } from "@/lib/types/Result/ScriptInfoAdapter";

export function buildSummaryAdapterToScriptInfo(sia: ScriptInfoAdapter): ScriptInfo {
  return {
    src: sia.src,
    inline: sia.inline,
    content: sia.content,
    type: "text/nextjs",
    async: false,
    defer: false,     
  };
}
