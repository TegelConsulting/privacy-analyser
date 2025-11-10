import { FormField } from "./FormField";

export interface FormInfo {
  action: string | null;
  method: string;
  id: string | null;
  name: string | null;
  fields: FormField[];
}
