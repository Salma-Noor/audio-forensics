import "./StatsRow.css";

export default function StatsRow({ stats }) {
  const cards = [
    { label: "Total Scans",      value: stats.total_scans,      accent: "#4a9eff", icon: "⬡" },
    { label: "Threats Detected", value: stats.threats_detected, accent: "#ff3c3c", icon: "⚠" },
    { label: "Threat Rate",      value: `${stats.threat_rate}%`,accent: "#ff8800", icon: "%" },
    { label: "Critical Alerts",  value: stats.critical_count,   accent: "#ff2200", icon: "☢" },
  ];

  return (
    <div className="stats-row">
      {cards.map(c => (
        <div className="stat-card" key={c.label} style={{"--accent": c.accent}}>
          <div className="stat-icon">{c.icon}</div>
          <div className="stat-value">{c.value}</div>
          <div className="stat-label">{c.label}</div>
          <div className="stat-bar">
            <div className="stat-bar-fill"/>
          </div>
        </div>
      ))}
    </div>
  );
}