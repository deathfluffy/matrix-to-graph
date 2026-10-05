import type { Matrix } from "../types/matrix";

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  isLoop: boolean;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const matrixToGraph = (matrix: Matrix): GraphData => {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  const nodeCount = matrix.length;

  const centerX = 300;
  const centerY = 250;
  const radius = 180;

  // Створення вершин
  for (let i = 0; i < nodeCount; i++) {
    const angle = (2 * Math.PI * i) / nodeCount;

    const x =
      centerX + radius * Math.cos(angle);

    const y =
      centerY + radius * Math.sin(angle);

    nodes.push({
      id: String(i + 1),
      label: String(i + 1),
      x,
      y,
    });
  }

  // Створення ребер
  for (let i = 0; i < nodeCount; i++) {
    // Петля: вершина з'єднана сама з собою
    if (matrix[i][i] === 1) {
      edges.push({
        id: `loop-${i + 1}`,
        source: String(i + 1),
        target: String(i + 1),
        isLoop: true,
      });
    }

    // Звичайні ребра
    for (let j = i + 1; j < nodeCount; j++) {
      if (matrix[i][j] === 1) {
        edges.push({
          id: `${i + 1}-${j + 1}`,
          source: String(i + 1),
          target: String(j + 1),
          isLoop: false,
        });
      }
    }
  }

  return {
    nodes,
    edges,
  };
};

export default matrixToGraph;