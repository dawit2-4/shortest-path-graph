// hooks/use-graph.ts (Enhanced version)
"use client";

import { useState } from "react";
import { dijkstra } from "@/algorithm/dijkstra";
import { Node, Edge } from "@/types/graph";

export function useGraph(nodes: Node[], edges: Edge[]) {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [startNode, setStartNode] = useState<string | null>(null);
  const [endNode, setEndNode] = useState<string | null>(null);
  const [shortestPath, setShortestPath] = useState<string[] | null>(null);
  const [shortestDistance, setShortestDistance] = useState<number | null>(null);
  const [showShortestPath, setShowShortestPath] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const selectNode = (nodeId: string) => {
    setSelectedPath((prev) => {
      // If clicking the same node twice, remove it
      if (prev.length > 0 && prev[prev.length - 1] === nodeId) {
        return prev.slice(0, -1);
      }
      // Add the node to the path
      return [...prev, nodeId];
    });

    // Reset results when path changes
    setIsCorrect(null);
    setShowShortestPath(false);
  };

  const resetPath = () => {
    setSelectedPath([]);
    setStartNode(null);
    setEndNode(null);
    setShortestPath(null);
    setShortestDistance(null);
    setShowShortestPath(false);
    setIsCorrect(null);
  };

  const setStartEnd = () => {
    if (selectedPath.length >= 2) {
      setStartNode(selectedPath[0]);
      setEndNode(selectedPath[selectedPath.length - 1]);
    }
  };

  const checkPath = () => {
    if (!startNode || !endNode) return;

    const result = dijkstra(nodes, edges, startNode, endNode);

    if (result) {
      setShortestPath(result.path);
      setShortestDistance(result.distance);

      // Check if user's path matches shortest path
      const pathsMatch =
        selectedPath.length === result.path.length &&
        selectedPath.every((node, index) => node === result.path[index]);

      setIsCorrect(pathsMatch);
    }
  };

  const revealShortest = () => {
    if (!shortestPath && startNode && endNode) {
      checkPath();
    }
    setShowShortestPath(!showShortestPath);
  };

  const canCheckPath =
    startNode !== null && endNode !== null && selectedPath.length >= 2;

  return {
    selectedPath,
    startNode,
    endNode,
    shortestPath,
    shortestDistance,
    showShortestPath,
    isCorrect,
    canCheckPath,
    selectNode,
    resetPath,
    setStartEnd,
    checkPath,
    revealShortest,
  };
}
