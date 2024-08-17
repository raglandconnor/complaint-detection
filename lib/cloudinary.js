"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function storeAudio(audio) {
  try {
    const folderPath = "complaints-detection/uploads";

    // Convert Blob to Buffer
    const buffer = Buffer.from(await audio.arrayBuffer());

    // Upload to Cloudinary with explicit resource_type for audio
    const result = await new Promise((resolve, reject) => {
      const uploadOptions = {
        resource_type: "video",
        public_id: "audio",
        folder: folderPath,
      };

      cloudinary.uploader
        .upload_stream(uploadOptions, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    // Return URL and public_id
    return {
      audioUrl: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Error storing audio:", error);
    throw new Error("Failed to store audio.");
  }
}

export async function removeAudio(publicId) {
  try {
    // Delete the audio file from Cloudinary using the publicId
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: "video" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    if (result.result !== "ok") {
      throw new Error(`Failed to delete audio: ${result.result}`);
    }

    return result;
  } catch (error) {
    console.error("Error deleting audio:", error);
    throw new Error("Failed to delete audio.");
  }
}
