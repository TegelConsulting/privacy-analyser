import { FormField } from "@/lib/types/Form/FormField";
import { FormInfo } from "@/lib/types/Form/FormInfo";
import { FormInfoAdapter } from "@/lib/types/Form/FormInfoAdapter";

export function buildSummaryAdapterToFormInfo(
  form: FormInfoAdapter,
  index: number
): FormInfo {
  return {
    id: `${form.action}-${index}`,        // eller uuid, eller bara String(index)
    name: form.action || `Form ${index+1}`, // eller annan logik för "name"
    method: form.method,
    action: form.action,
    fields: form.inputs.map((input, fieldIndex): FormField => ({
      id: `${form.action}-${index}`,
      name: input.name,
      type: input.type,
      required: false,
      placeholder: "",
    })),
  };
}
