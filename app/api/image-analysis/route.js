import { storeImage } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a helpful assistant specialized in analyzing consumer complaints. Your task is to extract the complaint text from an image, analyze the complaint, categorize it, and summarize them into an insightful sentence.
  Return a JSON object with the following structure: {"complaints" : [{ "category": "string", "insight": "string" }]}. The complaints should always be an array, even if there is only one complaint. The category should be a string and the insight should be a string.
  `;

export async function POST(req) {
  const image = await req.blob();

  try {
    const openai = new OpenAI();
    const { imageUrl, publicId } = await storeImage(image);
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `${imageUrl}`,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
    });

    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.log("Error parsing audio:", error);
    throw NextResponse.error({
      status: 400,
      statusText: "Error analyzing image",
    });
  }
}
