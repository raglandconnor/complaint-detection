"use client";

export async function postRequest(url, data, contentType = "application/json") {
  const params = {
    method: "POST",
    headers: {
      "Content-Type": contentType,
    },
    body: contentType === "application/json" ? JSON.stringify(data) : data, // Sending raw data directly if it's not JSON
  };

  try {
    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw error;
  }
}

export async function sendComplaints(data) {
  const url = "/api/text-analysis";
  const res = await postRequest(url, data);
  return JSON.parse(res).complaints;
}

export async function sendAudio(file) {
  // Ensure `file` is a Blob or File object with the correct type
  if (!(file instanceof Blob) || file.type !== "audio/mpeg") {
    throw new Error("Invalid file format. Expected a Blob of type audio/mpeg.");
  }

  const res = await postRequest("/api/audio-analysis", file, "audio/mpeg");
  return res;
}

export async function sendImage(file) {
  // Ensure `file` is a Blob or File object with the correct type
  if (
    !(file instanceof Blob) ||
    (file.type !== "image/jpeg" && file.type !== "image/png")
  ) {
    throw new Error(
      "Invalid file format. Expected a Blob of type image/jpeg or image/png."
    );
  }

  const res = await postRequest("/api/image-analysis", file, file.type);
  return JSON.parse(res).complaints;
}
