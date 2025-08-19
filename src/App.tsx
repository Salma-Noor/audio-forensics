// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TranscribeResult from "./pages/TranscribeResult";
import SentimentResult from "./pages/SentimentResult";
import GenderResult from "./pages/GenderResult";
import DiarizationResult from "./pages/DiarizationResult";
import TemporalResult from "./pages/TemporalResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transcribe-result" element={<TranscribeResult />} />
        <Route path="/sentiment-result" element={<SentimentResult />} />
        <Route path="/gender-result" element={<GenderResult />} />
        <Route path="/diarization-result" element={<DiarizationResult />} />
        <Route path="/temporal-result" element={<TemporalResult />} />
      </Routes>
    </Router>
  );
}

export default App;










