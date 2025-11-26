// src/app/api/scan/[id]/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/mongodb";
import { Scan } from "@/models/Scan";

type RouteParams = { params: { id: string } };

export async function GET(_req: Request, { params }: RouteParams) {
  try {
    await connectDB();

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Ogiltigt scan-ID" }, { status: 400 });
    }

    const scan = await Scan.findById(id).lean();
    if (!scan) {
      return NextResponse.json({ error: "Scan hittades inte" }, { status: 404 });
    }

    return NextResponse.json(scan, { status: 200 });
  } catch (err: unknown) {
    const details = err instanceof Error ? err.message : String(err);
    console.error("GET /api/scan/[id] error:", details);
    return NextResponse.json(
      { error: "Internt serverfel", details },
      { status: 500 }
    );
  }
}
