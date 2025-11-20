import { PlanSlug } from "@/lib/paymentModels";

export type Plan = {
    id: string; 
    slug: PlanSlug;
    name: string;
    price: number;
    features?: string[];
}