import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Utility to convert seconds -> mm:ss format
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const DiarizationResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const diarizationData = location.state?.diarization;

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="bg-[#a94064] rounded-xl py-8 px-4 text-center mb-10">
        <h1 className="text-white text-[48px] font-bold">Diarization Result</h1>
      </div>

      {diarizationData ? (
        <div className="bg-[#f9f1f3] border border-[#a94064] rounded-2xl px-8 py-6 shadow-lg text-[#a94064] max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            Estimated Speakers: {diarizationData.estimated_speakers}
          </h2>

          {diarizationData.grouped_diarization.map(
            (speakerData: any, index: number) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  {speakerData.speaker}
                </h3>
                {speakerData.segments.map(
                  (segment: [number, number], segIndex: number) => (
                    <p key={segIndex} className="ml-4">
                      ({formatTime(segment[0])}, {formatTime(segment[1])})
                    </p>
                  )
                )}
              </div>
            )
          )}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">
          No diarization data found.
        </p>
      )}

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

export default DiarizationResult;

