// Script to create high-fidelity SVG assets for the official HSC Global Services logo
import fs from 'fs';
import path from 'path';

// 1. Standalone Icon Emblem SVG (Globe + 3 Professionals + Orbit Swoosh + Satellite Node)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none" className="hsc-logo-icon">
  <defs>
    <!-- Deep Navy to Vibrant Blue Gradient for Globe & Primary Elements -->
    <linearGradient id="hscGlobeGrad" x1="40" y1="50" x2="190" y2="190" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00B4D8" />
      <stop offset="45%" stop-color="#0077B6" />
      <stop offset="100%" stop-color="#023E8A" />
    </linearGradient>

    <!-- Vibrant Orbit Swoosh Gradient -->
    <linearGradient id="hscOrbitGrad" x1="20" y1="180" x2="220" y2="70" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0077B6" />
      <stop offset="35%" stop-color="#0096C7" />
      <stop offset="70%" stop-color="#00B4D8" />
      <stop offset="100%" stop-color="#03045E" />
    </linearGradient>

    <!-- Center Leader Gradient -->
    <linearGradient id="hscLeaderGrad" x1="80" y1="90" x2="140" y2="180" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0A2E6B" />
      <stop offset="100%" stop-color="#041B44" />
    </linearGradient>

    <!-- Cyan Necktie Gradient -->
    <linearGradient id="hscTieGrad" x1="105" y1="120" x2="115" y2="160" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00D2FF" />
      <stop offset="100%" stop-color="#0077B6" />
    </linearGradient>

    <!-- Side Team Members Gradient -->
    <linearGradient id="hscTeamGrad" x1="60" y1="100" x2="160" y2="180" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0096C7" />
      <stop offset="100%" stop-color="#00589B" />
    </linearGradient>
  </defs>

  <!-- Globe Inner White Disc (Guarantees perfect contrast on both dark headers and dark footers) -->
  <circle cx="110" cy="116" r="65.5" fill="#FFFFFF" />

  <!-- Globe Outer Circle (clipped/hollow look with gradient stroke) -->
  <circle cx="110" cy="116" r="66" stroke="url(#hscGlobeGrad)" stroke-width="4.5" />

  <!-- Globe Longitude Curves -->
  <path d="M 110 50 C 76 72, 76 160, 110 182" stroke="url(#hscGlobeGrad)" stroke-width="2.5" fill="none" opacity="0.85" />
  <path d="M 110 50 C 144 72, 144 160, 110 182" stroke="url(#hscGlobeGrad)" stroke-width="2.5" fill="none" opacity="0.85" />

  <!-- Globe Latitude Curves -->
  <path d="M 64 80 C 88 94, 132 94, 156 80" stroke="url(#hscGlobeGrad)" stroke-width="2.5" fill="none" opacity="0.85" />
  <path d="M 66 154 C 88 140, 132 140, 154 154" stroke="url(#hscGlobeGrad)" stroke-width="2.5" fill="none" opacity="0.7" />

  <!-- TEAM MEMBER LEFT -->
  <circle cx="70" cy="108" r="14" fill="url(#hscTeamGrad)" />
  <path d="M 52 160 C 52 136, 62 126, 72 125 C 80 126, 88 132, 90 144 C 78 152, 64 156, 52 160 Z" fill="url(#hscTeamGrad)" />

  <!-- TEAM MEMBER RIGHT -->
  <circle cx="150" cy="108" r="14" fill="url(#hscTeamGrad)" />
  <path d="M 168 160 C 168 136, 158 126, 148 125 C 140 126, 132 132, 130 144 C 142 152, 156 156, 168 160 Z" fill="url(#hscTeamGrad)" />

  <!-- CENTER LEADER (Businessman with Suit & Tie) -->
  <circle cx="110" cy="94" r="18" fill="url(#hscLeaderGrad)" />
  <path d="M 78 178 C 78 142, 92 128, 102 125 L 110 137 L 118 125 C 128 128, 142 142, 142 178 C 124 186, 96 186, 78 178 Z" fill="url(#hscLeaderGrad)" />
  <!-- White V-Shirt Collar Highlight -->
  <path d="M 103 126 L 117 126 L 110 136 Z" fill="#FFFFFF" opacity="0.95" />
  <!-- Cyan Necktie -->
  <polygon points="107,128 113,128 114,134 110,137 106,134" fill="url(#hscTieGrad)" />
  <polygon points="108,135 112,135 114,158 110,166 106,158" fill="url(#hscTieGrad)" />

  <!-- 3D ORBIT SWOOSH (Wrapping around globe) -->
  <path d="M 32 146 C 22 164, 38 182, 72 184 C 114 186, 166 164, 188 131 C 197 116, 197 98, 184 86 C 175 79, 166 77, 155 79 C 151 79.5, 169 73, 184 80 C 204 88, 211 113, 197 136 C 172 173, 114 197, 61 193 C 27 190, 9 168, 20 141 C 24 132, 31 125, 40 119 C 34 127, 31 135, 32 146 Z" fill="url(#hscOrbitGrad)" />
  <path d="M 134 94 C 158 84, 180 72, 198 64 L 201 70 C 182 78, 160 90, 137 100 Z" fill="url(#hscOrbitGrad)" />
  <!-- Satellite Orbit Node -->
  <circle cx="204" cy="65" r="10.5" fill="url(#hscLeaderGrad)" />
