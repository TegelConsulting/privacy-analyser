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
