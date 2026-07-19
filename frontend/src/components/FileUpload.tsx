"use client";

import { ChangeEvent } from "react";
import { api } from "@/lib/api";

export default function FileUpload() {
  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("process", file);

    try {
      const response = await api.post("/process/upload", formData);

      console.log(response.data);
      alert("Process parsed successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="mt-8">
      <input
        type="file"
        accept=".process"
        onChange={handleFileChange}
        className="border rounded p-2"
      />
    </div>
  );
}