import { NextResponse } from "next/server";
import { chromium } from "playwright";
import { connectDB } from "@/mongodb";
import { Scan } from "@/models/Scan";
import { generateReport } from "@/lib/generateReport";  // <-- Kollegans AI-funktion

export async function POST(req: Request) {
  try {
    const { url, gdpr, w3c, accessibility } = await req.json();

    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      return NextResponse.json({ error: "Ogiltig URL" }, { status: 400 });
    }

    await connectDB();

    // 🔵 Starta Playwright
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const start = Date.now();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });

    // 🟦 Grunddata
    const title = await page.title();
    const html = await page.content();
    const cookies = await page.context().cookies();

    // 🟨 Din simple analyslogik (placeholder)
    const gdprScore = gdpr ? (html.includes("cookie") ? 35 : 80) : null;
    const w3cScore = w3c ? (html.includes("<html") ? 67 : 50) : null;
    const accessibilityScore = accessibility ? 13 : null;

    const issues = [
      { name: "Saknar alt-text", percent: 32 },
      { name: "Saknar cookie-policy", percent: 21 },
      { name: "Ogiltiga formulärfält", percent: 15 },
    ];

    const durationMs = Date.now() - start;
    
    await browser.close();

    // 🧠 AI-SCANRESULT som kollegans funktion förväntar sig
    const scanResultForAI = {
      url,
      timestamp: new Date().toISOString(),
      cookies,
      scripts: [],  // du kan fylla dem om du har data
      forms: [],    // du kan fylla dem om du har data
      error: undefined,
    };

    // 🔵 Generera AI-rapport (generateReport.ts)
    const aiReport = await generateReport(scanResultForAI);

    // 🟢 Spara all data (Playwright + AI) i MongoDB
    const saved = await Scan.create({
      url,
      title,
      gdprScore,
      w3cScore,
      accessibilityScore,
      issues,
      durationMs,

      // 🧠 AI-data från generateReport.ts
      aiSummary: aiReport.summary,
      aiPrivacyConcerns: aiReport.privacyConcerns,
      aiSecurityIssues: aiReport.securityIssues,
      aiGdprCompliance: aiReport.gdprCompliance,
      aiTimestamp: aiReport.timestamp,
    });

    // 📤 Returnera rapporten till frontend
    return NextResponse.json(saved);

  } catch (error: any) {
    console.error("Scan error:", error);
    return NextResponse.json(
      { error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}
