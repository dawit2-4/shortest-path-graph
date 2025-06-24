// algorithms/dijkstra.ts
import { Node, Edge } from "@/types/graph";

interface DijkstraResult {
  path: string[];
  distance: number;
}

export function dijkstra(
  nodes: Node[],
  edges: Edge[],
  startId: string,
  endId: string
): DijkstraResult | null {
  // Create adjacency list representation of the graph
  const graph: Record<string, Array<{ node: string; weight: number }>> = {};

  // Initialize graph structure
  nodes.forEach((node) => {
    graph[node.id] = [];
  });

  // Populate adjacency list with edges (undirected graph)
  edges.forEach((edge) => {
    graph[edge.from].push({ node: edge.to, weight: edge.weight });
    graph[edge.to].push({ node: edge.from, weight: edge.weight });
  });

  // Dijkstra's algorithm implementation
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const unvisited = new Set<string>();

  // Initialize distances and previous nodes
  nodes.forEach((node) => {
    distances[node.id] = node.id === startId ? 0 : Number.POSITIVE_INFINITY;
    previous[node.id] = null;
    unvisited.add(node.id);
  });

  while (unvisited.size > 0) {
    // Find unvisited node with minimum distance
    let currentNode: string | null = null;
    let minDistance = Number.POSITIVE_INFINITY;

    for (const nodeId of unvisited) {
      if (distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        currentNode = nodeId;
      }
    }

    // If no reachable unvisited nodes remain, break
    if (
      currentNode === null ||
      distances[currentNode] === Number.POSITIVE_INFINITY
    ) {
      break;
    }

    // Remove current node from unvisited set
    unvisited.delete(currentNode);

    // If we reached the target, we can stop
    if (currentNode === endId) {
      break;
    }

    // Update distances to neighbors
    const neighbors = graph[currentNode] || [];
    for (const neighbor of neighbors) {
      if (unvisited.has(neighbor.node)) {
        const newDistance = distances[currentNode] + neighbor.weight;

        if (newDistance < distances[neighbor.node]) {
          distances[neighbor.node] = newDistance;
          previous[neighbor.node] = currentNode;
        }
      }
    }
  }

  // Reconstruct path from end to start
  const path: string[] = [];
  let currentNode: string | null = endId;

  // If there's no path to the end node
  if (distances[endId] === Number.POSITIVE_INFINITY) {
    return null;
  }

  // Build path by following previous nodes
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return {
    path,
    distance: distances[endId],
  };
}
