import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {Scan} from "@/models/Scan";

const MONGODB_URI = process.env.MONGODB_URI!;

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } = params;

    const scan = await Scan.findById(id);

    if (!scan) {
      return NextResponse.json(
        { error: "Scan report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(scan, { status: 200 });
  } catch (error) {
    console.error("GET /api/scan/:id error:", error);
    return NextResponse.json(
      { error: "Failed to load scan report" },
      { status: 500 }
    );
  }
}
