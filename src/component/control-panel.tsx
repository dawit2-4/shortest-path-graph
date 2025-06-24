// components/control-panel.tsx (Enhanced version)
"use client";

interface ControlPanelProps {
  selectedPath: string[];
  startNode: string | null;
  endNode: string | null;
  onReset: () => void;
  onSetStartEnd: () => void;
  onCheckPath: () => void;
  onRevealShortest: () => void;
  canCheckPath: boolean;
  showShortestPath: boolean;
}

export default function ControlPanel({
  selectedPath,
  startNode,
  endNode,
  onReset,
  onSetStartEnd,
  onCheckPath,
  onRevealShortest,
  canCheckPath,
  showShortestPath,
}: ControlPanelProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-300">
      <h3 className="text-lg font-bold mb-4">Controls</h3>

      {/* Instructions */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-blue-800 text-sm">
          1. Click nodes to build your path
          <br />
          2. Set start and end points
          <br />
          3. Check if your path is optimal!
        </p>
      </div>

      {/* Show selected path */}
      <div className="mb-4">
        <p className="font-medium">Selected Path:</p>
        <p className="text-blue-600 bg-gray-50 p-2 rounded text-sm">
          {selectedPath.length > 0
            ? selectedPath.join(" → ")
            : "Click nodes to build path"}
        </p>
      </div>

      {/* Show start/end */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm font-medium">Start:</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">{startNode || "Not set"}</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">End:</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm">{endNode || "Not set"}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={onSetStartEnd}
          disabled={selectedPath.length < 2}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors"
        >
          Set Start & End
        </button>

        <button
          onClick={onCheckPath}
          disabled={!canCheckPath}
          className="w-full bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-green-600 transition-colors"
        >
          Check My Path
        </button>

        <button
          onClick={onRevealShortest}
          disabled={!canCheckPath}
          className="w-full bg-purple-500 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-purple-600 transition-colors"
        >
          {showShortestPath ? "Hide" : "Show"} Shortest Path
        </button>

        <button
          onClick={onReset}
          className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Reset All
        </button>
      </div>
    </div>
  );
}
