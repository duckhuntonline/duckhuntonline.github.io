// Game Database & Interactive Portal Logic

// High quality SVG icon generator for game thumbnails
function generateGameSvg(title, bgGradient, iconSvg, label) {
  const [c1, c2] = bgGradient;
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="g_${label}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${c1}" />
          <stop offset="100%" stop-color="${c2}" />
        </linearGradient>
        <filter id="drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.3"/>
        </filter>
      </defs>
      <rect width="200" height="200" rx="20" fill="url(#g_${label})"/>
      <g filter="url(#drop)">
        ${iconSvg}
      </g>
      <rect x="0" y="145" width="200" height="55" fill="rgba(0,0,0,0.55)" rx="0"/>
      <text x="100" y="178" font-family="'Outfit', sans-serif" font-weight="800" font-size="16" fill="#ffffff" text-anchor="middle">
        ${title}
      </text>
    </svg>
  `)}`;
}

// Visual icons dictionary for SVGs
const SVG_ICONS = {
  basketball: `<circle cx="100" cy="85" r="46" fill="#f97316"/>
               <path d="M54 85 H146 M100 39 V131 M68 53 C85 70 85 100 68 117 M132 53 C115 70 115 100 132 117" stroke="#ffffff" stroke-width="4.5" fill="none"/>`,
  ninja: `<circle cx="100" cy="85" r="42" fill="#1e293b"/>
          <path d="M70 80 Q100 95 130 80 Q100 70 70 80" fill="#ef4444"/>
          <circle cx="85" cy="80" r="4" fill="#fff"/><circle cx="115" cy="80" r="4" fill="#fff"/>
          <path d="M58 85 L35 70 M142 85 L165 70" stroke="#ef4444" stroke-width="5" stroke-linecap="round"/>`,
  jigsaw: `<rect x="65" y="50" width="70" height="70" rx="8" fill="#10b981"/>
           <circle cx="100" cy="50" r="14" fill="#10b981"/>
           <circle cx="135" cy="85" r="14" fill="#10b981"/>
           <circle cx="100" cy="85" r="8" fill="#fff"/>`,
  dots: `<circle cx="70" cy="65" r="15" fill="#a855f7"/><circle cx="130" cy="65" r="15" fill="#ec4899"/>
         <circle cx="70" cy="115" r="15" fill="#3b82f6"/><circle cx="130" cy="115" r="15" fill="#10b981"/>
         <path d="M70 65 L130 65 L130 115 L70 115 Z" stroke="#ffffff" stroke-dasharray="6,4" stroke-width="4" fill="none"/>`,
  number13: `<circle cx="100" cy="85" r="45" fill="#f59e0b"/>
             <text x="100" y="100" font-family="'Outfit', sans-serif" font-weight="900" font-size="44" fill="#ffffff" text-anchor="middle">13</text>`,
  duck: `<ellipse cx="100" cy="85" r="38" fill="#eab308"/>
         <circle cx="85" cy="75" r="5" fill="#1e293b"/>
         <polygon points="60,82 40,88 60,94" fill="#f97316"/>
         <path d="M125 75 Q145 70 135 95 Z" fill="#ca8a04"/>`,
  motor: `<circle cx="65" cy="105" r="18" fill="#334155" stroke="#94a3b8" stroke-width="6"/>
          <circle cx="135" cy="105" r="18" fill="#334155" stroke="#94a3b8" stroke-width="6"/>
          <path d="M65 105 L95 80 L120 80 L135 105 M95 80 L110 55" stroke="#ef4444" stroke-width="7" stroke-linecap="round"/>
          <circle cx="112" cy="50" r="9" fill="#f8fafc"/>`,
  rally: `<rect x="55" y="70" width="90" height="40" rx="8" fill="#dc2626"/>
          <rect x="75" y="55" width="50" height="25" rx="5" fill="#38bdf8"/>
          <circle cx="75" cy="112" r="14" fill="#0f172a" stroke="#cbd5e1" stroke-width="5"/>
          <circle cx="125" cy="112" r="14" fill="#0f172a" stroke="#cbd5e1" stroke-width="5"/>`,
  dressup: `<path d="M85 55 Q100 45 115 55 L125 115 L75 115 Z" fill="#ec4899"/>
            <circle cx="100" cy="42" r="14" fill="#fde047"/>
            <path d="M75 115 L65 130 M125 115 L135 130" stroke="#f43f5e" stroke-width="4"/>`,
  tank: `<rect x="60" y="80" width="80" height="35" rx="6" fill="#15803d"/>
         <rect x="80" y="65" width="40" height="20" rx="4" fill="#166534"/>
         <rect x="115" y="70" width="35" height="8" fill="#14532d"/>
         <ellipse cx="100" cy="118" rx="45" ry="8" fill="#334155"/>`,
  checkers: `<rect x="60" y="50" width="80" height="70" fill="#78350f" stroke="#d97706" stroke-width="4"/>
             <circle cx="85" cy="72" r="12" fill="#fef3c7"/>
             <circle cx="115" cy="98" r="12" fill="#1e1b4b"/>`,
  mahjong: `<rect x="70" y="50" width="60" height="75" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
            <text x="100" y="98" font-size="34" fill="#dc2626" font-weight="bold" text-anchor="middle">中</text>`,
  pinball: `<circle cx="100" cy="85" r="45" fill="none" stroke="#f43f5e" stroke-width="8"/>
            <circle cx="85" cy="75" r="10" fill="#38bdf8"/>
            <polygon points="100,105 85,120 115,120" fill="#fbbf24"/>`,
  skate: `<rect x="55" y="95" width="90" height="12" rx="6" fill="#f97316"/>
          <circle cx="75" cy="115" r="8" fill="#e2e8f0"/>
          <circle cx="125" cy="115" r="8" fill="#e2e8f0"/>
          <path d="M85 85 L95 60 L110 70" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>`,
  archery: `<path d="M70 50 Q120 85 70 120" stroke="#d97706" stroke-width="5" fill="none"/>
            <line x1="70" y1="50" x2="70" y2="120" stroke="#e2e8f0" stroke-width="2"/>
            <line x1="60" y1="85" x2="135" y2="85" stroke="#ef4444" stroke-width="4"/>
            <polygon points="135,80 145,85 135,90" fill="#ef4444"/>`,
  plants: `<circle cx="100" cy="85" r="40" fill="#84cc16"/>
           <circle cx="90" cy="80" r="5" fill="#1e293b"/>
           <circle cx="110" cy="80" r="5" fill="#1e293b"/>
           <path d="M92 95 Q100 102 108 95" stroke="#1e293b" stroke-width="3" fill="none"/>
           <path d="M100 45 L100 30 M95 30 Q100 20 105 30" stroke="#166534" stroke-width="4" fill="none"/>`,
  traffic: `<rect x="80" y="45" width="40" height="85" rx="10" fill="#1e293b"/>
            <circle cx="100" cy="62" r="9" fill="#ef4444"/>
            <circle cx="100" cy="87" r="9" fill="#eab308"/>
            <circle cx="100" cy="112" r="9" fill="#22c55e"/>`,
  fishing: `<path d="M70 70 Q100 40 120 75 Q100 110 70 80 Z" fill="#0284c7"/>
            <polygon points="120,75 140,65 140,85" fill="#0284c7"/>
            <circle cx="85" cy="72" r="3" fill="#fff"/>
            <path d="M60 45 L60 85 Q60 95 70 95" stroke="#f59e0b" stroke-width="3" fill="none"/>`,
  skull: `<circle cx="100" cy="80" r="35" fill="#f8fafc"/>
          <circle cx="90" cy="80" r="6" fill="#020617"/>
          <circle cx="110" cy="80" r="6" fill="#020617"/>
          <path d="M85 105 L115 105" stroke="#020617" stroke-width="4"/>`,
  retrobowl: `<ellipse cx="100" cy="85" rx="42" ry="28" fill="#92400e"/>
              <line x1="75" y1="85" x2="125" y2="85" stroke="#fff" stroke-width="3"/>
              <line x1="90" y1="78" x2="90" y2="92" stroke="#fff" stroke-width="2.5"/>
              <line x1="100" y1="78" x2="100" y2="92" stroke="#fff" stroke-width="2.5"/>
              <line x1="110" y1="78" x2="110" y2="92" stroke="#fff" stroke-width="2.5"/>`,
  monkey: `<circle cx="100" cy="85" r="38" fill="#b45309"/>
           <circle cx="68" cy="72" r="14" fill="#b45309"/>
           <circle cx="132" cy="72" r="14" fill="#b45309"/>
           <ellipse cx="100" cy="94" rx="24" ry="16" fill="#fde68a"/>
           <circle cx="92" cy="80" r="4" fill="#1c1917"/>
           <circle cx="108" cy="80" r="4" fill="#1c1917"/>`,
  king: `<circle cx="100" cy="90" r="30" fill="#fed7aa"/>
         <polygon points="75,65 85,45 100,60 115,45 125,65" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
         <circle cx="92" cy="88" r="3" fill="#000"/><circle cx="108" cy="88" r="3" fill="#000"/>`,
  braintest: `<path d="M80 65 Q60 85 80 105 Q100 120 100 105 Q100 65 80 65 Z" fill="#ec4899"/>
              <path d="M120 65 Q140 85 120 105 Q100 120 100 105 Q100 65 120 65 Z" fill="#f43f5e"/>
              <circle cx="100" cy="50" r="12" fill="#fbbf24"/>`,
  stickman: `<circle cx="100" cy="58" r="16" fill="#1e293b"/>
             <line x1="100" y1="74" x2="100" y2="105" stroke="#1e293b" stroke-width="6"/>
             <line x1="100" y1="84" x2="80" y2="96" stroke="#1e293b" stroke-width="6"/>
             <line x1="100" y1="84" x2="125" y2="75" stroke="#1e293b" stroke-width="6"/>
             <line x1="100" y1="105" x2="85" y2="130" stroke="#1e293b" stroke-width="6"/>
             <line x1="100" y1="105" x2="115" y2="130" stroke="#1e293b" stroke-width="6"/>`,
  tunnel: `<circle cx="100" cy="85" r="45" fill="#1e1b4b" stroke="#06b6d4" stroke-width="8"/>
           <circle cx="100" cy="85" r="28" fill="#312e81" stroke="#f43f5e" stroke-width="6"/>
           <circle cx="100" cy="85" r="12" fill="#e0e7ff"/>`,
  slope: `<polygon points="50,115 150,75 150,125 50,125" fill="#059669"/>
          <circle cx="85" cy="88" r="12" fill="#34d399" stroke="#fff" stroke-width="3"/>`,
  pirate: `<circle cx="100" cy="85" r="36" fill="#fdba74"/>
           <path d="M68 65 Q100 40 132 65 Z" fill="#0f172a"/>
           <circle cx="88" cy="82" r="7" fill="#0f172a"/>
           <circle cx="112" cy="82" r="3" fill="#0f172a"/>`,
  fireboy: `<path d="M80 85 Q70 60 85 45 Q90 65 95 55 Q105 85 80 85 Z" fill="#ef4444"/>
            <path d="M120 85 Q130 60 115 45 Q110 65 105 55 Q95 85 120 85 Z" fill="#06b6d4"/>`
};

