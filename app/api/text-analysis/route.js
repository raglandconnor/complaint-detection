import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a helpful assistant specialized in analyzing consumer complaints. Your task is to analyze multiple text complaints, categorize them, and summarize them into an insightful sentence.
  Return a JSON object with the following structure: {"complaints" : [{ "category": "string", "insight": "string" }]}
  `;

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: JSON.stringify(data),
      },
    ],
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
  });

  const response = completion.choices[0].message.content;

  return NextResponse.json(response);
}
