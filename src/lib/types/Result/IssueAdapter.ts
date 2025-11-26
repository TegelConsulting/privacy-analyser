import { Filter_Label } from "../Filter/Filter_Label";


// Justera typ om din riktiga IssueAdapter skiljer sig
export type IssueAdapter = {
  id: string;
  title: string;
  categories: Filter_Label[];
  score?: number;      // <- mocken använder ofta detta
  value?: number;      // <- kan finnas i vissa datasets
  percent?: number;    // <- valfritt
  severity?: "low" | "medium" | "high";
};
