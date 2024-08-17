"use client";
export async function postRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
  return res;
}
