import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function extractComplaints(complaints) {
  let results = [];
  for (const complaint of complaints) {
    results.push(complaint._source.complaint_what_happened);
  }
  return results;
}
