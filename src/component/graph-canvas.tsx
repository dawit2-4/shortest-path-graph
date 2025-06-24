// components/graph-canvas.tsx
"use client";

import { Node, Edge } from "@/types/graph";

interface GraphCanvasProps {
  nodes: Node[];
  edges: Edge[];
  selectedPath: string[];
  shortestPath: string[] | null;
  startNode: string | null;
  endNode: string | null;
  onNodeClick: (nodeId: string) => void;
}

export default function GraphCanvas({
  nodes,
  edges,
  selectedPath,
  shortestPath,
  startNode,
  endNode,
  onNodeClick,
}: GraphCanvasProps) {
  // Helper function to get node color based on its role
  const getNodeColor = (nodeId: string) => {
    if (nodeId === startNode) return "#10b981"; // green for start
    if (nodeId === endNode) return "#ef4444"; // red for end
    if (selectedPath.includes(nodeId)) return "#3b82f6"; // blue for selected
    return "#6b7280"; // gray for default
  };

  // Helper function to check if an edge is part of a path
  const isEdgeInPath = (edge: Edge, path: string[]) => {
    for (let i = 0; i < path.length - 1; i++) {
      if (
        (path[i] === edge.from && path[i + 1] === edge.to) ||
        (path[i] === edge.to && path[i + 1] === edge.from)
      ) {
        return true;
      }
    }
    return false;
  };

  // Helper function to get edge styling
  const getEdgeStyle = (edge: Edge) => {
    const isInSelected = isEdgeInPath(edge, selectedPath);
    const isInShortest = shortestPath && isEdgeInPath(edge, shortestPath);

    if (isInShortest && isInSelected) {
      return { stroke: "#10b981", strokeWidth: 4 }; // green for correct path
    } else if (isInSelected) {
      return { stroke: "#3b82f6", strokeWidth: 3 }; // blue for selected
    } else if (isInShortest) {
      return { stroke: "#f59e0b", strokeWidth: 3 }; // amber for shortest path
    }
    return { stroke: "#9ca3af", strokeWidth: 2 }; // gray for default
  };

  return (
    <div className="w-full border border-gray-300 rounded-lg">
      <svg width="600" height="400" className="bg-white">
        {/* Render edges first */}
        {edges.map((edge, index) => {
          const fromNode = nodes.find((n) => n.id === edge.from);
          const toNode = nodes.find((n) => n.id === edge.to);

          if (!fromNode || !toNode) return null;

          const edgeStyle = getEdgeStyle(edge);
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;

          return (
            <g key={`edge-${index}`}>
              {/* Edge line */}
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                {...edgeStyle}
                className="transition-all duration-300"
              />

              {/* Weight label background */}
              <circle
                cx={midX}
                cy={midY}
                r="12"
                fill="white"
                stroke={edgeStyle.stroke}
                strokeWidth="2"
              />

              {/* Weight label text */}
              <text
                x={midX}
                y={midY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-bold fill-gray-700"
              >
                {edge.weight}
              </text>
            </g>
          );
        })}

        {/* Render nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill={getNodeColor(node.id)}
              stroke="white"
              strokeWidth="3"
              className="cursor-pointer hover:opacity-80 transition-all duration-200"
              onClick={() => onNodeClick(node.id)}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-white font-bold pointer-events-none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
