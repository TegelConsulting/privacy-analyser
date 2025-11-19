// src/app/api/payment-models/[id]/route.ts
import { NextResponse } from 'next/server';
import { paymentModels } from '@/lib/paymentModels';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const model = paymentModels.find(m => m.id === id);
  if (!model) return NextResponse.json({ success: false, message: 'Modell hittades inte' }, { status: 404 });
  return NextResponse.json({ success: true, data: model });
}
