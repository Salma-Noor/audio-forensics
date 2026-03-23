import "./HeroSection.css";

const TICKER_ITEMS = [
  "PHISHING ATTEMPT BLOCKED",
  "MALICIOUS URL DETECTED",
  "THREAT NEUTRALIZED",
  "SUSPICIOUS NETWORK ACTIVITY",
  "AI SCAN COMPLETE",
  "CRITICAL ALERT RAISED",
  "SYSTEM PROTECTED",
  "ZERO-DAY EXPLOIT FLAGGED",
];

export default function HeroSection() {
  const tickerDouble = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      <div className="hero">
        {/* ── Background SVG ── */}
        <svg className="hero-svg" viewBox="0 0 1400 560" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="rg1" cx="20%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#3a0a0a" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#020408" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="rg2" cx="80%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#0a0a3a" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#020408" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff3c3c" stopOpacity="0.06"/>
              <stop offset="100%" stopColor="#020408" stopOpacity="0"/>
            </radialGradient>
            <filter id="glow4">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow12">
              <feGaussianBlur stdDeviation="12" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="softer">
              <feGaussianBlur stdDeviation="20" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Base */}
          <rect width="1400" height="560" fill="#020408"/>
          <rect width="1400" height="560" fill="url(#rg1)"/>
          <rect width="1400" height="560" fill="url(#rg2)"/>
          <rect width="1400" height="560" fill="url(#centerGlow)"/>

          {/* Fine grid */}
          <g stroke="#ffffff" strokeWidth="0.3" opacity="0.04">
            {Array.from({length: 22}, (_,i) => (i+1)*65).map(y =>
              <line key={`h${y}`} x1="0" y1={y} x2="1400" y2={y}/>
            )}
            {Array.from({length: 28}, (_,i) => (i+1)*50).map(x =>
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="560"/>
            )}
          </g>

          {/* Diagonal accent lines */}
          <g stroke="#ff3c3c" strokeWidth="1" opacity="0.15">
            <line x1="0" y1="560" x2="300" y2="0"/>
            <line x1="1400" y1="560" x2="1100" y2="0"/>
          </g>

          {/* ── LEFT: Threat Email Mockup ── */}
          <g transform="translate(40,80)" filter="url(#glow4)">
            {/* Window frame */}
            <rect x="0" y="0" width="340" height="270" rx="6" fill="#0a0d14" stroke="#ff3c3c" strokeWidth="1.5" opacity="0.95"/>
            {/* Title bar */}
            <rect x="0" y="0" width="340" height="32" rx="6" fill="#1a0808"/>
            <rect x="0" y="16" width="340" height="16" fill="#1a0808"/>
            <circle cx="16" cy="16" r="6" fill="#ff4444"/>
            <circle cx="34" cy="16" r="6" fill="#ffaa00"/>
            <circle cx="52" cy="16" r="6" fill="#44ff88"/>
            <text x="170" y="20" textAnchor="middle" fill="#ff6666" fontFamily="Share Tech Mono, monospace" fontSize="11" fontWeight="bold">⚠ SUSPICIOUS MESSAGE DETECTED</text>

            {/* Email body */}
            <rect x="12" y="40" width="316" height="218" fill="#06080d"/>
            <text x="20" y="62" fill="#445566" fontFamily="Share Tech Mono, monospace" fontSize="9">FROM:</text>
            <text x="72" y="62" fill="#ff4444" fontFamily="Share Tech Mono, monospace" fontSize="9">no-reply@paypa1-verify.tk</text>
            <text x="20" y="78" fill="#445566" fontFamily="Share Tech Mono, monospace" fontSize="9">TO:</text>
            <text x="72" y="78" fill="#6688aa" fontFamily="Share Tech Mono, monospace" fontSize="9">victim@company.com</text>
            <text x="20" y="94" fill="#445566" fontFamily="Share Tech Mono, monospace" fontSize="9">SUBJ:</text>
            <text x="72" y="94" fill="#ffaa00" fontFamily="Share Tech Mono, monospace" fontSize="9" fontWeight="bold">ACTION REQUIRED: Account Suspended</text>
            <line x1="12" y1="102" x2="328" y2="102" stroke="#1a2530" strokeWidth="1"/>

            <text x="20" y="122" fill="#7a9090" fontFamily="Share Tech Mono, monospace" fontSize="9">Dear Valued Customer,</text>
            <text x="20" y="138" fill="#445560" fontFamily="Share Tech Mono, monospace" fontSize="9">We have detected unusual sign-in activity.</text>
            <text x="20" y="153" fill="#445560" fontFamily="Share Tech Mono, monospace" fontSize="9">Your account has been temporarily locked.</text>
            <text x="20" y="168" fill="#445560" fontFamily="Share Tech Mono, monospace" fontSize="9">Verify within 24hrs or lose access.</text>

            {/* CTA Button */}
            <rect x="50" y="182" width="240" height="38" rx="3" fill="#cc1111"/>
            <text x="170" y="205" textAnchor="middle" fill="#ffffff" fontFamily="Share Tech Mono, monospace" fontSize="12" fontWeight="bold" letterSpacing="2">VERIFY ACCOUNT NOW →</text>

            {/* AI verdict */}
            <rect x="12" y="228" width="316" height="22" rx="1" fill="#1a0808"/>
            <text x="170" y="243" textAnchor="middle" fill="#ff4444" fontFamily="Share Tech Mono, monospace" fontSize="9" letterSpacing="1">🤖 AI: PHISHING DETECTED [99.2% CONFIDENCE]</text>
          </g>

          {/* Threat label under email */}
          <g transform="translate(48,362)" filter="url(#glow4)">
            <rect x="0" y="0" width="320" height="38" fill="none" stroke="#ff3c3c" strokeWidth="1.5"/>
            <rect x="0" y="0" width="320" height="38" fill="rgba(255,60,60,0.05)"/>
            <text x="16" y="24" fill="#ff3c3c" fontFamily="Share Tech Mono, monospace" fontSize="13" fontWeight="bold" letterSpacing="3">⚠  THREAT DETECTED — BLOCKED</text>
          </g>

          {/* ── CENTER: Glowing shield ── */}
          <g transform="translate(590,60)" opacity="0.9">
            {/* Outer ring */}
            <circle cx="110" cy="110" r="105" fill="none" stroke="#ff3c3c" strokeWidth="0.5" opacity="0.2"/>
            <circle cx="110" cy="110" r="90" fill="none" stroke="#ff3c3c" strokeWidth="0.5" opacity="0.3"/>
            <circle cx="110" cy="110" r="75" fill="none" stroke="#ff3c3c" strokeWidth="1" opacity="0.15"/>

            {/* Shield shape */}
            <path d="M110 20 L180 55 L180 110 Q180 165 110 195 Q40 165 40 110 L40 55 Z"
              fill="rgba(255,60,60,0.08)" stroke="#ff3c3c" strokeWidth="2" filter="url(#glow4)"/>

            {/* Inner shield glow */}
            <path d="M110 38 L165 66 L165 108 Q165 152 110 178 Q55 152 55 108 L55 66 Z"
              fill="rgba(255,60,60,0.05)" stroke="rgba(255,60,60,0.4)" strokeWidth="1"/>

            {/* Lock icon */}
            <rect x="88" y="95" width="44" height="38" rx="4" fill="none" stroke="#ff3c3c" strokeWidth="2.5" filter="url(#glow4)"/>
            <path d="M97 95 Q97 72 110 72 Q123 72 123 95" fill="none" stroke="#ff3c3c" strokeWidth="2.5" filter="url(#glow4)"/>
            <circle cx="110" cy="112" r="5" fill="#ff3c3c" filter="url(#glow12)"/>
            <line x1="110" y1="117" x2="110" y2="126" stroke="#ff3c3c" strokeWidth="2.5"/>

            {/* Scanning lines */}
            <line x1="40" y1="110" x2="180" y2="110" stroke="#ff3c3c" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 8"/>
            <line x1="110" y1="20" x2="110" y2="195" stroke="#ff3c3c" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 8"/>

            {/* Confidence readout */}
            <text x="110" y="230" textAnchor="middle" fill="#ff3c3c" fontFamily="Share Tech Mono, monospace" fontSize="10" letterSpacing="4" opacity="0.8">AI SHIELD ACTIVE</text>
            <text x="110" y="248" textAnchor="middle" fill="#445566" fontFamily="Share Tech Mono, monospace" fontSize="9" letterSpacing="2">SCANNING TRAFFIC...</text>
          </g>

          {/* ── RIGHT: Stats panel ── */}
          <g transform="translate(960,60)">
            {/* Panel */}
            <rect x="0" y="0" width="360" height="300" rx="4" fill="#06080d" stroke="rgba(255,60,60,0.3)" strokeWidth="1.5"/>
            <rect x="0" y="0" width="360" height="36" rx="4" fill="rgba(255,60,60,0.08)"/>
            <rect x="0" y="18" width="360" height="18" fill="rgba(255,60,60,0.08)"/>
            <text x="18" y="23" fill="#ff4444" fontFamily="Share Tech Mono, monospace" fontSize="11" letterSpacing="3" fontWeight="bold">THREAT INTELLIGENCE FEED</text>
            <circle cx="340" cy="18" r="5" fill="#ff4444" opacity="0.8"/>

            {/* Feed rows */}
            {[
              { y: 60,  color: "#ff4444", risk: "CRITICAL", text: "Phishing URL — paypa1-login.xyz" },
              { y: 90,  color: "#ff8800", risk: "HIGH",     text: "Malware dropper — 185.220.x.x" },
              { y: 120, color: "#ffcc00", risk: "MEDIUM",   text: "Suspicious email — spoofed domain" },
              { y: 150, color: "#ff4444", risk: "CRITICAL", text: "SQL injection attempt detected" },
              { y: 180, color: "#ff8800", risk: "HIGH",     text: "Port scan — 1247 ports/min" },
              { y: 210, color: "#44ff88", risk: "SAFE",     text: "newsletter@company.com — clean" },
              { y: 240, color: "#ff4444", risk: "CRITICAL", text: "Ransomware signature matched" },
              { y: 270, color: "#ffcc00", risk: "MEDIUM",   text: "Expired cert — possible MITM" },
            ].map((row, i) => (
              <g key={i}>
                <rect x="12" y={row.y - 12} width="336" height="22" fill={i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent"}/>
                <rect x="12" y={row.y - 9} width="72" height="14" rx="2" fill={row.color} opacity="0.15"/>
                <text x="18" y={row.y + 2} fill={row.color} fontFamily="Share Tech Mono, monospace" fontSize="9" fontWeight="bold" letterSpacing="1">{row.risk}</text>
                <text x="96" y={row.y + 2} fill="#4a6070" fontFamily="Share Tech Mono, monospace" fontSize="9">{row.text}</text>
              </g>
            ))}
          </g>

          {/* ── Binary column (far right) ── */}
          <g fontFamily="Share Tech Mono, monospace" fontSize="9" fill="#ff3c3c" opacity="0.18">
            {["01101000","11010010","00110101","10101101","01110011","11001010","00101110","10110001",
              "01001101","11100010","00011101","10001011","01110100","11010001","00100110","10111000"].map((v,i) => (
              <text key={i} x="1355" y={30 + i * 22}>{v}</text>
            ))}
          </g>

          {/* ── Floating data points ── */}
          {[
            {x:420, y:420, label:"SCAN #4821", val:"PHISHING", color:"#ff4444"},
            {x:570, y:460, label:"CONFIDENCE", val:"98.4%", color:"#ffaa00"},
            {x:720, y:490, label:"RISK LEVEL", val:"CRITICAL", color:"#ff4444"},
            {x:870, y:450, label:"BLOCKED", val:"YES ✓", color:"#44ff88"},
          ].map((d,i) => (
            <g key={i} transform={`translate(${d.x},${d.y})`} opacity="0.7">
              <rect x="0" y="0" width="120" height="36" rx="2" fill="rgba(0,0,0,0.6)" stroke={d.color} strokeWidth="1" strokeOpacity="0.4"/>
              <text x="8" y="13" fill="#445566" fontFamily="Share Tech Mono, monospace" fontSize="8" letterSpacing="1">{d.label}</text>
              <text x="8" y="27" fill={d.color} fontFamily="Share Tech Mono, monospace" fontSize="11" fontWeight="bold">{d.val}</text>
            </g>
          ))}
        </svg>

        {/* ── Overlay text ── */}
        <div className="hero-overlay">
          <div className="hero-kicker">
            <span className="kicker-line"/>
            Artificial Intelligence Security System
            <span className="kicker-line"/>
          </div>
          <div className="hero-title">
            <span className="red-word">THREAT</span>SCAN
          </div>
          <div className="hero-sub">
            Real-Time Phishing &amp; Malware Detection &bull; Powered by Machine Learning
          </div>
          <div className="hero-badges">
            <span className="hbadge"><span className="blink"/>SYSTEM ONLINE</span>
            <span className="hbadge">AI MODEL: ACTIVE</span>
            <span className="hbadge">NAIVE BAYES + RANDOM FOREST</span>
            <span className="hbadge">FASTAPI + SQLALCHEMY</span>
          </div>
        </div>

        {/* ── Ticker ── */}
        <div className="threat-ticker">
          <div className="ticker-track">
            {tickerDouble.map((item, i) => (
              <span key={i} className="ticker-item">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Anatomy Strip ── */}
      <div className="anatomy-strip">
        {[
          {
            num: "01", title: "Email Phishing",
            desc: "TF-IDF vectorization converts email text into numerical features. Naive Bayes calculates phishing probability from keywords like \"urgent\", \"verify\", \"suspended\".",
            icon: (
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="10" width="40" height="30" rx="3" stroke="#fff" strokeWidth="2.5"/>
                <path d="M4 14l20 14 20-14" stroke="#fff" strokeWidth="2.5"/>
              </svg>
            )
          },
          {
            num: "02", title: "Malicious URLs",
            desc: "15+ engineered features: Shannon entropy, IP hostnames, suspicious TLDs, HTTP vs HTTPS, subdomain count. Random Forest votes across 100 decision trees.",
            icon: (
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="18" stroke="#fff" strokeWidth="2.5"/>
                <path d="M6 24h36M24 6C18 12 15 18 15 24s3 12 9 18M24 6c6 6 9 12 9 18s-3 12-9 18" stroke="#fff" strokeWidth="2"/>
                <circle cx="24" cy="24" r="4" fill="#fff"/>
              </svg>
            )
          },
          {
            num: "03", title: "Network Activity",
            desc: "Anomaly detection on IPs, request frequency, suspicious TLDs (.ru .xyz .tk), traffic spikes. Flags DDoS patterns and data exfiltration in real time.",
            icon: (
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="30" width="9" height="12" rx="1" stroke="#fff" strokeWidth="2.5"/>
                <rect x="20" y="22" width="9" height="20" rx="1" stroke="#fff" strokeWidth="2.5"/>
                <rect x="34" y="14" width="9" height="28" rx="1" stroke="#fff" strokeWidth="2.5"/>
                <path d="M8 20l8-8 8 4 16-10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            )
          },
          {
            num: "04", title: "Audit Logging",
            desc: "Every scan stored in SQLite/PostgreSQL with timestamp, confidence score, risk level. Full audit trail for compliance. FastAPI Swagger docs at /docs.",
            icon: (
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4L6 14v12c0 10 8 18 18 22 10-4 18-12 18-22V14L24 4z" stroke="#fff" strokeWidth="2.5"/>
                <path d="M16 24l6 6 10-12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )
          }
        ].map(card => (
          <div className="acard" key={card.num}>
            <div className="acard-glow"/>
            <div className="acard-num">{card.num}</div>
            <div className="acard-icon">{card.icon}</div>
            <div className="acard-title">{card.title}</div>
            <p className="acard-desc">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Mastbar ── */}
      <div className="mastbar">
        <div className="mastbar-left">
          <div id="mdate">Loading date...</div>
          <div>Vol. I &bull; Issue 001 &bull; Threat Intelligence Edition</div>
        </div>
        <div className="mastbar-center">The ThreatScan Sentinel</div>
        <div className="mastbar-right">
          <span className="blink green"/>
          All Systems Operational
        </div>
      </div>
    </>
  );
}