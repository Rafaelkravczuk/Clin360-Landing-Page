/**
 * Logo do Clin360 — anel 360 com batimento (monitor cardiaco).
 * App-icon: quadrado em degrade + a marca em branco. Use `gradientId` unico por
 * instancia para evitar colisao de id quando aparece mais de uma vez na pagina.
 */
export default function LogoMark({
  className,
  gradientId = "clinGrad",
}: {
  className?: string;
  gradientId?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Clin360"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f46e5" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="24" fill={`url(#${gradientId})`} />
      <g
        transform="translate(50 50) scale(0.5)"
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle
          cx="0"
          cy="0"
          r="64"
          strokeWidth="13"
          strokeDasharray="362 40"
          strokeDashoffset="-250"
        />
        <polyline
          points="-48,0 -24,0 -14,-22 -1,26 9,-26 19,0 48,0"
          strokeWidth="9"
        />
      </g>
    </svg>
  );
}
