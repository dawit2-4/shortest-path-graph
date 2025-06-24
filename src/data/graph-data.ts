import { GraphData } from "@/types/graph";
export const sampleGraph: GraphData = {
  nodes: [
    { id: "A", x: 100, y: 100, label: "A" },
    { id: "B", x: 300, y: 100, label: "B" },
    { id: "C", x: 200, y: 200, label: "C" },
    { id: "D", x: 400, y: 200, label: "D" },
  ],
  edges: [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "D", weight: 3 },
    { from: "C", to: "D", weight: 1 },
  ],
};