</svg>`;

// Helper function to build full logo SVG with specified text color and optional background
function createFullLogoSvg({
  textColor = '#FFFFFF',
  taglineColor = '#E0F2FE',
  sGradStart = '#00D2FF',
  sGradEnd = '#0077B6',
  accentColor = '#00B4D8',
} = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 145" fill="none" className="hsc-logo-full">
  <defs>
    <!-- Deep Navy to Vibrant Blue Gradient for Globe -->
    <linearGradient id="fgGlobeGrad" x1="20" y1="20" x2="130" y2="130" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00B4D8" />
      <stop offset="50%" stop-color="#0077B6" />
      <stop offset="100%" stop-color="#023E8A" />
    </linearGradient>

    <!-- Vibrant Orbit Swoosh Gradient -->
    <linearGradient id="fgOrbitGrad" x1="10" y1="120" x2="140" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0077B6" />
      <stop offset="35%" stop-color="#0096C7" />
      <stop offset="70%" stop-color="#00B4D8" />
      <stop offset="100%" stop-color="#023E8A" />
    </linearGradient>

    <!-- Center Leader Gradient -->
    <linearGradient id="fgLeaderGrad" x1="45" y1="50" x2="90" y2="110" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0A2E6B" />
      <stop offset="100%" stop-color="#041B44" />
    </linearGradient>

    <!-- Cyan Necktie Gradient -->
    <linearGradient id="fgTieGrad" x1="68" y1="75" x2="76" y2="105" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00D2FF" />
      <stop offset="100%" stop-color="#0077B6" />
    </linearGradient>

    <!-- Side Team Members Gradient -->
    <linearGradient id="fgTeamGrad" x1="30" y1="60" x2="105" y2="110" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0096C7" />
      <stop offset="100%" stop-color="#00589B" />
    </linearGradient>

    <!-- Gradient for letter 'S' in HSC -->
    <linearGradient id="fgLetterSGrad" x1="205" y1="25" x2="255" y2="75" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${sGradStart}" />
      <stop offset="100%" stop-color="${sGradEnd}" />
    </linearGradient>
  </defs>

  <!-- ==================== LEFT ICON EMBLEM ==================== -->
  <g transform="translate(6, 12)">
    <!-- Globe Inner White Disc (Ensures perfect visibility and contrast on dark backgrounds) -->
    <circle cx="70" cy="61" r="41.5" fill="#FFFFFF" />

    <!-- Globe Outer Circle Ring -->
    <circle cx="70" cy="61" r="42" stroke="url(#fgGlobeGrad)" stroke-width="3" />

    <!-- Globe Longitude Curves -->
    <path d="M 70 19 C 49 33, 49 89, 70 103" stroke="url(#fgGlobeGrad)" stroke-width="1.8" fill="none" opacity="0.85" />
    <path d="M 70 19 C 91 33, 91 89, 70 103" stroke="url(#fgGlobeGrad)" stroke-width="1.8" fill="none" opacity="0.85" />

    <!-- Globe Latitude Curves -->
    <path d="M 41 40 C 55 49, 85 49, 99 40" stroke="url(#fgGlobeGrad)" stroke-width="1.8" fill="none" opacity="0.85" />
    <path d="M 42 84 C 55 75, 85 75, 98 84" stroke="url(#fgGlobeGrad)" stroke-width="1.8" fill="none" opacity="0.7" />

    <!-- LEFT TEAM MEMBER -->
    <circle cx="45" cy="56" r="9" fill="url(#fgTeamGrad)" />
    <path d="M 33 89 C 33 74, 40 67, 46 66 C 51 67, 56 71, 57 78 C 49 83, 40 86, 33 89 Z" fill="url(#fgTeamGrad)" />

    <!-- RIGHT TEAM MEMBER -->
    <circle cx="95" cy="56" r="9" fill="url(#fgTeamGrad)" />
    <path d="M 107 89 C 107 74, 100 67, 94 66 C 89 67, 84 71, 83 78 C 91 83, 100 86, 107 89 Z" fill="url(#fgTeamGrad)" />

    <!-- CENTER EXECUTIVE LEADER (Navy Suit, White Collar, Cyan Tie) -->
    <circle cx="70" cy="47" r="11.5" fill="url(#fgLeaderGrad)" />
    <path d="M 50 101 C 50 78, 58 70, 65 68 L 70 76 L 75 68 C 82 70, 90 78, 90 101 C 78 106, 62 106, 50 101 Z" fill="url(#fgLeaderGrad)" />
    <!-- Crisp White Collar -->
    <path d="M 66 68 L 74 68 L 70 75 Z" fill="#FFFFFF" opacity="0.98" />
    <!-- Cyan Necktie -->
    <polygon points="68,70 72,70 73,74 70,76 67,74" fill="url(#fgTieGrad)" />
    <polygon points="69,74 71,74 72,90 70,95 68,90" fill="url(#fgTieGrad)" />

    <!-- 3D ORBIT SWOOSH (Wrapping around the globe) -->
    <path d="M 20 81 C 13 92, 23 104, 45 105 C 72 106, 105 92, 119 71 C 125 61, 125 50, 116 43 C 111 39, 105 37, 98 38 C 95 38.5, 107 34, 116 39 C 129 44, 134 60, 125 74 C 109 98, 71 113, 37 111 C 15 109, 4 95, 11 78 C 14 72, 18 68, 24 64 C 20 69, 18 74, 20 81 Z" fill="url(#fgOrbitGrad)" />
    <path d="M 84 48 C 99 42, 114 34, 126 29 L 128 33 C 116 38, 101 46, 86 52 Z" fill="url(#fgOrbitGrad)" />
    <!-- Satellite Node -->
    <circle cx="130" cy="30" r="6.8" fill="url(#fgLeaderGrad)" />
  </g>

  <!-- ==================== RIGHT TYPOGRAPHY ==================== -->
  <!-- HSC Bold Distinctive Acronym -->
  <text x="160" y="74" font-family="'Montserrat', 'Inter', -apple-system, sans-serif" font-size="58" font-weight="900" letter-spacing="3" fill="${textColor}">
    H<tspan fill="url(#fgLetterSGrad)">S</tspan>C
  </text>

  <!-- GLOBAL SERVICES (All-caps with wide tracking) -->
  <text x="162" y="102" font-family="'Jost', 'Montserrat', 'Inter', sans-serif" font-size="19" font-weight="700" letter-spacing="4.5" fill="${textColor}">
    GLOBAL SERVICES
  </text>

  <!-- Tagline: — Connecting Talent with Opportunity — -->
  <!-- Left accent line -->
  <line x1="162" y1="122" x2="184" y2="122" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" />
  <!-- Text -->
  <text x="192" y="126" font-family="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" font-size="11.5" font-weight="500" fill="${taglineColor}" letter-spacing="0.3">
    Connecting Talent with Opportunity
  </text>
  <!-- Right accent line -->
  <line x1="416" y1="122" x2="438" y2="122" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" />
</svg>`;
}

