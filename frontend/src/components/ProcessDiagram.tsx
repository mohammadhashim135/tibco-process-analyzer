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
      <div className="h-175 rounded-xl border bg-white shadow-sm flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📄</div>

          <p className="text-xl font-semibold text-slate-800">
            No Process Loaded
          </p>

          <p className="mt-2 text-slate-500">
            Upload a <code>.process</code> file to generate
            an interactive workflow diagram.
          </p>
        </div>
      </div>
    );
  }

  const nodes: Node[] = [];

  // Start
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
      borderRadius: 12,
      width: 170,
      padding: 12,
      textAlign: "center",
      fontWeight: 600,
      boxShadow: "0 2px 8px rgba(34,197,94,.30)",
    },
  });

  // Activities
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
        border: "1px solid #2563eb",
        borderRadius: 12,
        width: 220,
        padding: 12,
        textAlign: "center",
        fontWeight: 600,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      },
    });
  });

  // Groups
  process.groups.forEach((group, index) => {
    nodes.push({
      id: group.name,
      position: {
        x: 340,
        y: index * 150,
      },
      data: {
        label: group.name,
      },
      style: {
        background: "#eef2ff",
        color: "#4338ca",
        border: "1px solid #818cf8",
        borderRadius: 12,
        width: 220,
        padding: 12,
        textAlign: "center",
        fontWeight: 600,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      },
    });
  });

  // End
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
      borderRadius: 12,
      width: 170,
      padding: 12,
      textAlign: "center",
      fontWeight: 600,
      boxShadow: "0 2px 8px rgba(239,68,68,.30)",
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
          color: isError ? "#dc2626" : "#2563eb",
        },

        labelStyle: {
          fill: isError ? "#dc2626" : "#334155",
          fontWeight: 600,
          fontSize: 12,
        },

        labelBgStyle: {
          fill: "#ffffff",
          fillOpacity: 0.9,
        },

        style: {
          stroke: isError ? "#dc2626" : "#2563eb",
          strokeWidth: isError ? 3 : 2,
          strokeDasharray: isError ? "8 4" : undefined,
        },
      };
    }
  );

  return (
    <div className="h-175 rounded-xl border bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-slate-50 px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Process Diagram
          </h2>

          <p className="text-sm text-slate-500">
            Visual representation of the uploaded
            TIBCO BusinessWorks process.
          </p>
        </div>

        <div className="flex gap-8 text-center">
          <div>
            <p className="text-lg font-bold text-slate-900">
              {process.activities.length}
            </p>

            <p className="text-xs text-slate-500 uppercase">
              Activities
            </p>
          </div>

          <div>
            <p className="text-lg font-bold text-slate-900">
              {process.transitions.length}
            </p>

            <p className="text-xs text-slate-500 uppercase">
              Transitions
            </p>
          </div>

          <div>
            <p className="text-lg font-bold text-slate-900">
              {process.groups.length}
            </p>

            <p className="text-xs text-slate-500 uppercase">
              Groups
            </p>
          </div>
        </div>
      </div>

      {/* Diagram */}
      <div className="h-155">
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
            color="#e2e8f0"
            gap={20}
          />

          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}