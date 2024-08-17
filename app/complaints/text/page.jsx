"use client";
import { sendComplaints } from "@/lib/http";
import { extractComplaints } from "@/lib/utils";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          // Parse the JSON data
          const jsonData = JSON.parse(e.target.result);

          // Process and extract the first 20 complaints
          const results = extractComplaints(jsonData);
          const bodyData = {
            complaints: results.slice(0, 20),
          };

          const response = await sendComplaints(bodyData);
          console.log(response);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          throw error;
        }
      };

      // Read the file as text
      reader.readAsText(file);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
      <h1>JSON File Upload</h1>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
