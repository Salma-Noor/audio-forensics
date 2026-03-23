import { useState, useEffect, useRef } from "react";
import HeroSection from "./components/HeroSection";
import StatsRow from "./components/StatsRow";
import ScanInterface from "./components/ScanInterface";
import ChartPanel from "./components/ChartPanel";
import LogsTable from "./components/LogsTable";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import "./App.css";

const API = "http://localhost:8000";

export default function App() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ total_scans: 0, threats_detected: 0, threat_rate: 0, critical_count: 0 });
  const [toast, setToast] = useState(null);
  const sidRef = useRef(0);
  const toastTimer = useRef(null);

  useEffect(() => {
    loadBackendLogs();
    refreshStats();
    const dateEl = document.getElementById("mdate");
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      }).toUpperCase();
    }
  }, []);

  async function loadBackendLogs() {
    try {
      const r = await fetch(`${API}/logs?limit=100`);
      if (!r.ok) return;
      const data = await r.json();
      const mapped = data.map(l => ({
        id: l.id,
        type: l.scan_type,
        prev: l.input_preview || "",
        prediction: l.prediction,
        rl: l.risk_level,
        conf: normalizeConf(l.confidence),
        ts: new Date(l.timestamp),
      }));
      if (mapped.length) sidRef.current = Math.max(...mapped.map(l => l.id));
      setLogs(mapped);
    } catch (_) {}
  }

  async function refreshStats() {
    try {
      const r = await fetch(`${API}/stats`);
      if (r.ok) { setStats(await r.json()); return; }
    } catch (_) {}
    setStats(prev => prev);
  }

  function normalizeConf(c) {
    if (!c) return 75;
    if (c > 1) c = c / 100;
    return Math.min(Math.round(c * 100), 100);
  }

  function showToast(title, msg, type) {
    setToast({ title, msg, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3800);
  }

  function addLog(data, type, payload) {
    const preview =
      type === "email" ? payload.subject || "No subject" :
      type === "url"   ? payload.url :
                         payload.ip_address;

    const entry = {
      id: data.scan_id || ++sidRef.current,
      type,
      prev: preview,
      prediction: data.prediction,
      rl: data.risk_level,
      conf: normalizeConf(data.confidence),
      ts: new Date(),
    };

    setLogs(prev => {
      if (prev.find(l => l.id === entry.id)) return prev;
      return [entry, ...prev];
    });

    const isThreat = ["phishing","malicious","suspicious"].includes(data.prediction);
    showToast(
      isThreat ? "⚠ Threat Detected" : "✓ Scan Complete",
      `${data.prediction.toUpperCase()} — Risk: ${data.risk_level}`,
      isThreat ? "danger" : "ok"
    );
  }

  function clearLogs() {
    setLogs([]);
    sidRef.current = 0;
    setStats({ total_scans: 0, threats_detected: 0, threat_rate: 0, critical_count: 0 });
    showToast("Cleared", "All records removed.", "ok");
  }

  useEffect(() => {
    const tot  = logs.length;
    const thr  = logs.filter(l => ["phishing","malicious","suspicious"].includes(l.prediction)).length;
    const crit = logs.filter(l => l.rl === "CRITICAL").length;
    setStats(s => ({
      total_scans:      s.total_scans      || tot,
      threats_detected: s.threats_detected || thr,
      threat_rate:      s.threat_rate      || (tot ? Math.round(thr/tot*100) : 0),
      critical_count:   s.critical_count   || crit,
    }));
  }, [logs]);

  return (
    <div className="app">
      <HeroSection />
      <StatsRow stats={stats} />
      <div className="divider-head">
        <div className="dh-line" />
        <div className="dh-text">Submit a Sample — The AI Classifier Will Analyze It Instantly</div>
        <div className="dh-line" />
      </div>
      <div className="main-cols">
        <ScanInterface
          api={API}
          sidRef={sidRef}
          onScanComplete={addLog}
          onRefreshStats={refreshStats}
        />
        <ChartPanel logs={logs} />
      </div>
      <div className="divider-head">
        <div className="dh-line" />
        <div className="dh-text">Full Scan Chronicle — Every Detection Logged &amp; Timestamped</div>
        <div className="dh-line" />
      </div>
      <LogsTable logs={logs} onClear={clearLogs} />
      <Footer />
      {toast && <Toast toast={toast} />}
    </div>
  );
}