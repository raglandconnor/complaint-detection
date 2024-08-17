import { NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";
import { removeAudio, storeAudio } from "@/lib/cloudinary";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

export async function POST(req) {
  const audioBlob = await req.blob();

  try {
    const { audioUrl, publicId } = await storeAudio(audioBlob, "audio");

    const params = {
      audio: audioUrl,
      speaker_labels: true,
    };
    const transcript = await client.transcripts.transcribe(params);
    await removeAudio(publicId);

    return NextResponse.json({ transcript });
  } catch (error) {
    console.error("Error during transcription:", error);
    return NextResponse.error({ message: "Transcription failed" });
  }
}