// Generate the primary official transparent logo (optimized for dark header & footer)
const officialDarkLogoSvg = createFullLogoSvg({
  textColor: '#FFFFFF',
  taglineColor: '#E0F2FE',
  sGradStart: '#00D2FF',
  sGradEnd: '#0077B6',
  accentColor: '#00B4D8',
});

// Generate the original white-background/navy-text version for reference
const originalNavyLogoSvg = createFullLogoSvg({
  textColor: '#0A2E6B',
  taglineColor: '#0A2E6B',
  sGradStart: '#00B4D8',
  sGradEnd: '#023E8A',
  accentColor: '#00B4D8',
});

// Write the files to public/images
const imagesDir = path.resolve('./public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 1. Primary official full logo for the website (navbar & footer)
fs.writeFileSync(path.join(imagesDir, 'hsc-global-services-logo.svg'), officialDarkLogoSvg.trim());
fs.writeFileSync(path.join(imagesDir, 'hsc-logo-full.svg'), officialDarkLogoSvg.trim());
fs.writeFileSync(path.join(imagesDir, 'hsc-logo.svg'), officialDarkLogoSvg.trim());

// 2. Original navy text version
fs.writeFileSync(path.join(imagesDir, 'hsc-logo-original.svg'), originalNavyLogoSvg.trim());

// 3. Icon emblem only
fs.writeFileSync(path.join(imagesDir, 'hsc-logo-icon.svg'), iconSvg.trim());

console.log('Successfully written official HSC Global Services logo SVG files!');
