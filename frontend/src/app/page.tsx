"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import ProcessDiagram from "@/components/ProcessDiagram";
import AnalysisPanel from "@/components/AnalysisPanel";
import { ProcessModel } from "@/types/process";
import { Analysis } from "@/types/analysis";

export default function Home() {
  const [process, setProcess] =
    useState<ProcessModel | null>(null);

  const [analysis, setAnalysis] =
    useState<Analysis | null>(null);

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8 rounded-xl bg-white border shadow-sm p-8">
          <h1 className="text-4xl font-bold text-slate-900">
            TIBCO BW 5.x Process Analyzer
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600 leading-7">
            Upload a TIBCO BusinessWorks process file to visualize
            its workflow and generate an AI-powered SAP CPI migration
            analysis with recommended integration flow design.
          </p>
        </div>

        <div className="mb-8">
          <FileUpload
            onSuccess={setProcess}
            onAnalysis={setAnalysis}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-7">
            <ProcessDiagram process={process} />
          </div>

          <div className="xl:col-span-5">
            <AnalysisPanel analysis={analysis} />
          </div>
        </div>
      </div>
    </main>
  );
}