// components/path-display.tsx
"use client";

interface PathDisplayProps {
  userPath: string[];
  shortestPath: string[] | null;
  shortestDistance: number | null;
  isCorrect: boolean | null;
}

export default function PathDisplay({
  userPath,
  shortestPath,
  shortestDistance,
  isCorrect,
}: PathDisplayProps) {
  if (!shortestPath) return null;

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-300 mt-4">
      <h3 className="text-lg font-bold mb-4">Path Analysis</h3>

      {/* Result indicator */}
      {isCorrect !== null && (
        <div
          className={`p-3 rounded-lg mb-4 ${
            isCorrect
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <p
            className={`font-medium ${
              isCorrect ? "text-green-800" : "text-red-800"
            }`}
          >
            {isCorrect
              ? "🎉 Correct! You found the shortest path!"
              : "❌ Not optimal. Try again!"}
          </p>
        </div>
      )}

      {/* Path comparison */}
      <div className="space-y-3">
        <div>
          <p className="font-medium text-gray-700">Your Path:</p>
          <p className="text-blue-600 bg-blue-50 p-2 rounded">
            {userPath.join(" → ")} ({userPath.length} nodes)
          </p>
        </div>

        <div>
          <p className="font-medium text-gray-700">Shortest Path:</p>
          <p className="text-green-600 bg-green-50 p-2 rounded">
            {shortestPath.join(" → ")} ({shortestPath.length} nodes)
          </p>
        </div>

        {shortestDistance && (
          <div>
            <p className="font-medium text-gray-700">Total Distance:</p>
            <p className="text-purple-600 bg-purple-50 p-2 rounded">
              {shortestDistance} units
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
