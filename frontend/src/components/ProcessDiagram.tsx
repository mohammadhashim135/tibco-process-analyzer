"use client";

import { ProcessModel } from "@/types/process";

interface Props {
  process: ProcessModel | null;
}

export default function ProcessDiagram({
  process,
}: Props) {
  if (!process) {
    return (
      <div className="border rounded p-4 h-150">
        Upload a process file
      </div>
    );
  }

  return (
    <div className="border rounded p-4 h-150 overflow-auto">
      <pre>
        {JSON.stringify(process, null, 2)}
      </pre>
    </div>
  );
}