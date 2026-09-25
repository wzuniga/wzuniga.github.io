import React from "react";

// Generated cover illustrations for projects without public screenshots.
// Each `kind` is a small blueprint-style diagram of what the project is about.
// Lines with the `flow` class animate like data moving through the system.

const T = "#1abc9c"; // teal accent
const T2 = "rgba(26, 188, 156, 0.35)";
const W = "rgba(255, 255, 255, 0.85)";
const W2 = "rgba(255, 255, 255, 0.25)";

function Box({ x, y, w = 70, h = 30, label, accent }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="rgba(4,3,8,0.75)" stroke={accent ? T : W2} strokeWidth="1.2" />
      <text x={x + w / 2} y={y + h / 2 + 3.5} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={accent ? T : W}>
        {label}
      </text>
    </g>
  );
}

function Database({ x, y, label }) {
  return (
    <g>
      <path d={`M${x} ${y + 6} v22 a22 6 0 0 0 44 0 v-22`} fill="rgba(4,3,8,0.75)" stroke={W2} strokeWidth="1.2" />
      <ellipse cx={x + 22} cy={y + 6} rx="22" ry="6" fill="rgba(4,3,8,0.9)" stroke={T} strokeWidth="1.2" />
      <text x={x + 22} y={y + 48} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={W}>{label}</text>
    </g>
  );
}

