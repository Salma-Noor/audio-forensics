import { useState, useRef } from "react";
import "./ScanInterface.css";

const THREATS = ["phishing", "malicious", "suspicious"];

function simulate(type, payload) {
  let score = 0;
  let sid = Math.floor(Math.random() * 9000) + 1000;

  if (type === "email") {
    const text = ((payload.subject || "") + " " + (payload.body || "")).toLowerCase();
    ["verify","account","suspended","urgent","click here","login","bank",
     "password","winner","confirm","update","immediately","prize","free",
     "validate","unusual activity","24 hours"].forEach(w => {
      if (text.includes(w)) score += 10;
    });
    score = Math.min(score + Math.random() * 8, 97);
  } else if (type === "url") {
    const u = (payload.url || "").toLowerCase();
    if (!/^https/.test(u))                                        score += 15;
    if (/\d+\.\d+\.\d+\.\d+/.test(u))                            score += 40;
    if (/free|prize|win|verify|login|bank|secure|paypa/.test(u))  score += 25;
    if ((u.match(/\./g) || []).length > 4)                        score += 15;
    score = Math.min(score + Math.random() * 10, 97);
  } else {
    const cnt = payload.request_count || 0;
    if (cnt > 1000) score += 55;
    else if (cnt > 500) score += 30;
    if (/\.ru$|\.xyz$|\.tk$|\.pw$/.test((payload.domain || "").toLowerCase())) score += 25;
    score = Math.min(score + Math.random() * 10, 97);
  }

  score = Math.round(score);
  const rl = score >= 80 ? "CRITICAL" : score >= 60 ? "HIGH" : score >= 35 ? "MEDIUM" : "LOW";
  const isThreat = score >= 35;

  return {
    scan_id:        sid,
    prediction:     isThreat
      ? (type === "email" ? "phishing" : type === "url" ? "malicious" : "suspicious")
      : (type === "email" ? "legitimate" : "safe"),
    risk_level:     rl,
    confidence:     Math.min(Math.round(62 + score * 0.3 + Math.random() * 8), 99) / 100,
    phishing_score: score,
    malicious_score:score,
    threat_score:   score,
    features: type === "url" ? {
      has_ip_domain:           /\d+\.\d+\.\d+\.\d+/.test(payload.url || ""),
      has_https:               /^https/.test(payload.url || ""),
      has_suspicious_keywords: /free|prize|win|verify|login|secure|paypa/.test((payload.url || "").toLowerCase()),
      domain_entropy:          +((2 + Math.random() * 2.5).toFixed(3))
    } : null
  };
}

