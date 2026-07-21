"use client";

import { useState } from "react";
import {
  Workflow,
  Sparkles,
  FileCode,
  GitBranch,
} from "lucide-react";

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
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Hero */}
        <section className="mb-8 rounded-3xl border border-slate-200 bg-white shadow-lg">
          <div className="p-10">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-emerald-100 p-4">
                <Workflow
                  size={34}
                  className="text-emerald-700"
                />
              </div>

              <div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                  TIBCO BW 5.x Process Analyzer
                </h1>

                <p className="mt-2 text-slate-600 text-lg">
                  Parse, visualize, inspect, and generate SAP CPI
                  migration recommendations from BusinessWorks
                  process definitions.
                </p>
              </div>

            </div>

            {/* Feature badges */}
            <div className="mt-8 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                <FileCode size={16} />
                XML Parsing
              </div>

              <div className="flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
                <GitBranch size={16} />
                Workflow Visualization
              </div>

              <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
                <Sparkles size={16} />
                Migration Analysis
              </div>

            </div>

          </div>
        </section>

        {/* Upload */}
        <section className="mb-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-8 py-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Upload BusinessWorks Process
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload a BW 5.x <code>.process</code> file to begin
              parsing and analysis.
            </p>
          </div>

          <div className="p-8">
            <FileUpload
              onSuccess={setProcess}
              onAnalysis={setAnalysis}
            />
          </div>
        </section>

        {/* Main Grid */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">

          {/* Workflow */}
          <div className="xl:col-span-7">

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Workflow Diagram
                  </h2>

                  <p className="text-sm text-slate-500">
                    Visual representation of the parsed process.
                  </p>
                </div>

                <Workflow
                  className="text-emerald-600"
                  size={24}
                />

              </div>

              <div className="p-6">
                <ProcessDiagram process={process} />
              </div>

            </div>

          </div>

          {/* Analysis */}
          <div className="xl:col-span-5">

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Migration Analysis
                  </h2>

                  <p className="text-sm text-slate-500">
                    AI-generated migration insights and SAP CPI
                    recommendations.
                  </p>
                </div>

                <Sparkles
                  className="text-amber-500"
                  size={24}
                />

              </div>

              <div className="p-6">
                <AnalysisPanel analysis={analysis} />
              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}