const scenes = {
  // Microservices behind a gateway, with cache and database
  services: (
    <>
      <path className="flow" d="M200 62 V92 M200 92 H90 V112 M200 92 H160 V112 M200 92 H240 V112 M200 92 H310 V112" stroke={T} />
      <path className="flow" d="M90 142 V170 H178 M310 142 V170 H222 M160 142 V170 M240 142 V170" stroke={T2} />
      <Box x={150} y={32} w={100} label="api-gateway" accent />
      <Box x={55} y={112} label="auth" />
      <Box x={125} y={112} label="svc-a" />
      <Box x={205} y={112} label="svc-b" />
      <Box x={275} y={112} label="svc-c" />
      <Database x={150} y={172} label="postgres" />
      <Database x={206} y={172} label="redis" />
    </>
  ),
  // Security-first banking services
  shield: (
    <>
      <circle cx="200" cy="120" r="78" fill="none" stroke={W2} strokeDasharray="3 6" />
      <circle cx="200" cy="120" r="52" fill="none" stroke={T2} />
      <path d="M200 70 L238 84 V116 C238 142 222 160 200 170 C178 160 162 142 162 116 V84 Z" fill="rgba(26,188,156,0.08)" stroke={T} strokeWidth="1.6" />
      <rect x="186" y="112" width="28" height="22" rx="4" fill="none" stroke={W} strokeWidth="1.5" />
      <path d="M191 112 v-7 a9 9 0 0 1 18 0 v7" fill="none" stroke={W} strokeWidth="1.5" />
      {[0, 72, 144, 216, 288].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return <circle key={deg} cx={200 + 78 * Math.cos(a)} cy={120 + 78 * Math.sin(a)} r="5" fill={deg % 144 === 0 ? T : W} />;
      })}
      <text x="200" y="222" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={W2}>TLS · OAuth2 · versioned APIs</text>
    </>
  ),
  // Enterprise dashboard: bars + trend line
  dashboard: (
    <>
      <rect x="70" y="40" width="260" height="170" rx="10" fill="rgba(4,3,8,0.6)" stroke={W2} />
      <circle cx="86" cy="54" r="3" fill={W2} /><circle cx="96" cy="54" r="3" fill={W2} /><circle cx="106" cy="54" r="3" fill={W2} />
      {[60, 90, 70, 115, 100, 135, 125].map((h, i) => (
        <rect key={i} x={92 + i * 32} y={195 - h} width="18" height={h} rx="3" fill={i === 5 ? T : "rgba(255,255,255,0.14)"} />
      ))}
      <path className="flow" d="M100 150 L132 128 L164 140 L196 104 L228 114 L260 80 L292 88" fill="none" stroke={T} strokeWidth="2" />
    </>
  ),
  // SAP -> e-invoice -> SUNAT
  invoice: (
    <>
      <Box x={40} y={105} w={82} h={36} label="SAP B1" />
      <Box x={278} y={105} w={82} h={36} label="SUNAT" accent />
      <path className="flow" d="M126 123 H166 M234 123 H274" stroke={T} strokeWidth="1.6" />
      <path d="M176 78 h36 l12 12 v66 h-48 z" fill="rgba(4,3,8,0.8)" stroke={W} strokeWidth="1.4" />
      <path d="M212 78 v12 h12" fill="none" stroke={W} strokeWidth="1.4" />
      {[102, 112, 122, 132].map((y) => <path key={y} d={`M184 ${y} h32`} stroke={W2} strokeWidth="2" />)}
      <circle cx="218" cy="150" r="10" fill={T} />
      <path d="M213 150 l4 4 l7 -8" fill="none" stroke="#04121d" strokeWidth="2" />
      <text x="200" y="196" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={W2}>e-invoice · REST</text>
    </>
  ),
  // Time series with an anomaly spike and scattered points
  anomaly: (
    <>
      <path d="M50 200 H350 M50 200 V40" stroke={W2} />
      {Array.from({ length: 34 }, (_, i) => {
        const x = 60 + i * 8.5;
        const y = 150 + Math.sin(i * 1.7) * 14 + Math.cos(i * 0.9) * 8;
        return <circle key={i} cx={x} cy={y} r="2" fill="rgba(255,255,255,0.35)" />;
      })}
      <path className="flow" d="M55 150 C95 130 120 165 160 148 S220 140 236 150 L252 70 L268 152 C300 160 320 138 345 146" fill="none" stroke={T} strokeWidth="2" />
      <circle cx="252" cy="70" r="11" fill="none" stroke="#ff6b6b" strokeWidth="1.6" className="pulse" />
      <circle cx="252" cy="70" r="3.5" fill="#ff6b6b" />
      <text x="268" y="62" fontSize="10" fontFamily="monospace" fill="#ff9b9b">anomaly</text>
    </>
  ),
  // Terrain contours with an NDVI-like gradient and a satellite
  satellite: (
    <>
      <defs>
        <radialGradient id="ndvi" cx="45%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#2ecc71" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#1abc9c" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1abc9c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="180" cy="150" rx="150" ry="80" fill="url(#ndvi)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={i} cx={180 + i * 4} cy={152 - i * 3} rx={140 - i * 26} ry={70 - i * 13} fill="none" stroke={i === 4 ? T : W2} transform={`rotate(-8 180 150)`} />
      ))}
      <g transform="translate(300 55) rotate(-25)">
        <rect x="-8" y="-6" width="16" height="12" rx="2" fill={W} />
        <rect x="-34" y="-5" width="22" height="10" fill="none" stroke={T} />
        <rect x="12" y="-5" width="22" height="10" fill="none" stroke={T} />
      </g>
      <path className="flow" d="M292 70 L210 140" stroke={T2} strokeWidth="1.2" />
      <text x="60" y="228" fontSize="10" fontFamily="monospace" fill={W2}>NDVI = (NIR − RED) / (NIR + RED)</text>
    </>
  ),
  // Online store + investment growth
  commerce: (
    <>
      <path d="M70 70 h22 l18 82 h92 l16 -58 h-116" fill="none" stroke={W} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="122" cy="170" r="8" fill="none" stroke={W} strokeWidth="2" />
      <circle cx="190" cy="170" r="8" fill="none" stroke={W} strokeWidth="2" />
      <path d="M240 190 H350 M240 190 V70" stroke={W2} />
      <path className="flow" d="M246 176 L270 160 L292 166 L316 128 L344 96" fill="none" stroke={T} strokeWidth="2" />
      <path d="M334 94 L346 94 L346 106" fill="none" stroke={T} strokeWidth="2" />
      <text x="96" y="210" fontSize="10" fontFamily="monospace" fill={W2}>checkout · payments</text>
    </>
  ),
};

function CoverArt({ kind }) {
  return (
    <svg className="cover-art" viewBox="0 0 400 250" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`dots-${kind}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.07)" />
        </pattern>
        <radialGradient id={`glow-${kind}`} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="rgba(26,188,156,0.16)" />
          <stop offset="100%" stopColor="rgba(26,188,156,0)" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill="#070a12" />
      <rect width="400" height="250" fill={`url(#dots-${kind})`} />
      <rect width="400" height="250" fill={`url(#glow-${kind})`} />
      <g fill="none">{scenes[kind]}</g>
    </svg>
  );
}

export default CoverArt;
