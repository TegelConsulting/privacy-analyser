// src/app/api/payment-models/route.ts
import { NextResponse } from 'next/server';
import { paymentModels } from '@/lib/paymentModels';

export async function GET() {
  return NextResponse.json({ success: true, data: paymentModels });
}
