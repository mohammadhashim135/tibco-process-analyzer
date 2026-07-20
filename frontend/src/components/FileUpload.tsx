"use client";

import { ChangeEvent, useState } from "react";
import { api } from "@/lib/api";
import { ProcessModel } from "@/types/process";
import { Analysis } from "@/types/analysis";

interface Props {
  onSuccess: (process: ProcessModel) => void;
  onAnalysis: (analysis: Analysis) => void;
}

export default function FileUpload({
  onSuccess,
  onAnalysis,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file || loading) return;

    setFileName(file.name);
    setLoading(true);
    setLoadingMessage("Uploading process...");

    const formData = new FormData();
    formData.append("process", file);

    try {
      // Upload process
      const response = await api.post(
        "/process/upload",
        formData
      );

      const process: ProcessModel = response.data.data;

      onSuccess(process);

      setLoadingMessage("Generating AI analysis...");

      // AI Analysis
      const aiResponse = await api.post(
        "/ai/analyze",
        process
      );

      const analysis: Analysis = aiResponse.data.data;

      onAnalysis(analysis);

      setLoadingMessage("Completed");
    } catch (error) {
      console.error(error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 transition-all">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-900">
          Upload TIBCO Process
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Select a <code>.process</code> file to visualize the workflow
          and generate an AI-powered SAP CPI migration analysis.
        </p>

        <label
          className={`mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow transition-all ${
            loading
              ? "cursor-not-allowed bg-slate-400"
              : "cursor-pointer bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}

          {loading ? "Analyzing..." : "Choose Process File"}

          <input
            type="file"
            accept=".process"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
          />
        </label>

        {fileName && (
          <p className="mt-4 text-sm text-slate-600">
            <span className="font-medium">Selected:</span>{" "}
            {fileName}
          </p>
        )}

        {loading && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

            <p className="text-sm font-medium text-slate-700">
              {loadingMessage}
            </p>

            <p className="text-xs text-slate-500">
              This may take a few seconds depending on the process size.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}