export default function ScanInterface({ api, sidRef, onScanComplete }) {
  const [tab, setTab] = useState("email");
  const [loading, setLoading] = useState(false);
  const [termLines, setTermLines] = useState([]);
  const [result, setResult] = useState(null);

  const [eSub, setESub] = useState("");
  const [eBody, setEBody] = useState("");
  const [eSender, setESender] = useState("");
  const [uIn, setUIn] = useState("");
  const [nIp, setNIp] = useState("");
  const [nDom, setNDom] = useState("");
  const [nCnt, setNCnt] = useState("");
  const [nUa, setNUa] = useState("");

  const termRef = useRef(null);

  function addTermLine(html) {
    setTermLines(prev => {
      const next = [...prev, html];
      setTimeout(() => { if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight; }, 0);
      return next;
    });
  }

  async function runScan() {
    let endpoint, payload;

    if (tab === "email") {
      if (!eSub.trim() && !eBody.trim()) return alert("Enter a subject or body to scan.");
      endpoint = "/scan/email";
      payload = { subject: eSub.trim() || "(no subject)", body: eBody.trim() || "(no body)", ...(eSender.trim() && { sender: eSender.trim() }) };
    } else if (tab === "url") {
      if (!uIn.trim()) return alert("Enter a URL to analyze.");
      endpoint = "/scan/url"; payload = { url: uIn.trim() };
    } else {
      if (!nIp.trim()) return alert("Enter an IP address.");
      endpoint = "/scan/network";
      payload = { ip_address: nIp.trim(), ...(nDom.trim() && { domain: nDom.trim() }), ...(nCnt.trim() && { request_count: parseInt(nCnt) }), ...(nUa.trim() && { user_agent: nUa.trim() }) };
    }

    setLoading(true); setResult(null);
    setTermLines([`<span class="t-p">threatscan@ai:~$</span> <span class="t-c">./scan --type ${tab} --model sklearn-v2</span>`]);

    setTimeout(() => addTermLine(`<span class="t-p">&gt;</span> Loading classifier pipeline... <span class="t-ok">ready</span>`), 165);
    setTimeout(() => addTermLine(`<span class="t-p">&gt;</span> Extracting features... <span class="t-ok">done</span>`), 330);
    setTimeout(() => addTermLine(`<span class="t-p">&gt;</span> Running inference... <span class="t-c">▋</span>`), 495);

    let data;
    try {
      const resp = await fetch(api + endpoint, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) });
      if (!resp.ok) { const err = await resp.json().catch(() => ({})); throw new Error(`HTTP ${resp.status}: ${err.detail || resp.statusText}`); }
      data = await resp.json();
      addTermLine(`<span class="t-ok">[ OK ] Scan complete — id: ${data.scan_id}</span>`);
    } catch(err) {
      console.warn("Backend offline, using simulation:", err.message);
      data = simulate(tab, payload);
      addTermLine(`<span class="t-wa">[ DEMO ] Backend offline — local simulation active</span>`);
      addTermLine(`<span class="t-ok">[ SIM ] ${data.prediction.toUpperCase()} / ${data.risk_level}</span>`);
    }

    setResult({ data, type: tab });
    onScanComplete(data, tab, payload);
    setLoading(false);
  }

  const isThreat = result && THREATS.includes(result.data.prediction);
  const normalizeConf = c => { if(!c) return 75; if(c>1) c=c/100; return Math.min(Math.round(c*100),100); };
  const score = result ? Math.round(result.data.phishing_score ?? result.data.malicious_score ?? result.data.threat_score ?? 0) : 0;
  const conf  = result ? normalizeConf(result.data.confidence) : 0;
  const rl    = result?.data.risk_level || "LOW";

  return (
    <div className="scan-card">
      <div className="scan-card-header">
        <span className="scan-card-title">SCAN INTERFACE</span>
        <div className="scan-tabs">
          {["email","url","network"].map(t => (
            <button key={t} className={`scan-tab${tab===t?" active":""}`} onClick={()=>{setTab(t);setResult(null);setTermLines([]);}}>
              {t.charAt(0).toUpperCase()+t.slice(1)} Scan
            </button>
          ))}
        </div>
      </div>

      <div className="scan-body">
        {tab==="email" && <>
          <div className="form-group">
            <label className="form-lbl">Subject Line</label>
            <input className="form-input" value={eSub} onChange={e=>setESub(e.target.value)} placeholder="Your account has been suspended immediately..." />
          </div>
          <div className="form-group">
            <label className="form-lbl">Email Body</label>
            <textarea className="form-ta" value={eBody} onChange={e=>setEBody(e.target.value)} placeholder="Dear customer, click link to verify your account..." />
          </div>
          <div className="form-group">
            <label className="form-lbl">Sender (optional)</label>
            <input className="form-input" value={eSender} onChange={e=>setESender(e.target.value)} placeholder="security@paypa1-secure.xyz" />
          </div>
        </>}

        {tab==="url" && <>
          <div className="form-group">
            <label className="form-lbl">Suspicious URL</label>
            <input className="form-input" value={uIn} onChange={e=>setUIn(e.target.value)} placeholder="https://paypa1-secure-login.xyz/verify-account" />
          </div>
        </>}

        {tab==="network" && <>
          <div className="form-group">
            <label className="form-lbl">IP Address</label>
            <input className="form-input" value={nIp} onChange={e=>setNIp(e.target.value)} placeholder="192.168.1.100" />
          </div>
          <div className="form-group">
            <label className="form-lbl">Domain (optional)</label>
            <input className="form-input" value={nDom} onChange={e=>setNDom(e.target.value)} placeholder="suspicious-domain.ru" />
          </div>
          <div className="form-group">
            <label className="form-lbl">Request Count</label>
            <input className="form-input" type="number" value={nCnt} onChange={e=>setNCnt(e.target.value)} placeholder="1500 (high = suspicious)" />
          </div>
          <div className="form-group">
            <label className="form-lbl">User Agent (optional)</label>
            <input className="form-input" value={nUa} onChange={e=>setNUa(e.target.value)} placeholder="Mozilla/5.0 or bot string..." />
          </div>
        </>}

        <button className="scan-btn" disabled={loading} onClick={runScan}>
          {loading ? <><span className="spin" /> Processing...</> :
            tab==="email"?"Analyze This Email →":tab==="url"?"Analyze This URL →":"Analyze Activity →"}
        </button>

        {termLines.length>0 && <div className="terminal" ref={termRef}>
          {termLines.map((line,i)=><div key={i} dangerouslySetInnerHTML={{__html:line}} />)}
        </div>}

        {result && <div className="rbox">
          <div className="rhd">
            <span className="rhd-lbl">Scan #{result.data.scan_id} — Analysis Complete</span>
            <span className={`vstamp ${isThreat?"bad":"good"}`}>{result.data.prediction.toUpperCase()}</span>
          </div>
          <div className="rrow"><span className="rk">Risk Level</span><span className="rv"><span className={`rtag r-${rl}`}>{rl}</span></span></div>
          <div className="rrow"><span className="rk">Threat Score</span><span className="rv rbar-wrap">{score}%<div className="rtrack"><div className="rfill" style={{width:`${score}%`, background:isThreat?"#ff5555":"#50fa7b"}} /></div></span></div>
          <div className="rrow"><span className="rk">Confidence</span><span className="rv rbar-wrap">{conf}%<div className="rtrack"><div className="rfill" style={{width:`${conf}%`}} /></div></span></div>
          {result.data.features && (()=>{const f=result.data.features; return <>
            <div className="rrow"><span className="rk">HTTPS</span><span className="rv" style={{color:f.has_https?"#50fa7b":"#ff5555"}}>{f.has_https?"✓ Present":"✗ Absent"}</span></div>
            <div className="rrow"><span className="rk">IP as Domain</span><span className="rv" style={{color:f.has_ip_domain?"#ff5555":"#50fa7b"}}>{f.has_ip_domain?"⚠ Yes — suspicious":"✓ No"}</span></div>
            <div className="rrow"><span className="rk">Suspicious Keywords</span><span className="rv" style={{color:f.has_suspicious_keywords?"#ffb86c":"#50fa7b"}}>{f.has_suspicious_keywords?"⚠ Detected":"✓ None found"}</span></div>
            <div className="rrow"><span className="rk">Domain Entropy</span><span className="rv">{f.domain_entropy??"N/A"}</span></div>
          </>})()}
        </div>}
      </div>
    </div>
  );
}