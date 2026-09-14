import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import type { GraphData } from "../logic/matrixToGraph";

interface GraphViewProps {
  graph: GraphData;
}

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
  }));

  const edges: Edge[] = graph.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }));

  return (
    <div
      style={{
        width: "1200px",
        height: "1000px",
        border: "1px solid black",
        marginTop: "30px",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};