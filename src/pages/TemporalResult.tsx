import React, { useEffect, useState } from "react";
import fetchTemporal from "../utils/fetchTemporal"; // API call utility

interface TemporalResultProps {
  file: File; // you’ll pass the uploaded audio file
}

const TemporalResult: React.FC<TemporalResultProps> = ({ file }) => {
  const [textOutput, setTextOutput] = useState("");
  const [graphSrc, setGraphSrc] = useState("");

  useEffect(() => {
    const getTemporalResult = async () => {
      try {
        const result = await fetchTemporal(file); // call backend
        setTextOutput(result.text_output);
        setGraphSrc(`data:image/png;base64,${result.graph_base64}`);
      } catch (error) {
        console.error("Error fetching temporal result:", error);
      }
    };

    if (file) {
      getTemporalResult();
    }
  }, [file]);

  return (
    <div className="p-4">
      {/* Console-like text output */}
      <pre className="bg-black text-green-400 p-3 rounded-xl overflow-auto">
        {textOutput}
      </pre>

      {/* Graph */}
      {graphSrc && (
        <img
          src={graphSrc}
          alt="Temporal Analysis Graph"
          className="mt-4 rounded-xl shadow-lg"
        />
      )}
    </div>
  );
};

export default TemporalResult;




