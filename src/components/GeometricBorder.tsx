export default function GeometricBorder() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Outer border */}
      <rect x="1.5" y="1.5" width="97" height="97" fill="none"
        stroke="rgba(251,191,36,0.25)" strokeWidth="0.3" />
      {/* Inner border */}
      <rect x="3" y="3" width="94" height="94" fill="none"
        stroke="rgba(251,191,36,0.1)" strokeWidth="0.2" />

      {/* Corner ornaments — all 4 */}
      {([
        [0, 0, 1, 1],
        [100, 0, -1, 1],
        [100, 100, -1, -1],
        [0, 100, 1, -1],
      ] as [number, number, number, number][]).map(([cx, cy, sx, sy], i) => (
        <g key={i}>
          {/* L-bracket */}
          <path
            d={`M${cx + sx * 2},${cy + sy * 9} L${cx + sx * 2},${cy + sy * 2} L${cx + sx * 9},${cy + sy * 2}`}
            fill="none" stroke="rgba(251,191,36,0.6)" strokeWidth="0.4"
          />
          <path
            d={`M${cx + sx * 3.5},${cy + sy * 8} L${cx + sx * 3.5},${cy + sy * 3.5} L${cx + sx * 8},${cy + sy * 3.5}`}
            fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth="0.25"
          />
          {/* Corner diamond */}
          <rect
            x={cx + sx * 2 - 1} y={cy + sy * 2 - 1}
            width="2" height="2"
            fill="rgba(251,191,36,0.7)"
            transform={`rotate(45 ${cx + sx * 2} ${cy + sy * 2})`}
          />
          {/* Small dots */}
          <circle cx={cx + sx * 5} cy={cy + sy * 2.2} r="0.35" fill="rgba(251,191,36,0.45)" />
          <circle cx={cx + sx * 2.2} cy={cy + sy * 5} r="0.35" fill="rgba(251,191,36,0.45)" />
        </g>
      ))}

      {/* Mid-edge ornaments */}
      {([
        [50, 1.8, 0],
        [50, 98.2, 180],
        [1.8, 50, -90],
        [98.2, 50, 90],
      ] as [number, number, number][]).map(([x, y, rot], i) => (
        <g key={`mid-${i}`} transform={`translate(${x},${y}) rotate(${rot})`}>
          <polygon points="0,-2 1.2,0 0,2 -1.2,0" fill="rgba(251,191,36,0.5)" />
          <line x1="-3" y1="0" x2="-1.4" y2="0" stroke="rgba(251,191,36,0.3)" strokeWidth="0.2" />
          <line x1="1.4" y1="0" x2="3" y2="0" stroke="rgba(251,191,36,0.3)" strokeWidth="0.2" />
        </g>
      ))}
    </svg>
  )
}