// Database of New Games (18 real playable games with live logos and sub-game pages)
const NEW_GAMES = [
  { id: 'moto-x3m', title: 'Moto X3M', category: 'Racing', badge: 'TOP', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex-x3m/logo.png', gradient: ['#b45309', '#ea580c'] },
  { id: 'crazy-cars', title: 'Crazy Cars', category: 'Car', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/crazy-cars/logo.png', gradient: ['#b45309', '#d97706'] },
  { id: 'fireboy-and-watergirl-1', title: 'Fireboy and Watergirl 1', category: 'Puzzle', badge: 'TOP', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/fireboy-and-watergirl-1-forest-temple/logo.png', gradient: ['#78350f', '#b45309'] },
  { id: 'burnin-rubber-5-xs', title: 'Burnin Rubber 5 XS', category: 'Racing', badge: 'TOP', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/burnin-rubber-5-xs/logo.png', gradient: ['#991b1b', '#dc2626'] },
  { id: 'vex-x3m', title: 'Vex X3M', category: 'Racing', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex-x3m/logo.png', gradient: ['#1e293b', '#334155'] },
  { id: 'snail-bob-1', title: 'Snail Bob 1', category: 'Adventure', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/snail-bob-1-html5/logo.png', gradient: ['#ca8a04', '#eab308'] },
  { id: 'boat-drift', title: 'Boat Drift', category: 'Racing', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/boat-drift/logo.png', gradient: ['#0369a1', '#0284c7'] },
  { id: '2-player-dark-racing', title: '2 Player Dark Racing', category: 'Car', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/2-player-dark-racing/logo.png', gradient: ['#1e1b4b', '#4338ca'] },
  { id: 'vex3', title: 'Vex 3', category: 'Action', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex3/logo.png', gradient: ['#1e1b4b', '#4338ca'] },
  { id: 'drift-escape', title: 'Drift Escape', category: 'Car', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/drift-escape/logo.png', gradient: ['#1e293b', '#334155'] },
  { id: 'merge-battle-car', title: 'Merge Battle Car', category: 'Car', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/merge-battle-car/logo.png', gradient: ['#1e1b4b', '#312e81'] },
  { id: 'fireboy-and-watergirl-7', title: 'Fireboy and Watergirl 7', category: 'Puzzle', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/fireboy-and-watergirl-7-and-friends/logo.png', gradient: ['#ca8a04', '#eab308'] },
  { id: 'mr-racer-car-racing', title: 'MR RACER - Car Racing', category: 'Car', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/mr-racer-car-racing/logo.png', gradient: ['#1e1b4b', '#312e81'] },
  { id: 'snail-bob-8', title: 'Snail Bob 8', category: 'Adventure', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/snail-bob-8/logo.png', gradient: ['#0e7490', '#06b6d4'] },
  { id: 'vex-x3m-2', title: 'Vex X3M 2', category: 'Racing', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex-x3m-2/logo.png', gradient: ['#374151', '#4b5563'] },
  { id: 'highway-racer-2', title: 'Highway Racer 2', category: 'Car', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/highway-racer-2/logo.png', gradient: ['#374151', '#4b5563'] },
  { id: 'car-speed-racing-tycoon', title: 'Car Speed Racing Tycoon', category: 'Car', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/car-speed-racing-tycoon/logo.png', gradient: ['#4338ca', '#6366f1'] },
  { id: 'snail-bob-2', title: 'Snail Bob 2', category: 'Adventure', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/snail-bob-2-html5/logo.png', gradient: ['#047857', '#10b981'] },
  { id: 'night-city-racing', title: 'Night City Racing', category: 'Racing', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/night-city-racing/logo.png', gradient: ['#581c87', '#9333ea'] },
  { id: 'vex4', title: 'Vex 4', category: 'Action', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex4/logo.png', gradient: ['#0369a1', '#0284c7'] },
  { id: 'rally-racer-dirt', title: 'Rally Racer Dirt', category: 'Racing', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/rally-racer-dirt/logo.png', gradient: ['#78350f', '#a16207'] },
  { id: 'construction-ramp-jumping', title: 'Construction Ramp Jumping', category: 'Car', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/construction-ramp-jumping/logo.png', gradient: ['#ca8a04', '#eab308'] },
  { id: 'vex-x3m-3', title: 'Vex X3M 3', category: 'Racing', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex-x3m-3/logo.png', gradient: ['#0f172a', '#1e293b'] },
  { id: 'snail-bob-5', title: 'Snail Bob 5', category: 'Adventure', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/snail-bob-5-html5/logo.png', gradient: ['#ec4899', '#f43f5e'] },
  { id: 'kart-race-3d', title: 'Kart Race 3D', category: 'Racing', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/kart-race-3d/logo.png', gradient: ['#7c2d12', '#ea580c'] },
  { id: 'burnout-drift-hilltop', title: 'Burnout Drift: Hilltop', category: 'Car', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/burnout-drift-hilltop/logo.png', gradient: ['#15803d', '#16a34a'] },
  { id: 'traffic-jam-3d-gh-pages', title: 'Traffic Jam 3D', category: 'Car', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/traffic-jam-3d-gh-pages/logo.png', gradient: ['#0e7490', '#06b6d4'] },
  { id: 'hill-climb-pixel-car', title: 'Hill Climb Pixel Car', category: 'Car', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/hill-climb-pixel-car/logo.png', gradient: ['#047857', '#10b981'] },
  { id: 'crazy-for-speed', title: 'Crazy for Speed', category: 'Racing', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/crazy-for-speed/logo.png', gradient: ['#0f766e', '#14b8a6'] },
  { id: 'traffic-mania', title: 'Traffic Mania', category: 'Car', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/traffic-mania/logo.png', gradient: ['#1e293b', '#475569'] },
  { id: 'parking-fury-3d-beach-city-2', title: 'Parking Fury 3D Beach City 2', category: 'Car', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/parking-fury-3d-beach-city-2/logo.png', gradient: ['#0284c7', '#38bdf8'] },
];

// Database of Popular Games (24 non-car playable games with live logos and sub-game pages)
const POPULAR_GAMES = [
  { id: 'tunnel-rush', title: 'Tunnel Rush', category: 'Running', badge: 'TOP', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/tunnel-rush/logo.png', gradient: ['#0f172a', '#1e293b'] },
  { id: 'vex-8', title: 'Vex 8', category: 'Action', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex-8/logo.png', gradient: ['#1e1b4b', '#4338ca'] },
  { id: 'gunspin', title: 'Gunspin', category: 'Shooting', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/gunspin/logo.png', gradient: ['#78350f', '#92400e'] },
  { id: 'bomb-it-4', title: 'Bomb It 4', category: 'Arcade', badge: 'TOP', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/bomb-it-4/logo.png', gradient: ['#0369a1', '#0284c7'] },
  { id: 'fireboy-water-2', title: 'Fireboy and Watergirl 2', category: 'Puzzle', badge: 'TOP', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/fireboy-water-2/logo.png', gradient: ['#78350f', '#b45309'] },
  { id: 'gswitch', title: 'G-Switch', category: 'Skill', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/gswitch/logo.png', gradient: ['#047857', '#10b981'] },
  { id: 'jump-in-to-the-plane', title: 'Jump Into The Plane', category: 'Action', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/jump-in-to-the-plane/logo.png', gradient: ['#991b1b', '#dc2626'] },
  { id: 'snail-bob-3', title: 'Snail Bob 3', category: 'Adventure', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/snail-bob-3/logo.png', gradient: ['#ca8a04', '#eab308'] },
  { id: 'vex-9', title: 'Vex 9', category: 'Action', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex-9/logo.png', gradient: ['#1e1b4b', '#312e81'] },
  { id: 'bomb-it-5', title: 'Bomb It 5', category: 'Arcade', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/bomb-it-5/logo.png', gradient: ['#0284c7', '#38bdf8'] },
  { id: 'fireboy-water-3', title: 'Fireboy and Watergirl 3', category: 'Puzzle', badge: 'TOP', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/fireboy-water-3/logo.png', gradient: ['#06b6d4', '#0891b2'] },
  { id: 'vex-hyper-dash', title: 'Vex Hyper Dash', category: 'Running', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex-hyper-dash/logo.png', gradient: ['#0f766e', '#14b8a6'] },
  { id: 'snail-bob-4', title: 'Snail Bob 4', category: 'Adventure', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/snail-bob-4/logo.png', gradient: ['#581c87', '#9333ea'] },
  { id: 'vex-try-to-fly', title: 'Vex Try To Fly', category: 'Skill', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex-try-to-fly/logo.png', gradient: ['#0f172a', '#334155'] },
  { id: 'bomb-it-6', title: 'Bomb It 6', category: 'Arcade', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/bomb-it-6/logo.png', gradient: ['#b45309', '#d97706'] },
  { id: 'fireboy-water-4', title: 'Fireboy and Watergirl 4', category: 'Puzzle', badge: 'TOP', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/fireboy-water-4/logo.png', gradient: ['#15803d', '#16a34a'] },
  { id: 'vex7', title: 'Vex 7', category: 'Action', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex7/logo.png', gradient: ['#374151', '#4b5563'] },
  { id: 'snail-bob-6', title: 'Snail Bob 6', category: 'Adventure', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/snail-bob-6/logo.png', gradient: ['#0369a1', '#38bdf8'] },
  { id: 'bomb-it-7', title: 'Bomb It 7', category: 'Arcade', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/bomb-it-7/logo.png', gradient: ['#831843', '#db2777'] },
  { id: 'fireboy-water-5', title: 'Fireboy and Watergirl 5', category: 'Puzzle', badge: 'TOP', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/fireboy-water-5/logo.png', gradient: ['#7c2d12', '#ea580c'] },
  { id: 'vex6', title: 'Vex 6', category: 'Action', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex6/logo.png', gradient: ['#1e293b', '#475569'] },
  { id: 'snail-bob-7', title: 'Snail Bob 7', category: 'Adventure', badge: 'NEW', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/snail-bob-7/logo.png', gradient: ['#14532d', '#166534'] },
  { id: 'fireboy-water-6', title: 'Fireboy and Watergirl 6', category: 'Puzzle', badge: 'TOP', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/fireboy-water-6/logo.png', gradient: ['#701a75', '#a21caf'] },
  { id: 'vex5', title: 'Vex 5', category: 'Action', badge: 'HOT', image: 'https://duckhuntonline.github.io/gamefile-duckhunonline/vex5/logo.png', gradient: ['#022c22', '#064e3b'] }
];

// Ensure all games have static image file paths
NEW_GAMES.forEach(g => { if (!g.image) g.image = `https://duckhuntonline.github.io/gamefile-duckhunonline/${g.id}/logo.png`; });
POPULAR_GAMES.forEach(g => { if (!g.image) g.image = `https://duckhuntonline.github.io/gamefile-duckhunonline/${g.id}/logo.png`; });

// Featured Game State
let currentFeaturedGame = {
  id: 'duck-hunt-pro',
  title: 'Duck Hunt: Fullscreen, Unblocked',
  category: 'Shooting',
  desc: 'Experience endless fun with Duck Hunt Retro Arcade! Play classic Duck Hunt online anywhere without restrictions with arcade shooting and combo streak modes.',
  tag: 'NOW PLAYING',
  bgGradient: ['#0369a1', '#0284c7'],
  icon: SVG_ICONS.duck,
  image: 'images/duck-hunt-pro.svg'
};

// Helper to match category strings flexibly (e.g. Car / Racing, Action / Adventure)
function isCategoryMatch(gameCategory, targetCategory) {
  if (!targetCategory || targetCategory === 'all') return true;
  const gc = (gameCategory || '').toLowerCase();
  const tc = (targetCategory || '').toLowerCase();
  if (gc === tc) return true;
  if (tc === 'car' && (gc === 'racing' || gc === 'car')) return true;
  if (tc === 'racing' && (gc === 'racing' || gc === 'car')) return true;
  if (tc === 'action' && (gc === 'action' || gc === 'adventure')) return true;
  if (tc === 'skill' && (gc === 'skill' || gc === 'strategy' || gc === 'story')) return true;
  return false;
}

// Render Game Cards
function renderGameGrids() {
  const newGamesGrid = document.getElementById('newGamesGrid');
  const popularGamesGrid = document.getElementById('popularGamesGrid');
  const relatedGamesGrid = document.getElementById('relatedGamesGrid');
  const bodyCat = document.body.getAttribute('data-category')?.toLowerCase();
  const allGames = [...NEW_GAMES, ...POPULAR_GAMES];

  // If on child game page (game.html)
  if (bodyCat === 'game') {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id') || urlParams.get('game') || 'duck-hunt-pro';
    const found = allGames.find(g => g.id === gameId) || currentFeaturedGame;

    currentFeaturedGame = {
      id: found.id,
      title: `${found.title}: Fullscreen, Unblocked`,
      category: found.category,
      desc: found.desc || `Experience endless fun with ${found.title}! Play top ${found.category} unblocked games anywhere without restrictions.`,
      tag: 'NOW PLAYING',
      bgGradient: found.gradient || ['#0369a1', '#0284c7'],
      icon: found.icon || SVG_ICONS.duck,
      image: found.image || `images/${found.id}.svg`
    };

    // Update breadcrumb navigation
    const crumbTitle = document.getElementById('crumbGameTitle');
    const crumbCatLink = document.getElementById('crumbCatLink');
    const crumbCatText = document.getElementById('crumbCatText');
    if (crumbTitle) crumbTitle.textContent = found.title;
    if (crumbCatText) crumbCatText.textContent = found.category;
    if (crumbCatLink) {
      crumbCatLink.href = `${found.category.toLowerCase()}.html`;
    }

    // Update page title & meta
    document.title = `${found.title} - Play Unblocked on DuckHuntOnline.github.io`;
    const catBadge = document.getElementById('featuredCategoryTag');
    const fullDescEl = document.getElementById('gameDetailFullDesc');
    const badgeOverlay = document.getElementById('featuredBadgeOverlay');
    const detailCatBadge = document.getElementById('gameDetailCategoryBadge');

    if (catBadge) catBadge.textContent = found.category;
    if (detailCatBadge) detailCatBadge.textContent = found.category;
    if (badgeOverlay && found.badge) {
      badgeOverlay.innerHTML = `<span>🔥</span> ${found.badge} CHOICE`;
    }
    if (fullDescEl) {
      fullDescEl.textContent = `Play ${found.title} unblocked online in high performance fullscreen mode! Complete missions, master the controls, and achieve high scores directly in your browser without lag or school restrictions.`;
    }

    // Render Related Games
    if (relatedGamesGrid) {
      const sameCat = allGames.filter(g => g.id !== found.id && isCategoryMatch(g.category, found.category));
      const otherCat = allGames.filter(g => g.id !== found.id && !isCategoryMatch(g.category, found.category));
      const related = [...sameCat, ...otherCat].slice(0, 12);
      relatedGamesGrid.innerHTML = related.map(game => createGameCardHtml(game)).join('');
      
      const countEl = document.getElementById('relatedGamesCount');
      if (countEl) countEl.textContent = `${related.length} games`;
    }
    return;
  }

  if (bodyCat && bodyCat !== 'all' && newGamesGrid && !popularGamesGrid) {
    const catGames = allGames.filter(g => isCategoryMatch(g.category, bodyCat));
    newGamesGrid.innerHTML = catGames.map(game => createGameCardHtml(game)).join('');
    
    const countEl = document.getElementById('categoryGameCount');
    if (countEl) {
      countEl.textContent = `${catGames.length} Games Available`;
    }
  } else {
    if (newGamesGrid) {
      newGamesGrid.innerHTML = NEW_GAMES.map(game => createGameCardHtml(game)).join('');
    }
    if (popularGamesGrid) {
      popularGamesGrid.innerHTML = POPULAR_GAMES.map(game => createGameCardHtml(game)).join('');
    }
  }
}

// Generate Game Card as actual <a> link to child game with image
function createGameCardHtml(game) {
  const thumbUrl = game.image || `https://duckhuntonline.github.io/gamefile-duckhunonline/${game.id}/logo.png`;
  const badgeHtml = game.badge ? `<span class="game-badge ${game.badge === 'HOT' ? 'badge-hot' : 'badge-new'}">${game.badge}</span>` : '';
  
  // Dedicated sub-game page routing: prioritize game/<id>.html
  let linkUrl = `game/${game.id}.html`;
  if (game.id === 'duck-hunt-pro') linkUrl = 'game/duck-hunt.html';
  else if (game.id === 'slope-game') linkUrl = 'game/slope-game.html';
  else if (game.id === 'retro-bowl') linkUrl = 'game/retro-bowl.html';
  else if (game.id === 'basket-random') linkUrl = 'game/basket-random.html';

  return `
    <a href="${linkUrl}" class="game-card" data-id="${game.id}" data-category="${game.category.toLowerCase()}" title="${game.title}">
      ${badgeHtml}
      <div class="game-thumb-wrapper">
        <img class="game-thumb" src="${thumbUrl}" alt="${game.title}" loading="lazy"/>
        <div class="game-play-hover-btn">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="game-overlay">
          <div class="game-overlay-title">${game.title}</div>
          <div class="game-overlay-category">${game.category}</div>
        </div>
      </div>
    </a>
  `;
}

// Select a game to update featured or play
function selectGame(gameId) {
  const allGames = [...NEW_GAMES, ...POPULAR_GAMES];
  const found = allGames.find(g => g.id === gameId);
  if (!found) return;

  // If on a category page without hero playing frame, redirect to game.html
  const heroEl = document.getElementById('heroSection');
  if (!heroEl) {
    window.location.href = `game.html?id=${gameId}`;
    return;
  }

  // Update Hero
  currentFeaturedGame = {
    id: found.id,
    title: `${found.title}: Fullscreen, Unblocked`,
    category: found.category,
    desc: `Experience endless fun with ${found.title}! Play anywhere without restrictions, featuring smooth controls and instant unblocked access.`,
    tag: 'READY TO PLAY',
    bgGradient: found.gradient || ['#0369a1', '#0284c7'],
    icon: found.icon,
    image: found.image || `images/${found.id}.svg`
  };

  const posterEl = document.getElementById('featuredPoster');
  const activeIcon = document.getElementById('activeGameIcon');
  if (posterEl) posterEl.setAttribute('data-user-selected', 'true');
  if (activeIcon) activeIcon.setAttribute('data-user-selected', 'true');

  updateHeroUi();

  // If active game is already playing, switch and launch the new game immediately!
  const activeView = document.getElementById('gameActiveView');
  if (activeView && activeView.style.display === 'flex') {
    launchActiveGame();
  }

  // Scroll to hero smoothly if below it
  if (window.scrollY > 300) {
    heroEl.scrollIntoView({ behavior: 'smooth' });
  }
}

// Update Hero UI with current game
function updateHeroUi() {
  const titleEl = document.getElementById('featuredTitle');
  const descEl = document.getElementById('featuredDesc');
  const posterEl = document.getElementById('featuredPoster');
  const tagEl = document.getElementById('featuredTag');

  if (titleEl && (!posterEl || !posterEl.getAttribute('src')?.startsWith('http') || posterEl.hasAttribute('data-user-selected'))) {
    titleEl.textContent = currentFeaturedGame.title;
  }
  if (descEl && (!posterEl || !posterEl.getAttribute('src')?.startsWith('http') || posterEl.hasAttribute('data-user-selected'))) {
    descEl.textContent = currentFeaturedGame.desc;
  }
  if (tagEl) tagEl.textContent = currentFeaturedGame.tag;
  if (posterEl) {
    const customPoster = posterEl.getAttribute('src');
    if (!posterEl.hasAttribute('data-user-selected') && customPoster && (customPoster.startsWith('http') || customPoster.includes('.png') || customPoster.includes('.jpg') || customPoster.includes('.webp'))) {
      posterEl.src = customPoster;
    } else {
      posterEl.src = currentFeaturedGame.image || `images/${currentFeaturedGame.id}.svg`;
    }
  }
}


// ==================== 630PX UNIFIED IN-FRAME GAME ENGINE ====================
let gameLoopId = null;
let gameCanvas = null;
let gameCtx = null;
let score = 0;
let highScore = parseInt(localStorage.getItem('game_high_score') || '0', 10);
let shotsLeft = 15;
let streak = 0;
let particles = [];
let floatingTexts = [];
let audioCtx = null;

// Simple Web Audio API Synthesizer for instant sound
function playSound(type) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'shoot') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'score') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(660, now + 0.08);
      osc.frequency.setValueAtTime(880, now + 0.16);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'over') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.4);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch (e) {
    // AudioContext ignored if not allowed
  }
}

const ENGINE_IFRAMES = {
  'basket-random': 'https://icedodogame.github.io/filegame-icedodo/boat-drift/',
  'duck-hunt': 'https://icedodogame.github.io/filegame-icedodo/boat-drift/',
  'duck-hunt-pro': 'https://icedodogame.github.io/filegame-icedodo/boat-drift/',
  'slope-game': 'game/engine/slope-game.html',
  'retro-bowl': 'game/engine/retro-bowl.html',
  'moto-x3m': 'https://icedodogame.github.io/filegame-icedodo/boat-drift/'
};

// Launch Game Directly Inside the Frame (Supports Iframe & Canvas Engines)
function launchActiveGame() {
  const splashView = document.getElementById('gameSplashView');
  const activeView = document.getElementById('gameActiveView');
  const activeTitle = document.getElementById('activeGameTitle');
  const activeCategory = document.getElementById('activeGameCategory');
  const activeIcon = document.getElementById('activeGameIcon');
  const canvas = document.getElementById('activeGameCanvas');
  const iframe = document.getElementById('activeGameIframe');

  if (activeTitle && currentFeaturedGame && activeIcon?.hasAttribute('data-user-selected')) {
    activeTitle.textContent = currentFeaturedGame.title.split(':')[0];
  }
  if (activeCategory && currentFeaturedGame && activeIcon?.hasAttribute('data-user-selected')) {
    activeCategory.textContent = `${currentFeaturedGame.category} • Fullscreen Game Mode`;
  }
  if (activeIcon) {
    const customIcon = activeIcon.getAttribute('src');
    if (!activeIcon.hasAttribute('data-user-selected') && customIcon && (customIcon.startsWith('http') || customIcon.includes('.png') || customIcon.includes('.jpg') || customIcon.includes('.webp'))) {
      activeIcon.src = customIcon;
    } else if (currentFeaturedGame && currentFeaturedGame.image && !currentFeaturedGame.image.endsWith('.svg')) {
      activeIcon.src = currentFeaturedGame.image;
    } else if (currentFeaturedGame) {
      activeIcon.src = generateGameSvg(currentFeaturedGame.title, currentFeaturedGame.bgGradient, currentFeaturedGame.icon, 'active');
    }
  }

  if (splashView) splashView.style.display = 'none';
  if (activeView) activeView.style.display = 'flex';

  if (iframe) {
    iframe.style.display = 'block';
    if (canvas) canvas.style.display = 'none';

    // Prioritize user's game link set in src or data-src
    const configuredSrc = iframe.getAttribute('src') || iframe.getAttribute('data-src');
    const engineUrl = (currentFeaturedGame && ENGINE_IFRAMES[currentFeaturedGame.id]) || '';

    if (configuredSrc && configuredSrc.trim() !== '' && configuredSrc !== 'about:blank') {
      if (!iframe.src || iframe.src === 'about:blank' || iframe.src.endsWith('about:blank')) {
        iframe.src = configuredSrc;
      }
    } else if (engineUrl) {
      iframe.src = engineUrl;
    }
  } else if (canvas) {
    canvas.style.display = 'block';
    initCanvasGame();
  }
}

function closeActiveGame() {
  const isFs = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
  if (isFs) {
    if (document.exitFullscreen) document.exitFullscreen().catch(err => console.log(err));
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  }

  const splashView = document.getElementById('gameSplashView');
  const activeView = document.getElementById('gameActiveView');
  const iframe = document.getElementById('activeGameIframe');

  if (iframe) {
    if (iframe.src && iframe.src !== 'about:blank' && !iframe.getAttribute('data-src')) {
      iframe.setAttribute('data-src', iframe.getAttribute('src') || iframe.src);
    }
    iframe.src = 'about:blank';
  }

  if (gameLoopId) {
    cancelAnimationFrame(gameLoopId);
    gameLoopId = null;
  }
  if (activeView) activeView.style.display = 'none';
  if (splashView) splashView.style.display = 'grid';
}

function toggleFrameFullscreen() {
  const gameBox = document.getElementById('gameMainBox');
  if (!gameBox) return;
  const isNativeFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
  const isCssFs = gameBox.classList.contains('is-fullscreen');

  if (!isNativeFs && !isCssFs) {
    if (gameBox.requestFullscreen) {
      gameBox.requestFullscreen().then(() => {
        updateFullscreenUI();
      }).catch(err => {
        console.warn('Native requestFullscreen failed, using CSS fallback fullscreen:', err);
        gameBox.classList.add('is-fullscreen');
        document.body.classList.add('game-fullscreen-active');
        updateFullscreenUI();
      });
    } else if (gameBox.webkitRequestFullscreen) {
      gameBox.webkitRequestFullscreen();
    } else if (gameBox.mozRequestFullScreen) {
      gameBox.mozRequestFullScreen();
    } else if (gameBox.msRequestFullscreen) {
      gameBox.msRequestFullscreen();
    } else {
      gameBox.classList.add('is-fullscreen');
      document.body.classList.add('game-fullscreen-active');
      updateFullscreenUI();
    }
  } else {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen().catch(err => console.log(err));
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
    gameBox.classList.remove('is-fullscreen');
    document.body.classList.remove('game-fullscreen-active');
    updateFullscreenUI(false);
  }
}

function updateFullscreenUI(forcedState) {
  const gameBox = document.getElementById('gameMainBox');
  const isNativeFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
  const isFs = typeof forcedState === 'boolean' ? forcedState : isNativeFs;

  if (gameBox) {
    if (isFs) {
      gameBox.classList.add('is-fullscreen');
      document.body.classList.add('game-fullscreen-active');
    } else {
      gameBox.classList.remove('is-fullscreen');
      document.body.classList.remove('game-fullscreen-active');
    }
  }

  const fsBtn = document.getElementById('fullscreenGameBtn') || document.getElementById('fullscreenBtn');
  if (fsBtn) {
    const span = fsBtn.querySelector('span');
    if (span) span.textContent = isFs ? 'Exit Fullscreen' : 'Fullscreen';
    const svg = fsBtn.querySelector('svg');
    if (svg) {
      svg.innerHTML = isFs
        ? '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>'
        : '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>';
    }
  }

  // Adjust canvas size & elements when fullscreen is toggled
  const resizeCanvas = () => {
    const canvas = document.getElementById('activeGameCanvas');
    if (canvas && canvas.style.display !== 'none' && canvas.parentElement) {
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.floor(rect.width);
        canvas.height = Math.floor(rect.height);
        if (typeof hoop !== 'undefined' && hoop) {
          hoop.x = canvas.width - 160;
        }
        if (typeof ball !== 'undefined' && ball && !ball.inAir) {
          ball.y = canvas.height - 80;
        }
      }
    }
  };

  resizeCanvas();
  setTimeout(resizeCanvas, 60);
  setTimeout(resizeCanvas, 180);
  setTimeout(resizeCanvas, 360);
}

function handleAppFullscreenChange() {
  const isNativeFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
  updateFullscreenUI(isNativeFs);
}

document.addEventListener('fullscreenchange', handleAppFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleAppFullscreenChange);
document.addEventListener('mozfullscreenchange', handleAppFullscreenChange);
window.addEventListener('resize', () => {
  const isNativeFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
  if (!isNativeFs) {
    const gameBox = document.getElementById('gameMainBox');
    if (gameBox && !gameBox.classList.contains('is-fullscreen')) {
      updateFullscreenUI(false);
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const gameBox = document.getElementById('gameMainBox');
    if (gameBox) {
      gameBox.classList.remove('is-fullscreen');
    }
    document.body.classList.remove('game-fullscreen-active');
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    updateFullscreenUI(false);
  }
});

// Game State Variables
let hoop = { x: 740, y: 220, vy: 1.6, width: 70, height: 12 };
let ball = { x: 180, y: 460, vx: 0, vy: 0, r: 24, inAir: false };
let bonusTargets = [];

function initCanvasGame() {
  gameCanvas = document.getElementById('activeGameCanvas');
  if (!gameCanvas) return;
  gameCtx = gameCanvas.getContext('2d');

  // Match canvas internal resolution to client dimensions
  const rect = gameCanvas.parentElement.getBoundingClientRect();
  gameCanvas.width = rect.width || 960;
  gameCanvas.height = rect.height || 572;

  score = 0;
  shotsLeft = 15;
  streak = 0;
  particles = [];
  floatingTexts = [];
  bonusTargets = [];

  // Reset ball & hoop
  resetBall();
  hoop.x = gameCanvas.width - 160;
  hoop.y = 200;
  hoop.vy = 1.8;

  // Add a couple bonus flying retro targets (duck style)
  for (let i = 0; i < 3; i++) {
    bonusTargets.push({
      x: Math.random() * (gameCanvas.width - 300) + 200,
      y: 80 + Math.random() * 180,
      vx: (Math.random() * 2 + 1.2) * (Math.random() > 0.5 ? 1 : -1),
      r: 22,
      pts: 200
    });
  }

  // Mouse / Touch shooting interaction
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };

  gameCanvas.onmousedown = (e) => {
    if (shotsLeft <= 0) {
      initCanvasGame();
      return;
    }
    const cRect = gameCanvas.getBoundingClientRect();
    const mx = e.clientX - cRect.left;
    const my = e.clientY - cRect.top;

    if (!ball.inAir) {
      isDragging = true;
      dragStart = { x: mx, y: my };
    }
  };

  gameCanvas.onmouseup = (e) => {
    if (!isDragging || ball.inAir || shotsLeft <= 0) return;
    isDragging = false;
    const cRect = gameCanvas.getBoundingClientRect();
    const mx = e.clientX - cRect.left;
    const my = e.clientY - cRect.top;

    // Calculate throw velocity from drag or direct aim
    const dx = mx - dragStart.x;
    const dy = my - dragStart.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 15) {
      ball.vx = -dx * 0.16;
      ball.vy = -dy * 0.16;
    } else {
      // Direct shot toward click position
      const toX = mx - ball.x;
      const toY = my - ball.y;
      ball.vx = toX * 0.045;
      ball.vy = toY * 0.045 - 2.5;
    }

    // Cap velocity
    ball.vx = Math.max(8, Math.min(24, ball.vx));
    ball.vy = Math.max(-25, Math.min(-10, ball.vy));

    ball.inAir = true;
    shotsLeft--;
    playSound('shoot');
  };

  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  runGameLoop();
}

function resetBall() {
  ball.x = 160;
  ball.y = gameCanvas.height - 80;
  ball.vx = 0;
  ball.vy = 0;
  ball.inAir = false;
}

function runGameLoop() {
  if (!gameCtx) return;
  const W = gameCanvas.width;
  const H = gameCanvas.height;

  // Clear Sky / Stadium Background
  const skyGrad = gameCtx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, '#09152b');
  skyGrad.addColorStop(0.7, '#132342');
  skyGrad.addColorStop(1, '#1e3358');
  gameCtx.fillStyle = skyGrad;
  gameCtx.fillRect(0, 0, W, H);

  // Stadium lights / Court lines
  gameCtx.strokeStyle = 'rgba(255,255,255,0.06)';
  gameCtx.lineWidth = 4;
  gameCtx.beginPath();
  gameCtx.arc(W / 2, H, 260, Math.PI, 0);
  gameCtx.stroke();

  // Floor / Hardwood line
  gameCtx.fillStyle = '#b45309';
  gameCtx.fillRect(0, H - 35, W, 35);
  gameCtx.fillStyle = '#f59e0b';
  gameCtx.fillRect(0, H - 38, W, 3);

  // Update Moving Hoop
  hoop.y += hoop.vy;
  if (hoop.y < 120 || hoop.y > H - 180) {
    hoop.vy *= -1;
  }

  // Draw Basketball Backboard & Rim
  const poleX = hoop.x + 40;
  gameCtx.fillStyle = '#64748b';
  gameCtx.fillRect(poleX, hoop.y - 60, 12, H - (hoop.y - 60)); // Pole
  gameCtx.fillStyle = '#ffffff';
  gameCtx.fillRect(poleX - 6, hoop.y - 80, 14, 110); // Backboard
  gameCtx.strokeStyle = '#ef4444';
  gameCtx.lineWidth = 3;
  gameCtx.strokeRect(poleX - 5, hoop.y - 50, 12, 45); // Target square

  // Rim (Orange ring)
  gameCtx.strokeStyle = '#f97316';
  gameCtx.lineWidth = 6;
  gameCtx.beginPath();
  gameCtx.moveTo(hoop.x - 45, hoop.y);
  gameCtx.lineTo(hoop.x + 8, hoop.y);
  gameCtx.stroke();

  // Net (White mesh)
  gameCtx.strokeStyle = 'rgba(255,255,255,0.7)';
  gameCtx.lineWidth = 2;
  gameCtx.beginPath();
  gameCtx.moveTo(hoop.x - 40, hoop.y);
  gameCtx.lineTo(hoop.x - 30, hoop.y + 35);
  gameCtx.lineTo(hoop.x, hoop.y + 35);
  gameCtx.lineTo(hoop.x + 5, hoop.y);
  gameCtx.stroke();

  // Update & Draw Bonus Flying Targets (Retro arcade duck style)
  for (let i = 0; i < bonusTargets.length; i++) {
    const bt = bonusTargets[i];
    bt.x += bt.vx;
    if (bt.x < 100 || bt.x > W - 220) bt.vx *= -1;

    // Draw target circle
    gameCtx.beginPath();
    gameCtx.arc(bt.x, bt.y, bt.r, 0, Math.PI * 2);
    gameCtx.fillStyle = '#eab308';
    gameCtx.fill();
    gameCtx.strokeStyle = '#ffffff';
    gameCtx.lineWidth = 2;
    gameCtx.stroke();

    gameCtx.fillStyle = '#000';
    gameCtx.font = 'bold 10px sans-serif';
    gameCtx.textAlign = 'center';
    gameCtx.fillText('+200', bt.x, bt.y + 3);

    // Collision with ball
    if (ball.inAir) {
      const dist = Math.hypot(ball.x - bt.x, ball.y - bt.y);
      if (dist < ball.r + bt.r) {
        score += bt.pts;
        streak++;
        playSound('score');
        createParticles(bt.x, bt.y, '#eab308');
        addFloatingText(bt.x, bt.y, '+200 BONUS!');
        bt.x = -100; // teleport out
      }
    }
  }

  // Update Ball Physics
  if (ball.inAir) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy += 0.58; // Gravity

    // Check Basket Collision (Ball goes down through hoop)
    const rimLeft = hoop.x - 45;
    const rimRight = hoop.x + 8;
    if (ball.x > rimLeft && ball.x < rimRight && Math.abs(ball.y - hoop.y) < 16 && ball.vy > 0) {
      streak++;
      const pts = 100 * (streak > 2 ? 2 : 1);
      score += pts;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('game_high_score', highScore);
      }
      playSound('score');
      createParticles(hoop.x - 18, hoop.y + 10, '#f97316');
      addFloatingText(hoop.x - 18, hoop.y - 20, streak > 1 ? `COMBO x${streak}! +${pts}` : `SWISH! +${pts}`);
      ball.vy = 4;
      ball.vx = 0.5;
    }

    // Out of bounds or floor hit
    if (ball.y > H - 55 || ball.x > W + 40 || ball.x < -40) {
      setTimeout(resetBall, 180);
    }
  }

  // Draw Ball
  gameCtx.save();
  gameCtx.beginPath();
  gameCtx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  gameCtx.fillStyle = '#f97316';
  gameCtx.fill();
  gameCtx.lineWidth = 2.5;
  gameCtx.strokeStyle = '#ffffff';
  gameCtx.stroke();
  // Seams
  gameCtx.beginPath();
  gameCtx.arc(ball.x, ball.y, ball.r * 0.65, 0, Math.PI);
  gameCtx.stroke();
  gameCtx.restore();

  // Draw Aim guide if ball is ready to shoot
  if (!ball.inAir && shotsLeft > 0) {
    gameCtx.strokeStyle = 'rgba(255,255,255,0.3)';
    gameCtx.setLineDash([6, 6]);
    gameCtx.beginPath();
    gameCtx.moveTo(ball.x, ball.y);
    gameCtx.quadraticCurveTo((ball.x + hoop.x) / 2, hoop.y - 120, hoop.x - 20, hoop.y);
    gameCtx.stroke();
    gameCtx.setLineDash([]);
  }

  // Update & Draw Particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.025;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }
    gameCtx.fillStyle = p.color;
    gameCtx.globalAlpha = p.alpha;
    gameCtx.beginPath();
    gameCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    gameCtx.fill();
    gameCtx.globalAlpha = 1;
  }

  // Update & Draw Floating Texts
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const ft = floatingTexts[i];
    ft.y -= 1.2;
    ft.alpha -= 0.02;
    if (ft.alpha <= 0) {
      floatingTexts.splice(i, 1);
      continue;
    }
    gameCtx.font = 'bold 18px "Outfit", sans-serif';
    gameCtx.fillStyle = `rgba(255, 193, 7, ${ft.alpha})`;
    gameCtx.textAlign = 'center';
    gameCtx.fillText(ft.text, ft.x, ft.y);
  }

  // Live HUD
  gameCtx.font = 'bold 22px "Outfit", sans-serif';
  gameCtx.fillStyle = '#ffffff';
  gameCtx.textAlign = 'left';
  gameCtx.fillText(`SCORE: ${score}`, 30, 42);

  gameCtx.fillStyle = '#f59e0b';
  gameCtx.fillText(`BEST: ${highScore}`, 200, 42);

  gameCtx.textAlign = 'right';
  gameCtx.fillStyle = shotsLeft <= 3 ? '#ef4444' : '#ffffff';
  gameCtx.fillText(`SHOTS: ${shotsLeft}`, W - 30, 42);

  // Game Over Screen
  if (shotsLeft <= 0 && !ball.inAir) {
    gameCtx.fillStyle = 'rgba(3, 8, 19, 0.82)';
    gameCtx.fillRect(0, 0, W, H);

    gameCtx.textAlign = 'center';
    gameCtx.fillStyle = '#f97316';
    gameCtx.font = '900 42px "Outfit", sans-serif';
    gameCtx.fillText('GAME OVER!', W / 2, H / 2 - 50);

    gameCtx.fillStyle = '#ffffff';
    gameCtx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    gameCtx.fillText(`Final Score: ${score} Points`, W / 2, H / 2);

    gameCtx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    gameCtx.fillStyle = '#94a3b8';
    gameCtx.fillText(`All-time High Score: ${highScore}`, W / 2, H / 2 + 35);

    gameCtx.fillStyle = '#22c55e';
    gameCtx.font = 'bold 18px "Outfit", sans-serif';
    gameCtx.fillText('⚡ Click anywhere to Shoot Again', W / 2, H / 2 + 85);
  }

  gameLoopId = requestAnimationFrame(runGameLoop);
}

function createParticles(x, y, color) {
  for (let i = 0; i < 18; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      r: Math.random() * 4 + 2,
      alpha: 1,
      color
    });
  }
}

function addFloatingText(x, y, text) {
  floatingTexts.push({ x, y, text, alpha: 1 });
}
// ==================== SEARCH & FILTER ====================
function setupSearchAndFilters() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      filterCards(q, null);
    });
  }

  // Category links in Navbar
  document.querySelectorAll('.nav-link[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const curPage = window.location.pathname.split('/').pop() || 'index.html';
      
      // If link points to another page, allow direct browser navigation
      if (href && href !== '#' && href !== curPage) {
        return;
      }

      e.preventDefault();
      const cat = link.getAttribute('data-category').toLowerCase();
      
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Sync category cards
      document.querySelectorAll('.category-card').forEach(c => {
        if (c.getAttribute('data-category')?.toLowerCase() === cat) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });

      filterCards(null, cat);
      
      const firstSection = document.querySelector('.section-wrapper');
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Category cards in Categories Section
  document.querySelectorAll('.category-card[data-category]').forEach(card => {
    card.addEventListener('click', (e) => {
      const href = card.getAttribute('href');
      const curPage = window.location.pathname.split('/').pop() || 'index.html';

      // If card points to another page, allow direct browser navigation
      if (href && href !== '#' && href !== curPage) {
        return;
      }

      e.preventDefault();
      const cat = card.getAttribute('data-category').toLowerCase();
      
      // Highlight active category card
      document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      // Sync navbar
      document.querySelectorAll('.nav-link').forEach(l => {
        if (l.getAttribute('data-category')?.toLowerCase() === cat) {
          l.classList.add('active');
        } else {
          l.classList.remove('active');
        }
      });

      filterCards(null, cat);

      // Smooth scroll to games section
      const firstSection = document.querySelector('.section-wrapper');
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function filterCards(query, category) {
  const cards = document.querySelectorAll('.game-card');
  cards.forEach(card => {
    const title = card.getAttribute('title').toLowerCase();
    const cardCat = card.getAttribute('data-category');

    let matchesQuery = true;
    let matchesCat = true;

    if (query) {
      matchesQuery = title.includes(query);
    }
    if (category && category !== 'all') {
      matchesCat = isCategoryMatch(cardCat, category);
    }

    if (matchesQuery && matchesCat) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const bodyCat = document.body.getAttribute('data-category')?.toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  const gameParam = urlParams.get('id') || urlParams.get('game');
  
  if (bodyCat === 'game') {
    const allGames = [...NEW_GAMES, ...POPULAR_GAMES];
    const match = allGames.find(g => g.id === (gameParam || 'duck-hunt-pro'));
    if (match) {
      currentFeaturedGame = {
        id: match.id,
        title: `${match.title}: Fullscreen, Unblocked`,
        category: match.category,
        desc: match.desc || `Experience endless fun with ${match.title}! Play top ${match.category} unblocked games anywhere without restrictions.`,
        tag: 'NOW PLAYING',
        bgGradient: match.gradient || ['#0369a1', '#0284c7'],
        icon: match.icon,
        image: match.image || `images/${match.id}.svg`
      };
    }
  } else if (bodyCat && bodyCat !== 'all') {
    const allGames = [...NEW_GAMES, ...POPULAR_GAMES];
    const match = allGames.find(g => isCategoryMatch(g.category, bodyCat));
    if (match) {
      currentFeaturedGame = {
        id: match.id,
        title: `${match.title}: Fullscreen, Unblocked`,
        category: match.category,
        desc: `Experience endless fun with ${match.title}! Play top ${match.category} unblocked games anywhere without restrictions.`,
        tag: 'NOW PLAYING',
        bgGradient: match.gradient,
        icon: match.icon,
        image: match.image || `images/${match.id}.svg`
      };
    }
  }

  renderGameGrids();
  updateHeroUi();
  setupSearchAndFilters();

  // If URL has ?game=id on index.html, select that game
  if (gameParam && bodyCat !== 'game') {
    selectGame(gameParam);
  }

  if (bodyCat && bodyCat !== 'all' && bodyCat !== 'game') {
    filterCards(null, bodyCat);

    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('data-category')?.toLowerCase() === bodyCat);
    });
    document.querySelectorAll('.category-card').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-category')?.toLowerCase() === bodyCat);
    });
  }

  // Play button on Hero: PLAY GAME DIRECTLY IN THE 630PX FRAME!
  const playBtn = document.getElementById('playMainBtn');
  if (playBtn) {
    playBtn.addEventListener('click', launchActiveGame);
  }

  const restartBtn = document.getElementById('restartGameBtn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      const iframe = document.getElementById('activeGameIframe');
      if (iframe) {
        const currentSrc = iframe.src && iframe.src !== 'about:blank' ? iframe.src : (iframe.getAttribute('src') || iframe.getAttribute('data-src'));
        if (currentSrc && currentSrc !== 'about:blank') {
          iframe.src = 'about:blank';
          setTimeout(() => { iframe.src = currentSrc; }, 50);
        }
      }
    });
  }

  const fsBtn = document.getElementById('fullscreenGameBtn') || document.getElementById('fullscreenBtn');
  if (fsBtn) {
    fsBtn.addEventListener('click', toggleFrameFullscreen);
  }

  const closeBtn = document.getElementById('closeGameBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeActiveGame);
  }
});
