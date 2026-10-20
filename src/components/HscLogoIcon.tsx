import React from 'react';

export interface HscLogoIconProps {
  size?: number | string;
  className?: string;
  theme?: 'dark' | 'light';
  idPrefix?: string;
}

export const HscLogoIcon: React.FC<HscLogoIconProps> = ({
  size = 44,
  className = '',
  theme = 'dark',
  idPrefix = 'hsc',
}) => {
  const isDark = theme === 'dark';

  // Dynamic IDs to avoid SVG gradient collisions if rendered multiple times
  const globeGradId = `${idPrefix}-globe-grad`;
  const orbitGradId = `${idPrefix}-orbit-grad`;
  const leaderGradId = `${idPrefix}-leader-grad`;
  const tieGradId = `${idPrefix}-tie-grad`;
  const teamGradId = `${idPrefix}-team-grad`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Globe Arc & Ring Gradient */}
        <linearGradient id={globeGradId} x1="40" y1="50" x2="190" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isDark ? '#38BDF8' : '#00B4D8'} />
          <stop offset="50%" stopColor={isDark ? '#0284C7' : '#0077B6'} />
          <stop offset="100%" stopColor={isDark ? '#0369A1' : '#023E8A'} />
        </linearGradient>

        {/* Orbit Swoosh 3D Gradient */}
        <linearGradient id={orbitGradId} x1="20" y1="180" x2="220" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isDark ? '#0284C7' : '#0077B6'} />
          <stop offset="40%" stopColor={isDark ? '#38BDF8' : '#0096C7'} />
          <stop offset="75%" stopColor={isDark ? '#22D3EE' : '#00B4D8'} />
          <stop offset="100%" stopColor={isDark ? '#0C4A6E' : '#03045E'} />
        </linearGradient>

        {/* Center Leader Figure */}
        <linearGradient id={leaderGradId} x1="80" y1="90" x2="140" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isDark ? '#1E3A8A' : '#0A2E6B'} />
          <stop offset="100%" stopColor={isDark ? '#0F172A' : '#041B44'} />
        </linearGradient>

        {/* Cyan Tie */}
        <linearGradient id={tieGradId} x1="105" y1="120" x2="115" y2="165" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Side Team Silhouettes */}
        <linearGradient id={teamGradId} x1="60" y1="100" x2="160" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isDark ? '#38BDF8' : '#0096C7'} />
          <stop offset="100%" stopColor={isDark ? '#0284C7' : '#00589B'} />
        </linearGradient>
      </defs>

      {/* Globe Outer Circle */}
      <circle
        cx="110"
        cy="116"
        r="66"
        stroke={`url(#${globeGradId})`}
        strokeWidth="4.5"
      />

      {/* Globe Longitude Curves */}
      <path
        d="M 110 50 C 76 72, 76 160, 110 182"
        stroke={`url(#${globeGradId})`}
        strokeWidth="2.5"
        fill="none"
        opacity={isDark ? 0.9 : 0.8}
      />
      <path
        d="M 110 50 C 144 72, 144 160, 110 182"
        stroke={`url(#${globeGradId})`}
        strokeWidth="2.5"
        fill="none"
        opacity={isDark ? 0.9 : 0.8}
      />

      {/* Globe Latitude Curves */}
      <path
        d="M 64 80 C 88 94, 132 94, 156 80"
        stroke={`url(#${globeGradId})`}
        strokeWidth="2.5"
        fill="none"
        opacity={isDark ? 0.9 : 0.8}
      />
      <path
        d="M 66 154 C 88 140, 132 140, 154 154"
        stroke={`url(#${globeGradId})`}
        strokeWidth="2.5"
        fill="none"
        opacity={isDark ? 0.8 : 0.7}
      />

      {/* LEFT TEAM MEMBER */}
      <circle cx="70" cy="108" r="14" fill={`url(#${teamGradId})`} />
      <path
        d="M 52 160 C 52 136, 62 126, 72 125 C 80 126, 88 132, 90 144 C 78 152, 64 156, 52 160 Z"
        fill={`url(#${teamGradId})`}
      />

      {/* RIGHT TEAM MEMBER */}
      <circle cx="150" cy="108" r="14" fill={`url(#${teamGradId})`} />
      <path
        d="M 168 160 C 168 136, 158 126, 148 125 C 140 126, 132 132, 130 144 C 142 152, 156 156, 168 160 Z"
        fill={`url(#${teamGradId})`}
      />

      {/* CENTER LEADER (Businessman with Suit & Tie) */}
      <circle cx="110" cy="94" r="18.5" fill={`url(#${leaderGradId})`} />

      {/* Suit Torso with V-cutout */}
      <path
        d="M 78 178 C 78 142, 92 128, 102 124 L 110 137 L 118 124 C 128 128, 142 142, 142 178 C 124 186, 96 186, 78 178 Z"
        fill={`url(#${leaderGradId})`}
      />

      {/* White V-Shirt Collar */}
      <path d="M 103 125 L 117 125 L 110 136 Z" fill="#FFFFFF" opacity="0.95" />

      {/* Vibrant Cyan Necktie */}
      <polygon points="107,128 113,128 114,134 110,137 106,134" fill={`url(#${tieGradId})`} />
      <polygon points="107.5,135 112.5,135 115,160 110,169 105,160" fill={`url(#${tieGradId})`} />

      {/* 3D ORBIT SWOOSH (Wrapping around the globe) */}
      <path
        d="M 28 146 C 18 165, 34 184, 68 186 C 112 188, 164 165, 186 132 C 196 116, 196 98, 182 86 C 174 79, 164 77, 152 79 C 148 79.5, 166 73, 182 80 C 204 89, 210 114, 196 138 C 170 176, 110 200, 56 195 C 22 192, 4 170, 16 142 C 20 132, 28 126, 38 120 C 32 128, 28 136, 28 146 Z"
        fill={`url(#${orbitGradId})`}
      />

      {/* Orbit trail sweeping toward top-right satellite */}
      <path
        d="M 132 94 C 158 84, 180 72, 198 64 L 202 70 C 182 78, 160 90, 136 100 Z"
        fill={`url(#${orbitGradId})`}
      />

      {/* Satellite Node / Orbit Dot at top-right */}
      <circle
        cx="204"
        cy="65"
        r="11"
        fill={isDark ? '#38BDF8' : `url(#${leaderGradId})`}
      />
    </svg>
  );
};
