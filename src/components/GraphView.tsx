import {
  BaseEdge,
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import type { GraphData } from "../logic/matrixToGraph";

interface GraphViewProps {
  graph: GraphData;
}

/*
 * Окремий edge для петлі.
 *
 * Петля малюється як крива, яка виходить
 * з вершини та повертається до неї.
 */
const LoopEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
}: EdgeProps) => {
  const offset = 45;

  let path: string;

  if (sourcePosition === "top") {
    path = `
      M ${sourceX} ${sourceY}
      C ${sourceX - offset} ${sourceY - offset * 2},
        ${targetX + offset} ${targetY - offset * 2},
        ${targetX} ${targetY}
    `;
  } else if (sourcePosition === "bottom") {
    path = `
      M ${sourceX} ${sourceY}
      C ${sourceX - offset} ${sourceY + offset * 2},
        ${targetX + offset} ${targetY + offset * 2},
        ${targetX} ${targetY}
    `;
  } else if (sourcePosition === "left") {
    path = `
      M ${sourceX} ${sourceY}
      C ${sourceX - offset * 2} ${sourceY - offset},
        ${targetX - offset * 2} ${targetY + offset},
        ${targetX} ${targetY}
    `;
  } else {
    path = `
      M ${sourceX} ${sourceY}
      C ${sourceX + offset * 2} ${sourceY - offset},
        ${targetX + offset * 2} ${targetY + offset},
        ${targetX} ${targetY}
    `;
  }

  return (
    <BaseEdge
      path={path}
      style={{
        strokeWidth: 2,
      }}
    />
  );
};

const edgeTypes = {
  loop: LoopEdge,
};

export const GraphView = ({ graph }: GraphViewProps) => {
  const nodes: Node[] = graph.nodes.map((node) => ({
    id: node.id,

    position: {
      x: node.x,
      y: node.y,
    },

    data: {
      label: node.label,
    },

    type: "default",
  }));

  const edges: Edge[] = graph.edges.map((edge) => ({
    id: edge.id,

    source: edge.source,
    target: edge.target,

    type: edge.isLoop ? "loop" : "default",

    animated: false,

    style: {
      strokeWidth: 2,
    },
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        border: "1px solid black",
        marginTop: "30px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{
          padding: 0.3,
        }}
      >
        <Background />

        <Controls />
      </ReactFlow>
    </div>
  );
};