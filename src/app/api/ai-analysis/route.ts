import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { AIResponse } from "@/lib/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();
    if (!input) {
      return NextResponse.json(
        { error: "Missing input" },
        { status: 400 }
      );
    }

    const prompt = `
Du är en professionell integritetsanalytiker. Analysera följande webbplats eller text och returnera ENDAST ett JSON-objekt med denna struktur, på svenska:

{
  "overview": "kort sammanfattning",
  "risks_and_weaknesses": ["lista varje risk eller brist"],
  "recommendations": ["lista konkreta rekommendationer"],
  "sources": ["valfria referenser om tillgängliga"]
}

Input: ${input}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const content = response.choices[0]?.message?.content ?? "";

    let parsed: AIResponse;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "AI returned invalid JSON", raw: content },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
