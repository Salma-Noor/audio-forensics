import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SentimentResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sentiment = location.state?.sentiment;

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <div className="bg-[#a94064] rounded-xl py-8 px-4 text-center mb-10">
        <h1 className="text-white text-[48px] font-bold">Sentiment Result</h1>
      </div>

      {sentiment ? (
        <div className="bg-[#f9f1f3] border border-[#a94064] rounded-2xl px-8 py-6 shadow-lg text-[#a94064] max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Here is your result:</h2>
          <p className="text-lg leading-relaxed">{sentiment}</p>
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">No sentiment result found.</p>
      )}

      <div className="text-center mt-10">
        <button
          className="bg-[#a94064] text-white px-6 py-3 rounded-xl text-lg font-semibold"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SentimentResult;
