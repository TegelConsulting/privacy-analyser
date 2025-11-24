// src/app/api/payment-models/[id]/route.ts
import { NextResponse } from "next/server";
import { PAYMENT_PLANS } from "@/lib/paymentModels";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // Eftersom dina modeller använder slug, inte id
  const model = PAYMENT_PLANS.find((m) => m.slug === id);

  if (!model) {
    return NextResponse.json(
      { success: false, message: "Modell hittades inte" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: model });
}
