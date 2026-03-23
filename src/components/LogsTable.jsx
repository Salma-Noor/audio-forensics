import { useState } from "react";
import "./LogsTable.css"; // Make sure this CSS file is in the same folder

const THREATS = ["phishing","malicious","suspicious"];

// Escape HTML
function esc(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// Format timestamp
function fmt(d) {
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleTimeString([], { hour:"2-digit", minute:"2-digit", second:"2-digit" });
}

export default function LogsTable({ logs, onClear }) {
  const [filter, setFilter] = useState("all");

  // Filter logs based on selected tab
  const filtered =
    filter === "threat" ? logs.filter(l => THREATS.includes(l.prediction)) :
    filter === "all" ? logs :
    logs.filter(l => l.type === filter);

  const FILTERS = [
    { key:"all",     label:"All Records" },
    { key:"email",   label:"Email" },
    { key:"url",     label:"URL" },
    { key:"network", label:"Network" },
    { key:"threat",  label:"Threats Only" },
  ];

  return (
    <div className="logs-sec">
      {/* Header */}
      <div className="sh">
        <h2>Scan Chronicle</h2>
        <span className="sh-tag">Audit Log</span>
      </div>

      {/* Filter Buttons */}
      <div className="logs-flt">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`fc${filter === f.key ? " active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
        <div className="fc-sp" />
        <button className="clr" onClick={onClear}>Clear All</button>
      </div>

      {/* Table */}
      <div className="logs-wrap">
        <table className="logs-table">
          <thead>
            <tr>
              <th>No.</th><th>Type</th><th>Input Preview</th>
              <th>Verdict</th><th>Risk</th><th>Confidence</th><th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="nodata">
                <td colSpan="7">
                  {filter === "threat" ? "No threats detected yet." : "No records in this category."}
                </td>
              </tr>
            ) : filtered.map(l => {
              const bad = THREATS.includes(l.prediction);
              return (
                <tr key={l.id}>
                  <td style={{ color:"var(--gray)" }}>{String(l.id).padStart(3,"0")}</td>
                  <td><span className="ttag">{l.type}</span></td>
                  <td className="prev-col" title={l.prev}>{esc(l.prev)}</td>
                  <td className={`pred ${bad ? "bad" : "good"}`}>{l.prediction}</td>
                  <td><span className={`rtag r-${l.rl}`}>{l.rl}</span></td>
                  <td>
                    <div className="conf-bar-wrap">
                      <div className="conf-bar">
                        <div className="conf-fill" style={{ width: `${l.conf}%` }} />
                      </div>
                      <span>{l.conf}%</span>
                    </div>
                  </td>
                  <td className="ts-col">{fmt(l.ts)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}