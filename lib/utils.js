import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Extract the first 100 complaints from the JSON data
export function extractComplaints(complaints) {
  let results = [];
  for (const complaint of complaints) {
    results.push(complaint._source.complaint_what_happened);
  }
  return results.splice(0, 100);
}

export function readJsonFile(file) {
  const reader = new FileReader();
  reader.readAsText(file);
  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
  });
}
