import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Scan } from "@/models/Scan";
import { chromium } from "playwright";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { url, gdpr = true, w3c = true, accessibility = true } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const start = Date.now();

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

    const title = await page.title();
    const html = await page.content();
    const cookies = await page.context().cookies();

    const gdprScore = gdpr ? (html.includes("cookie") ? 40 : 80) : null;
    const w3cScore = w3c ? (html.includes("<html") ? 70 : 50) : null;
    const accessibilityScore = accessibility ? 20 : null;

    const issues = [
      { name: "Missing alt text", percent: 25 },
      { name: "No cookie banner found", percent: 15 },
      { name: "Invalid form labels", percent: 10 }
    ];

    const durationMs = Date.now() - start;

    await browser.close();

    const newScan = await Scan.create({
      url,
      title,
      gdprScore,
      w3cScore,
      accessibilityScore,
      issues,
      durationMs,
    });

    return NextResponse.json(newScan, { status: 201 });

  } catch (error: any) {
    console.error("Scan error:", error);
    return NextResponse.json(
      { error: "Scan failed", details: error.message },
      { status: 500 }
    );
  }
}
