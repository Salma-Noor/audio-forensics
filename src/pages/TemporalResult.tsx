// src/pages/TemporalResult.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TemporalResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // This comes directly from Dashboard.tsx navigate(... { state: { temporal: result } })
  const result = location.state?.temporal;

  if (!result) {
    return (
      <div className="p-6">
        <p className="text-red-600">No temporal result available.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Temporal Inconsistency Results</h1>

      {/* Section 1: Background Splice */}
      <div className="p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold">Background Splice Times</h2>
        <p>{result.background_splice_times?.join(", ") || "None"}</p>
      </div>

      {/* Section 2: Phase Mismatch */}
      <div className="p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold">Phase Mismatch Times</h2>
        <p>{result.phase_mismatch_times?.join(", ") || "None"}</p>
      </div>

      {/* Section 3: Graph */}
      <div className="p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold">Analysis Graph</h2>
        {result.graph_base64 ? (
          <img
            src={`data:image/png;base64,${result.graph_base64}`}
            alt="Temporal Graph"
            className="rounded-lg border"
          />
        ) : (
          <p>No graph available</p>
        )}
      </div>

      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default TemporalResult;

