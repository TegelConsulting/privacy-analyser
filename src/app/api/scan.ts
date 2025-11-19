import { NextResponse } from "next/server";
import { chromium } from "playwright";
import { connectDB } from "@/lib/mongodb";
import { Scan } from "@/models/Scan";

export async function POST(req: Request) {
  try {
    const { url, gdpr, w3c, accessibility } = await req.json();

    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      return NextResponse.json({ error: "Ogiltig URL" }, { status: 400 });
    }

    await connectDB();

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const start = Date.now();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

    // Grunddata
    const title = await page.title();
    const html = await page.content();
    const cookies = await page.context().cookies();

    // 🧠 Enkel “analyslogik”
    const gdprScore = gdpr ? (html.includes("cookie") ? 35 : 80) : null;
    const w3cScore = w3c ? (html.includes("<html") ? 67 : 50) : null;
    const accessibilityScore = accessibility ? 13 : null;

    const durationMs = Date.now() - start;
    await browser.close();

    const result = {
      url,
      title,
      gdprScore,
      w3cScore,
      accessibilityScore,
      issues: [
        { name: "Saknar alt-text", percent: 32 },
        { name: "Saknar cookie-policy", percent: 21 },
        { name: "Ogiltiga formulärfält", percent: 15 },
      ],
      durationMs,
      createdAt: new Date(),
    };

    // 💾 Spara i MongoDB
    const saved = await Scan.create(result);

    return NextResponse.json(saved);
  } catch (error: any) {
    console.error("Scan error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
