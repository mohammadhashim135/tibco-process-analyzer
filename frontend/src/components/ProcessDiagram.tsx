"use client";

import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { ProcessModel } from "@/types/process";

interface Props {
  process: ProcessModel | null;
}

export default function ProcessDiagram({
  process,
}: Props) {
  if (!process) {
    return (
      <div className="h-175 rounded-3xl border border-slate-200 bg-white shadow-sm flex items-center justify-center">
        <div className="text-center">
          <div className="mb-5 text-6xl">📄</div>

          <h2 className="text-2xl font-bold text-slate-900">
            No Process Available
          </h2>

          <p className="mt-3 max-w-md text-slate-500 leading-7">
            Upload a <code>.process</code> file to visualize the
            BusinessWorks workflow and inspect activity relationships.
          </p>
        </div>
      </div>
    );
  }

  const nodes: Node[] = [];

  // Start Node
  nodes.push({
    id: process.start,
    position: {
      x: 0,
      y: 0,
    },
    data: {
      label: "Start",
    },
    style: {
      background: "#22c55e",
      color: "#fff",
      border: "2px solid #16a34a",
      borderRadius: 14,
      width: 180,
      padding: 14,
      textAlign: "center",
      fontWeight: 600,
      boxShadow: "0 8px 18px rgba(34,197,94,.25)",
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
        background: "#ffffff",
        color: "#0f172a",
        border: "1px solid #10b981",
        borderRadius: 14,
        width: 230,
        padding: 14,
        textAlign: "center",
        fontWeight: 600,
        boxShadow: "0 6px 14px rgba(15,23,42,.08)",
      },
    });
  });

  // Group Nodes
  process.groups.forEach((group, index) => {
    nodes.push({
      id: group.name,
      position: {
        x: 360,
        y: index * 150,
      },
      data: {
        label: group.name,
      },
      style: {
        background: "#f8fafc",
        color: "#334155",
        border: "1px solid #cbd5e1",
        borderRadius: 14,
        width: 230,
        padding: 14,
        textAlign: "center",
        fontWeight: 600,
        boxShadow: "0 6px 14px rgba(15,23,42,.06)",
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
      label: "End",
    },
    style: {
      background: "#ef4444",
      color: "#fff",
      border: "2px solid #dc2626",
      borderRadius: 14,
      width: 180,
      padding: 14,
      textAlign: "center",
      fontWeight: 600,
      boxShadow: "0 8px 18px rgba(239,68,68,.25)",
    },
  });

  const edges: Edge[] = process.transitions.map(
    (transition, index) => {
      const isError =
        transition.condition
          ?.toLowerCase()
          .includes("error") ?? false;

      return {
        id: String(index),
        source: transition.from,
        target: transition.to,
        type: "smoothstep",
        animated: isError,
        label: transition.condition,

        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isError ? "#dc2626" : "#10b981",
        },

        labelStyle: {
          fill: isError ? "#dc2626" : "#334155",
          fontWeight: 600,
          fontSize: 12,
        },

        labelBgStyle: {
          fill: "#ffffff",
          fillOpacity: 0.95,
        },

        style: {
          stroke: isError ? "#dc2626" : "#10b981",
          strokeWidth: isError ? 3 : 2,
          strokeDasharray: isError ? "8 4" : undefined,
        },
      };
    }
  );

  return (
    <div className="h-175 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Process Workflow
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Interactive visualization of the uploaded
            BusinessWorks process.
          </p>
        </div>

        <div className="flex gap-4">

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2 text-center">
            <p className="text-lg font-bold text-slate-900">
              {process.activities.length}
            </p>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Activities
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2 text-center">
            <p className="text-lg font-bold text-slate-900">
              {process.transitions.length}
            </p>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Transitions
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2 text-center">
            <p className="text-lg font-bold text-slate-900">
              {process.groups.length}
            </p>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Groups
            </p>
          </div>

        </div>
      </div>

      {/* Diagram */}
      <div className="h-155 bg-slate-50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{
            padding: 0.3,
          }}
          defaultEdgeOptions={{
            type: "smoothstep",
            animated: false,
          }}
        >
          <Background
            color="#d1d5db"
            gap={24}
          />

          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}