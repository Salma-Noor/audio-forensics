import "./ChartPanel.css";

const RISK_COLORS  = { LOW:"#44ff88", MEDIUM:"#ffcc00", HIGH:"#ff8800", CRITICAL:"#ff3c3c" };
const PRED_COLORS  = { legitimate:"#44ff88", phishing:"#ff3c3c", malicious:"#ff1100", suspicious:"#ffaa00" };

export default function ChartPanel({ logs }) {
  const predCount = {};
  const riskCount = {};
  logs.forEach(l => {
    predCount[l.prediction] = (predCount[l.prediction] || 0) + 1;
    riskCount[l.rl]         = (riskCount[l.rl]         || 0) + 1;
  });
  const total   = logs.length || 1;
  const threats = logs.filter(l => ["phishing","malicious","suspicious"].includes(l.prediction)).length;
  const tPct    = logs.length ? Math.round((threats / logs.length) * 100) : 0;

  return (
    <div className="chart-card">
      <div className="chart-header">
        <span className="chart-title">▶ LIVE ANALYTICS</span>
        <span className="chart-badge">{logs.length} SCANS</span>
      </div>

      <div className="chart-body">

        {/* Prediction bars */}
        <div className="chart-section-label">Prediction Breakdown</div>
        {Object.entries(predCount).length === 0 ? (
          <div className="chart-empty">— Run a scan to populate charts —</div>
        ) : (
          Object.entries(predCount).map(([pred, count]) => (
            <div key={pred} className="bar-row">
              <div className="bar-label" style={{color: PRED_COLORS[pred] || "#ff3c3c"}}>{pred.toUpperCase()}</div>
              <div className="bar-track">
                <div className="bar-fill" style={{
                  width: `${(count/total)*100}%`,
                  background: PRED_COLORS[pred] || "#ff3c3c",
                  boxShadow: `0 0 12px ${PRED_COLORS[pred] || "#ff3c3c"}`,
                }}/>
              </div>
              <div className="bar-count">{count}</div>
            </div>
          ))
        )}

        <div className="chart-divider"/>

        {/* Risk bars */}
        <div className="chart-section-label">Risk Distribution</div>
        {["CRITICAL","HIGH","MEDIUM","LOW"].map(risk => {
          const c = riskCount[risk] || 0;
          if (!c) return null;
          return (
            <div key={risk} className="bar-row">
              <div className="bar-label" style={{color: RISK_COLORS[risk]}}>{risk}</div>
              <div className="bar-track">
                <div className="bar-fill" style={{
                  width: `${(c/total)*100}%`,
                  background: RISK_COLORS[risk],
                  boxShadow: `0 0 12px ${RISK_COLORS[risk]}`,
                }}/>
              </div>
              <div className="bar-count">{c}</div>
            </div>
          );
        })}

        {/* Threat vs Safe */}
        {logs.length > 0 && (
          <>
            <div className="chart-divider"/>
            <div className="chart-section-label">Threat vs Safe Ratio</div>
            <div className="ratio-row">
              <div className="ratio-item threat">
                <div className="ratio-val">{tPct}%</div>
                <div className="ratio-lbl">THREATS</div>
              </div>
              <div className="ratio-bar-wrap">
                <div className="ratio-bar">
                  <div style={{width:`${tPct}%`, background:"linear-gradient(90deg,#ff1100,#ff3c3c)", height:"100%", borderRadius:"3px 0 0 3px", boxShadow:"0 0 16px #ff3c3c88"}}/>
                  <div style={{width:`${100-tPct}%`, background:"linear-gradient(90deg,#00cc55,#44ff88)", height:"100%", borderRadius:"0 3px 3px 0"}}/>
                </div>
              </div>
              <div className="ratio-item safe">
                <div className="ratio-val">{100-tPct}%</div>
                <div className="ratio-lbl">SAFE</div>
              </div>
            </div>
          </>
        )}

        {/* Scan type breakdown */}
        {logs.length > 0 && (() => {
          const types = {};
          logs.forEach(l => { types[l.type] = (types[l.type]||0)+1; });
          return (
            <>
              <div className="chart-divider"/>
              <div className="chart-section-label">Scan Types</div>
              <div className="type-chips">
                {Object.entries(types).map(([t, c]) => (
                  <div key={t} className="type-chip">
                    <span className="type-name">{t?.toUpperCase()}</span>
                    <span className="type-count">{c}</span>
                  </div>
                ))}
              </div>
            </>
          );
        })()}

      </div>
    </div>
  );
}