export default function MemberAvatar({
  handle,
  color,
  size = 120,
  animated = true,
}) {
  const id = `avatar-${handle}-${Math.random().toString(36).substr(2, 5)}`;
  const chars = handle.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const initials = chars.substring(0, 2);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={animated ? 'animate-float' : ''}
    >
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor="#050810" stopOpacity="0.9" />
        </radialGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={`${id}-clip`}>
          <polygon points="60,5 115,32 115,88 60,115 5,88 5,32" />
        </clipPath>
      </defs>

      {/* Hexagon background */}
      <polygon
        points="60,5 115,32 115,88 60,115 5,88 5,32"
        fill={`url(#${id}-bg)`}
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
        filter={`url(#${id}-glow)`}
      />

      {/* Inner hex ring */}
      <polygon
        points="60,14 107,38 107,82 60,106 13,82 13,38"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        strokeOpacity="0.3"
      />

      {/* Grid lines */}
      <g clipPath={`url(#${id}-clip)`} opacity="0.15">
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="5"
            y1={20 + i * 13}
            x2="115"
            y2={20 + i * 13}
            stroke={color}
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={20 + i * 13}
            y1="5"
            x2={20 + i * 13}
            y2="115"
            stroke={color}
            strokeWidth="0.5"
          />
        ))}
      </g>

      {/* Corner decorations */}
      <g stroke={color} strokeWidth="1" strokeOpacity="0.7" fill="none">
        <polyline points="15,38 15,28 25,28" />
        <polyline points="105,38 105,28 95,28" />
        <polyline points="15,82 15,92 25,92" />
        <polyline points="105,82 105,92 95,92" />
      </g>

      {/* Initials */}
      <text
        x="60"
        y="58"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize="28"
        fontFamily="Orbitron, sans-serif"
        fontWeight="700"
        filter={`url(#${id}-glow)`}
      >
        {initials}
      </text>

      {/* Handle */}
      <text
        x="60"
        y="78"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fillOpacity="0.7"
        fontSize="8"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="2"
      >
        {handle}
      </text>

      {/* Animated pulse ring */}
      {animated && (
        <>
          <polygon
            points="60,2 118,30 118,90 60,118 2,90 2,30"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeOpacity="0.4"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.4;0.1;0.4"
              dur="2s"
              repeatCount="indefinite"
            />
          </polygon>
        </>
      )}
    </svg>
  );
}
