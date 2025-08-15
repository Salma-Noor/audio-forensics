// src/pages/GenderResult.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GenderResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const genderData = location.state?.genderData;

  if (!genderData || !genderData.gender_results) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-red-500">No gender data available</h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gender Detection Results</h1>

      {genderData.gender_results.map((speaker: any, index: number) => (
        <div key={index} className="mb-6 border rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold">{speaker.speaker}</h2>
          <p className="text-gray-700 mb-2">Gender: {speaker.gender}</p>
          <h3 className="font-semibold">Segments:</h3>
          <ul className="list-disc ml-6">
            {speaker.segments.map((segment: any, segIndex: number) => (
              <li key={segIndex}>
                {segment.start} → {segment.end}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default GenderResult;
