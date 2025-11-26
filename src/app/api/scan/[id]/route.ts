import { NextResponse } from "next/server";
import { connectDB } from "@/mongodb";
import { Scan } from "@/models/Scan";

type RouteParams = {
  params: { id: string };
};

export async function GET(_req: Request, { params }: RouteParams) {
  try {
    await connectDB();

    const scan = await Scan.findById(params.id).lean();

    if (!scan) {
      return NextResponse.json({ error: "Scan hittades inte" }, { status: 404 });
    }

    return NextResponse.json(scan);
  } catch (error: any) {
    console.error("GET /api/scan/[id] error:", error);
    return NextResponse.json(
      { error: "Internt serverfel" },
      { status: 500 }
    );
  }
}
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
