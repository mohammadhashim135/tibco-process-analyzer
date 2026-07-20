"use client";

import { Analysis } from "@/types/analysis";

interface AnalysisProps {
  analysis: Analysis | null;
}

const complexityStyles = {
  Simple: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  Complex: "bg-red-100 text-red-700",
};

export default function AnalysisPanel({
  analysis,
}: AnalysisProps) {
  if (!analysis) {
    return (
      <div className="h-175 rounded-xl border bg-white shadow-sm p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-slate-900">
          AI Analysis
        </h2>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-slate-700">
              No Analysis Yet
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Upload a <code>.process</code> file to generate an
              AI-powered SAP CPI migration analysis.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Safely destructure with defaults
  const {
    flow,
    steps = [],
    adapters = [],
    mappings = [],
    errorHandling,
  } = analysis.sapCpiDesign;

  return (
    <div className="h-175 rounded-xl border bg-white shadow-sm overflow-y-auto p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">
        AI Analysis
      </h2>

      {/* Summary */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Summary
        </h3>

        <p className="text-slate-700 leading-7">
          {analysis.summary}
        </p>
      </section>

      {/* Complexity */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Complexity
        </h3>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
            complexityStyles[
              analysis.complexity as keyof typeof complexityStyles
            ] ?? "bg-slate-100 text-slate-700"
          }`}
        >
          {analysis.complexity}
        </span>
      </section>

      {/* Reasoning */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
          Reasoning
        </h3>

        <p className="text-slate-700 leading-7">
          {analysis.reasoning}
        </p>
      </section>

      {/* SAP CPI Design */}
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">
          SAP CPI Design
        </h3>

        <div className="space-y-4">
          {/* Flow */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-semibold text-slate-900 mb-2">
              Flow
            </h4>

            <p className="text-slate-700 leading-7">
              {flow}
            </p>
          </div>

          {/* Steps */}
          {steps.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Migration Steps
              </h4>

              <ul className="space-y-2">
                {steps.map((step) => (
                  <li
                    key={step}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 text-green-600 font-bold">
                      ✓
                    </span>

                    <span className="text-slate-700">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Adapters */}
          {adapters.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Adapters
              </h4>

              <div className="flex flex-wrap gap-2">
                {adapters.map((adapter) => (
                  <span
                    key={adapter}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                  >
                    {adapter}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mappings */}
          {mappings.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Mappings
              </h4>

              <ul className="space-y-2">
                {mappings.map((mapping) => (
                  <li
                    key={mapping}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 text-indigo-600 font-bold">
                      →
                    </span>

                    <span className="text-slate-700">
                      {mapping}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Error Handling */}
          {errorHandling && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h4 className="font-semibold text-red-700 mb-2">
                Error Handling
              </h4>

              <p className="text-slate-700 leading-7">
                {errorHandling}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}