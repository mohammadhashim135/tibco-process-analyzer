"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import ProcessDiagram from "@/components/ProcessDiagram";
import { ProcessModel } from "@/types/process";

export default function Home() {
  const [process, setProcess] = useState<ProcessModel | null>(null);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        TIBCO Process Analyzer
      </h1>

      <FileUpload onSuccess={setProcess} />

      <div className="mt-8">
        <ProcessDiagram process={process} />
      </div>
    </main>
  );
}