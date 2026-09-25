import React from "react";
import "./Flag.css";

// Simplified inline SVG flags (3:2), drawn by hand so no image assets are needed.

function starPoints(cx, cy, outer, inner) {
  const points = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    points.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return points.join(" ");
}

const flags = {
  ES: {
    name: "Spain",
    body: (
      <>
        <rect width="30" height="20" fill="#AA151B" />
        <rect y="5" width="30" height="10" fill="#F1BF00" />
      </>
    ),
  },
  UY: {
    name: "Uruguay",
    body: (
      <>
        <rect width="30" height="20" fill="#FFFFFF" />
        {[1, 3, 5, 7].map((i) => (
          <rect key={i} y={(i * 20) / 9} width="30" height={20 / 9} fill="#0038A8" />
        ))}
        <rect width="11.1" height="11.1" fill="#FFFFFF" />
        <circle cx="5.55" cy="5.55" r="3.6" fill="none" stroke="#FCD116" strokeWidth="1.6" strokeDasharray="0.9 0.7" />
        <circle cx="5.55" cy="5.55" r="2.3" fill="#FCD116" />
      </>
    ),
  },
  CL: {
    name: "Chile",
    body: (
      <>
        <rect width="30" height="20" fill="#FFFFFF" />
        <rect y="10" width="30" height="10" fill="#D52B1E" />
        <rect width="10" height="10" fill="#0039A6" />
        <polygon points={starPoints(5, 5, 2.8, 1.1)} fill="#FFFFFF" />
      </>
    ),
  },
  DE: {
    name: "Germany",
    body: (
      <>
        <rect width="30" height="20" fill="#000000" />
        <rect y="6.67" width="30" height="6.67" fill="#DD0000" />
        <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
      </>
    ),
  },
  PE: {
    name: "Peru",
    body: (
      <>
        <rect width="30" height="20" fill="#FFFFFF" />
        <rect width="10" height="20" fill="#D91023" />
        <rect x="20" width="10" height="20" fill="#D91023" />
      </>
    ),
  },
  BR: {
    name: "Brazil",
    body: (
      <>
        <rect width="30" height="20" fill="#009C3B" />
        <polygon points="3,10 15,2.2 27,10 15,17.8" fill="#FFDF00" />
        <circle cx="15" cy="10" r="4.6" fill="#002776" />
        <path d="M10.5 9.1 Q15 7.4 19.5 10.5" fill="none" stroke="#FFFFFF" strokeWidth="0.9" />
      </>
    ),
  },
};

function Flag({ code, className = "" }) {
  const flag = flags[code];
  if (!flag) return null;
  return (
    <span className={`flag ${className}`} role="img" aria-label={flag.name} title={flag.name}>
      <svg viewBox="0 0 30 20" aria-hidden="true" focusable="false">
        {flag.body}
      </svg>
    </span>
  );
}

export default Flag;
