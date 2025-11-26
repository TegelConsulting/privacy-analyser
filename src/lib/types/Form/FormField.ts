export interface FormField {
  type: string;
  name: string | null;
  id: string | null;
  required: boolean;
  placeholder: string | null;
}
