"use client";

import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { ProcessModel } from "@/types/process";

interface Props {
  process: ProcessModel | null;
}

export default function ProcessDiagram({ process }: Props) {
  if (!process) {
    return (
      <div className="h-175 flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-slate-400 text-lg shadow-xl">
        Upload a process file
      </div>
    );
  }

  const nodes: Node[] = [];

  // Start Node
  nodes.push({
    id: process.start,
    position: { x: 0, y: 0 },
    data: { label: process.start },
    style: {
      background: "#16a34a",
      color: "#fff",
      border: "2px solid #22c55e",
      borderRadius: "12px",
      width: 180,
      padding: "10px",
      textAlign: "center",
      fontWeight: 600,
      boxShadow: "0 6px 18px rgba(34,197,94,.35)",
    },
  });

  // Activity Nodes
  process.activities.forEach((activity, index) => {
    nodes.push({
      id: activity.name,
      position: {
        x: 0,
        y: (index + 1) * 120,
      },
      data: {
        label: activity.name,
      },
      style: {
        background: "#1e293b",
        color: "#fff",
        border: "1px solid #3b82f6",
        borderRadius: "12px",
        width: 200,
        padding: "10px",
        textAlign: "center",
        fontWeight: 500,
        boxShadow: "0 6px 18px rgba(59,130,246,.25)",
      },
    });
  });

  // Group Nodes
  process.groups.forEach((group, index) => {
    nodes.push({
      id: group.name,
      position: {
        x: 300,
        y: index * 150,
      },
      data: {
        label: group.name,
      },
      style: {
        background: "#7c3aed",
        color: "#fff",
        border: "1px solid #a78bfa",
        borderRadius: "12px",
        width: 200,
        padding: "10px",
        textAlign: "center",
        fontWeight: 600,
        boxShadow: "0 6px 18px rgba(124,58,237,.3)",
      },
    });
  });

  // End Node
  nodes.push({
    id: process.end,
    position: {
      x: 0,
      y: (process.activities.length + 2) * 120,
    },
    data: {
      label: process.end,
    },
    style: {
      background: "#dc2626",
      color: "#fff",
      border: "2px solid #ef4444",
      borderRadius: "12px",
      width: 180,
      padding: "10px",
      textAlign: "center",
      fontWeight: 600,
      boxShadow: "0 6px 18px rgba(239,68,68,.35)",
    },
  });

  const edges: Edge[] = process.transitions.map((transition, index) => ({
    id: String(index),
    source: transition.from,
    target: transition.to,
    animated: true,
    style: {
      stroke:
        transition.condition === "error"
          ? "#ef4444"
          : "#60a5fa",
      strokeWidth: 2,
    },
    label: transition.condition,
    labelStyle: {
      fill: "#ffffff",
      fontSize: 12,
      fontWeight: 600,
    },
    labelBgStyle: {
      fill: "#0f172a",
      fillOpacity: 0.9,
    },
  }));

  return (
    <div className="h-175 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        defaultEdgeOptions={{
          type: "smoothstep",
        }}
      >
        <Background
          color="#334155"
          gap={24}
          size={1.5}
        />
        <Controls
          position="bottom-right"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}