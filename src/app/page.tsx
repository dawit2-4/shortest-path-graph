// app/page.tsx (Final version)
"use client";

import GraphCanvas from "@/component/graph-canvas";
import ControlPanel from "@/component/control-panel";
import PathDisplay from "@/component/path-display";
import { useGraph } from "@/hooks/use-graph";
import { sampleGraph } from "@/data/graph-data";

export default function Home() {
  const {
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
  } = useGraph(sampleGraph.nodes, sampleGraph.edges);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Graph Path Visualizer
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Find the shortest path between nodes using Dijkstra's algorithm
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graph Canvas */}
          <div className="lg:col-span-2">
            <GraphCanvas
              nodes={sampleGraph.nodes}
              edges={sampleGraph.edges}
              selectedPath={selectedPath}
              shortestPath={showShortestPath ? shortestPath : null}
              startNode={startNode}
              endNode={endNode}
              onNodeClick={selectNode}
            />
          </div>

          {/* Control Panel */}
          <div>
            <ControlPanel
              selectedPath={selectedPath}
              startNode={startNode}
              endNode={endNode}
              onReset={resetPath}
              onSetStartEnd={setStartEnd}
              onCheckPath={checkPath}
              onRevealShortest={revealShortest}
              canCheckPath={canCheckPath}
              showShortestPath={showShortestPath}
            />

            {/* Path Display */}
            {shortestPath && (
              <PathDisplay
                userPath={selectedPath}
                shortestPath={shortestPath}
                shortestDistance={shortestDistance}
                isCorrect={isCorrect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
