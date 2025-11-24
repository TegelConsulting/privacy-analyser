import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Scan } from "@/models/Scan";
import { connectDB } from "@/mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid scan ID" },
        { status: 400 }
      );
    }

    const scan = await Scan.findById(id);

    if (!scan) {
      return NextResponse.json(
        { error: "Scan report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(scan, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/scan/:id error:", error);
    return NextResponse.json(
      { error: "Failed to load scan report", details: error.message },
      { status: 500 }
    );
  }
}
