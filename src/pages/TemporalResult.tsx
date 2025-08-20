// src/pages/TemporalResult.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TemporalResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.temporal;

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      {/* Header */}
      <div className="bg-[#a94064] rounded-xl py-8 px-4 text-center mb-10">
        <h1 className="text-white text-[48px] font-bold">
          Temporal Inconsistency Result
        </h1>
      </div>

      {result ? (
        <div className="bg-[#f9f1f3] border border-[#a94064] rounded-2xl px-8 py-6 shadow-lg text-[#a94064] max-w-4xl mx-auto space-y-6">
          {/* Detection Summary */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Detection Summary</h2>
            <pre className="whitespace-pre-wrap bg-white p-4 rounded border text-gray-800">
              {result.text_output || "No details available"}
            </pre>
          </div>

          {/* Graph */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Analysis Graph</h2>
            {result.graph_base64 ? (
              <img
                src={`data:image/png;base64,${result.graph_base64}`}
                alt="Temporal Graph"
                className="rounded-lg border"
              />
            ) : (
              <p className="text-gray-600">No graph available</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">
          No temporal inconsistency data found.
        </p>
      )}

      {/* Back Button */}
      <div className="text-center mt-10">
        <button
          className="bg-[#a94064] text-white px-6 py-3 rounded-xl text-lg font-semibold"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default TemporalResult;
