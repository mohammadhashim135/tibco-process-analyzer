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
      const response = await api.post(
        "/process/upload",
        formData
      );

      const process: ProcessModel = response.data.data;

      onSuccess(process);

      setLoadingMessage("Generating migration report...");

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
    <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-linear-to-b from-slate-50 to-white p-10 transition-all hover:border-emerald-400">

      <div className="flex flex-col items-center text-center">

        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
          📄
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          Upload BusinessWorks Process
        </h2>

        <p className="mt-3 max-w-xl text-slate-600 leading-7">
          Select a <code>.process</code> file to parse the workflow,
          visualize activities, and generate a SAP CPI migration report.
        </p>

        <label
          className={`mt-8 inline-flex items-center gap-3 rounded-xl px-7 py-3 text-sm font-semibold shadow-md transition-all ${
            loading
              ? "cursor-not-allowed bg-slate-400 text-white"
              : "cursor-pointer bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg"
          }`}
        >
          {loading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}

          {loading
            ? "Processing..."
            : "Choose Process File"}

          <input
            type="file"
            accept=".process"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
          />
        </label>

        <p className="mt-4 text-sm text-slate-500">
          Supported format: <strong>.process</strong>
        </p>

        {fileName && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3">
            <p className="text-sm text-emerald-800">
              <span className="font-semibold">
                Selected File:
              </span>{" "}
              {fileName}
            </p>
          </div>
        )}

        {loading && (
          <div className="mt-8 w-full max-w-md">

            <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-emerald-600" />
            </div>

            <div className="flex items-center justify-center gap-3">

              <div className="h-6 w-6 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />

              <span className="font-medium text-slate-700">
                {loadingMessage}
              </span>

            </div>

            <p className="mt-3 text-sm text-slate-500">
              Parsing process definition and preparing migration
              recommendations...
            </p>

          </div>
        )}

      </div>

    </div>
  );
}