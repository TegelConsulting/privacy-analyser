import { Category_Label } from "./Category";  
export interface ScriptInfo {
  src: string | null;
  type: string | null;
  async: boolean;
  defer: boolean;
  inline: boolean;
  content?: string;
}
