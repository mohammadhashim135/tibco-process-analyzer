"use client";

import { ChangeEvent } from "react";
import { api } from "@/lib/api";
import { ProcessModel } from "@/types/process";


interface Props {
  onSuccess: (process: ProcessModel) => void;
}

export default function FileUpload({ onSuccess }: Props) {
  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("process", file);

    try {
      const response = await api.post("/process/upload", formData);

      onSuccess(response.data.data);
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