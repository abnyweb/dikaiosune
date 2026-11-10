import React, { useState } from 'react';

export default function HeroArtwork() {
  const [viewMode, setViewMode] = useState('photo'); // 'photo' | 'vector'
  const [activeHotspot, setActiveHotspot] = useState(null);

  const hotspots = [
    {
      id: 'vet-college',
      title: 'Veterinary College & 10 Labs',
      subtitle: 'Teaching Hospital & Academic Complex',
      x: '38%',
      y: '52%',
      desc: '10 specialised labs, veterinary clinical hospital & BVSc/MVSc degree faculties integrated with live farm operations.',
      tag: 'Academic Hub'
    },
    {
      id: 'feed-mill',
      title: 'Commercial Feed Mill & Silos',
      subtitle: 'Multi-Species Nutrition Facility',
      x: '64%',
      y: '48%',
      desc: 'Precision feed formulation for swine, poultry, and ruminants, storing grain and feeding the living campus herds.',
      tag: 'Feed Nutrition'
    },
    {
      id: 'gir-dairy',
      title: 'Gir Cattle Dairy Unit',
      subtitle: 'Indigenous Breeding & Pastures',
      x: '28%',
      y: '68%',
      desc: 'Free-range paddocks, climate-resilient indigenous breeds, and automated milking with bio-waste directed to biogas.',
      tag: 'Livestock Care'
    },
    {
      id: 'crops-mustard',
      title: '112-Acre Fodder & Crop Belt',
      subtitle: 'Closed-Loop Organic Agriculture',
      x: '72%',
      y: '72%',
      desc: 'High-yield silage corn, legumes, and mustard fields enriched by organic digestate bio-fertiliser.',
      tag: 'Soil Fertility'
    }
  ];

  return (
    <div className="relative w-full max-w-[460px] aspect-square flex flex-col items-center justify-center select-none group">
      
      {/* Outer Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-leaf/30 via-harvest/20 to-transparent blur-2xl transform scale-105 pointer-events-none" />

      {/* Main Circular Medallion Frame */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-harvest/60 shadow-[0_16px_50px_rgba(0,0,0,0.5)] bg-[#142319] flex items-center justify-center">
        
        {/* ======================================================== */}
        {/* VIEW 1: PHOTOREALISTIC CAMPUS DRONE VIEW                 */}
        {/* ======================================================== */}
        {viewMode === 'photo' && (
          <div className="absolute inset-0 w-full h-full">
            {/* Campus Photo Base */}
            <img 
              src="/images/dikaiosune_campus_hero.jpg" 
              alt="Dikaiosune Eco-Farm and Veterinary University Campus Aerial View at Sunrise" 
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            {/* Cinematic Golden Sunrise Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-forest-dark/85 via-forest/30 to-harvest-gold/20 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-transparent to-forest-dark/30 pointer-events-none" />

            {/* Animated Golden Sun in Sky */}
            <div className="absolute top-[18%] right-[22%] pointer-events-none">
              {/* Rotating Sunbeams */}
              <div className="absolute -inset-16 animate-sun-rays opacity-40">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {[...Array(12)].map((_, i) => (
                    <line 
                      key={i} 
                      x1="100" 
                      y1="100" 
                      x2={100 + 85 * Math.cos((i * 30 * Math.PI) / 180)} 
                      y2={100 + 85 * Math.sin((i * 30 * Math.PI) / 180)} 
                      stroke="#FFE899" 
                      strokeWidth="2.5" 
                      strokeDasharray="4 6"
                      opacity="0.7"
                    />
                  ))}
                </svg>
              </div>

              {/* Pulsing Sun Orb */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#FFFCE8] via-[#FFD166] to-[#C08A2E] shadow-[0_0_35px_#FFD166] animate-sun-glow flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/70 blur-sm" />
              </div>
            </div>

            {/* Atmospheric Drifting Pollen / Morning Light Motes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <span className="absolute bottom-[28%] left-[25%] w-2 h-2 rounded-full bg-harvest-gold/80 blur-[1px] animate-float-1" />
              <span className="absolute bottom-[35%] right-[32%] w-1.5 h-1.5 rounded-full bg-yellow-200/90 blur-[0.5px] animate-float-2" />
              <span className="absolute bottom-[20%] left-[55%] w-2.5 h-2.5 rounded-full bg-[#FFE58F]/70 blur-[1px] animate-float-3" />
              <span className="absolute bottom-[45%] left-[40%] w-1 h-1 rounded-full bg-white/80 animate-float-4" />
            </div>

            {/* Interactive Campus Hotspot Pins */}
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                style={{ left: spot.x, top: spot.y }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                onMouseEnter={() => setActiveHotspot(spot)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
              >
                {/* Pulsing Pin Ring */}
                <div className="relative flex items-center justify-center group/pin">
                  <span className="absolute w-6 h-6 rounded-full bg-harvest/40 animate-ping" />
                  <span className="relative w-4 h-4 rounded-full bg-harvest-gold border-2 border-forest-dark shadow-md flex items-center justify-center transition-transform group-hover/pin:scale-125">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: REALISTIC ARCHITECTURAL MASTER VECTOR             */}
        {/* ======================================================== */}
        {viewMode === 'vector' && (
          <div className="absolute inset-0 w-full h-full">
            <svg 
              viewBox="0 0 400 400" 
              className="w-full h-full select-none"
              aria-label="Realistic Dikaiosune Farm & University Architectural Illustration"
            >
              <defs>
                {/* Sky Gradient */}
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#12251A" />
                  <stop offset="45%" stopColor="#1E3E2B" />
                  <stop offset="80%" stopColor="#30583A" />
                  <stop offset="100%" stopColor="#4D7048" />
                </linearGradient>

                {/* Sun Gradient */}
                <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFDF0" />
                  <stop offset="35%" stopColor="#FFE082" />
                  <stop offset="70%" stopColor="#E2C27D" />
                  <stop offset="100%" stopColor="#C08A2E" />
                </radialGradient>

                {/* Sun Glow Filter */}
                <filter id="sunBlur" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Silo Metallic Gradients */}
                <linearGradient id="siloGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9C9585" />
                  <stop offset="30%" stopColor="#D9D0BE" />
                  <stop offset="70%" stopColor="#F5EFE3" />
                  <stop offset="100%" stopColor="#8C8575" />
                </linearGradient>

                <linearGradient id="siloDomeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E2C27D" />
                  <stop offset="60%" stopColor="#C08A2E" />
                  <stop offset="100%" stopColor="#7A5410" />
                </linearGradient>

                {/* Roof Terracotta Gradient */}
                <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A85A38" />
                  <stop offset="50%" stopColor="#8B4A2B" />
                  <stop offset="100%" stopColor="#69331A" />
                </linearGradient>

                {/* Building Wall Gradient */}
                <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E5DCCB" />
                  <stop offset="50%" stopColor="#F6F1E7" />
                  <stop offset="100%" stopColor="#D3C7B2" />
                </linearGradient>

                {/* Rolling Green Hills Gradients */}
                <linearGradient id="hillBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2F573B" />
                  <stop offset="100%" stopColor="#1E3A2B" />
                </linearGradient>

                <linearGradient id="hillMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4A754E" />
                  <stop offset="100%" stopColor="#2F5435" />
                </linearGradient>

                <linearGradient id="hillFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5E8D5F" />
                  <stop offset="100%" stopColor="#3F6B45" />
                </linearGradient>
              </defs>

              {/* Sky Background */}
              <circle cx="200" cy="200" r="190" fill="url(#skyGrad)" />

              {/* Distant Tree Line / Agro-Forestry Buffers */}
              <path 
                d="M30 250 Q60 238 90 244 T160 235 T240 240 T320 232 T380 248 L380 290 L30 290 Z" 
                fill="#162E20" 
                opacity="0.85"
              />

              {/* Radiant Animated Sun */}
              <g className="animate-sun-glow">
                {/* Sun Glow Corona */}
                <circle cx="295" cy="120" r="42" fill="#FFE899" opacity="0.3" filter="url(#sunBlur)" />
                <circle cx="295" cy="120" r="32" fill="url(#sunGrad)" />
                {/* Soft highlight reflection */}
                <circle cx="288" cy="112" r="10" fill="#FFFFFF" opacity="0.4" />
              </g>

              {/* Rotating Sunbeams */}
              <g className="animate-sun-rays" style={{ transformOrigin: '295px 120px' }} opacity="0.35">
                {[...Array(8)].map((_, i) => (
                  <line 
                    key={i} 
                    x1="295" 
                    y1="120" 
                    x2={295 + 70 * Math.cos((i * 45 * Math.PI) / 180)} 
                    y2={120 + 70 * Math.sin((i * 45 * Math.PI) / 180)} 
                    stroke="#FFDE82" 
                    strokeWidth="2" 
                    strokeDasharray="3 5" 
                  />
                ))}
              </g>

              {/* Far Rolling Green Pastures (Layer 1) */}
              <path 
                d="M20 270 Q90 230 180 248 T340 232 Q370 238 395 248 L395 400 L20 400 Z" 
                fill="url(#hillBackGrad)" 
              />

              {/* Middle Pasture Ridge with Grazing Cattle (Layer 2) */}
              <path 
                d="M10 295 Q100 252 200 275 T395 262 L395 400 L10 400 Z" 
                fill="url(#hillMidGrad)" 
              />

              {/* Realistic Veterinary Academic Building */}
              <g id="academic-building">
                {/* Shadow */}
                <polygon points="98,248 185,248 195,255 105,255" fill="#14281B" opacity="0.4" />
                
                {/* Main Building Body */}
                <rect x="100" y="196" width="82" height="50" fill="url(#wallGrad)" rx="1" />
                
                {/* Base Plinth */}
                <rect x="97" y="244" width="88" height="5" fill="#8C8370" />

                {/* Terracotta Hip Roof */}
                <polygon points="92,198 141,162 190,198" fill="url(#roofGrad)" />
                <polygon points="141,162 144,162 190,198 187,198" fill="#582914" opacity="0.4" />

                {/* Academic Cupola / Belfry */}
                <rect x="135" y="148" width="12" height="15" fill="#E5DCCB" />
                <polygon points="133,148 141,136 149,148" fill="#C08A2E" />

                {/* Arched Central Portico Entrance */}
                <path d="M133 244 L133 218 Q141 211 149 218 L149 244 Z" fill="#8B4A2B" />
                <rect x="131" y="216" width="20" height="3" fill="#F6F1E7" />
                {/* Portico Columns */}
                <rect x="129" y="219" width="3" height="25" fill="#F6F1E7" />
                <rect x="150" y="219" width="3" height="25" fill="#F6F1E7" />

                {/* Architectural Windows with Glazing */}
                <rect x="108" y="206" width="14" height="15" rx="1" fill="#2C4835" />
                <line x1="115" y1="206" x2="115" y2="221" stroke="#F6F1E7" strokeWidth="1" />
                <line x1="108" y1="213" x2="122" y2="213" stroke="#F6F1E7" strokeWidth="1" />

                <rect x="160" y="206" width="14" height="15" rx="1" fill="#2C4835" />
                <line x1="167" y1="206" x2="167" y2="221" stroke="#F6F1E7" strokeWidth="1" />
                <line x1="160" y1="213" x2="174" y2="213" stroke="#F6F1E7" strokeWidth="1" />
              </g>

              {/* Feed Mill High-Tech Cylindrical Silos */}
              <g id="feed-mill-silos">
                {/* Silo 1 (Left, shorter) */}
                <rect x="202" y="202" width="26" height="50" fill="url(#siloGrad1)" rx="1" />
                <path d="M202 202 Q215 186 228 202 Z" fill="url(#siloDomeGrad)" />
                {/* Horizontal corrugated silo rings */}
                <line x1="202" y1="214" x2="228" y2="214" stroke="#7A7263" strokeWidth="0.8" opacity="0.6" />
                <line x1="202" y1="226" x2="228" y2="226" stroke="#7A7263" strokeWidth="0.8" opacity="0.6" />
                <line x1="202" y1="238" x2="228" y2="238" stroke="#7A7263" strokeWidth="0.8" opacity="0.6" />

                {/* Silo 2 (Right, taller) */}
                <rect x="233" y="186" width="28" height="66" fill="url(#siloGrad1)" rx="1" />
                <path d="M233 186 Q247 168 261 186 Z" fill="url(#siloDomeGrad)" />
                <line x1="233" y1="200" x2="261" y2="200" stroke="#7A7263" strokeWidth="0.8" opacity="0.6" />
                <line x1="233" y1="214" x2="261" y2="214" stroke="#7A7263" strokeWidth="0.8" opacity="0.6" />
                <line x1="233" y1="228" x2="261" y2="228" stroke="#7A7263" strokeWidth="0.8" opacity="0.6" />
                <line x1="233" y1="242" x2="261" y2="242" stroke="#7A7263" strokeWidth="0.8" opacity="0.6" />

                {/* Silo Access Bridge & Grain Elevator Spire */}
                <line x1="215" y1="188" x2="247" y2="188" stroke="#5A5346" strokeWidth="1.8" />
                <line x1="264" y1="172" x2="264" y2="252" stroke="#C08A2E" strokeWidth="2.5" />
                <rect x="260" y="166" width="8" height="8" fill="#8B4A2B" />
              </g>

              {/* Grazing Gir Cattle Silhouettes on Pasture */}
              <g id="gir-cattle" fill="#203825" opacity="0.85">
                {/* Cow 1 */}
                <ellipse cx="62" cy="274" rx="9" ry="5.5" />
                <ellipse cx="54" cy="270" rx="3.5" ry="4" />
                <circle cx="58" cy="268" r="2" /> {/* Characteristic Hump */}
                <line x1="57" y1="279" x2="57" y2="286" stroke="#203825" strokeWidth="1.8" />
                <line x1="66" y1="279" x2="66" y2="286" stroke="#203825" strokeWidth="1.8" />

                {/* Cow 2 (Further away) */}
                <ellipse cx="82" cy="265" rx="6" ry="3.8" />
                <circle cx="79" cy="261" r="1.5" />
                <line x1="79" y1="268" x2="79" y2="273" stroke="#203825" strokeWidth="1.4" />
                <line x1="85" y1="268" x2="85" y2="273" stroke="#203825" strokeWidth="1.4" />
              </g>

              {/* Lush Foreground Green Meadow (Layer 3) */}
              <path 
                d="M0 310 Q120 270 220 298 T400 285 L400 400 L0 400 Z" 
                fill="url(#hillFrontGrad)" 
              />

              {/* Organic Furrows & Blooming Golden Mustard Patches */}
              <g id="mustard-blooms" fill="#FFD166">
                {/* Cluster 1 */}
                <circle cx="55" cy="340" r="4" />
                <circle cx="64" cy="336" r="3" />
                <circle cx="72" cy="344" r="4.5" />
                <circle cx="82" cy="338" r="3.5" />
                <circle cx="95" cy="348" r="4" />

                {/* Cluster 2 */}
                <circle cx="160" cy="360" r="3.5" />
                <circle cx="172" cy="354" r="4" />
                <circle cx="185" cy="362" r="3" />

                {/* Cluster 3 (Right) */}
                <circle cx="280" cy="335" r="4.5" />
                <circle cx="295" cy="328" r="3.5" />
                <circle cx="310" cy="338" r="4" />
                <circle cx="330" cy="346" r="5" />
                <circle cx="348" cy="340" r="3.5" />
                <circle cx="365" cy="352" r="4" />
              </g>

              {/* Decorative Grass Spire Sprigs */}
              <path d="M45 328 L43 320 M47 328 L48 318 M130 350 L128 342 M320 326 L322 316" stroke="#295130" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {/* ======================================================== */}
        {/* SHARED ROTATING CLOSED-LOOP CELESTIAL ORBIT               */}
        {/* ======================================================== */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Rotating Dashed Circular Loop */}
          <div className="w-[84%] h-[84%] rounded-full border-2 border-dashed border-harvest-gold/80 animate-spin-slow" />
          
          {/* Second Subtle Reverse Guide Ring */}
          <div className="absolute w-[94%] h-[94%] rounded-full border border-forest-light/40 animate-spin-slow-reverse" />

          {/* Orbiting Traveling Golden Energy Node */}
          <div className="absolute w-[84%] h-[84%] rounded-full animate-spin-slow flex items-start justify-center">
            <span className="w-3.5 h-3.5 -mt-1.5 rounded-full bg-harvest-gold shadow-[0_0_12px_#FFD166] border-2 border-white" />
          </div>
        </div>

        {/* ======================================================== */}
        {/* ACTIVE HOTSPOT POPOVER CARD                              */}
        {/* ======================================================== */}
        {activeHotspot && (
          <div className="absolute bottom-5 inset-x-5 z-30 bg-forest-dark/95 backdrop-blur-md border border-harvest-gold/50 p-3.5 rounded-2xl shadow-2xl text-cream animate-fadeIn">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-harvest-gold bg-harvest/20 px-2 py-0.5 rounded-full">
                {activeHotspot.tag}
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                className="text-sage hover:text-white text-xs px-1"
                aria-label="Close hotspot info"
              >
                ✕
              </button>
            </div>
            <h5 className="font-serif font-bold text-sm text-white leading-tight">
              {activeHotspot.title}
            </h5>
            <p className="text-[11px] text-sage-light leading-snug mt-1">
              {activeHotspot.desc}
            </p>
          </div>
        )}

        {/* Bottom Campus Live Status Badge */}
        <div className="absolute bottom-2.5 inset-x-0 flex justify-center pointer-events-none z-10">
          <div className="bg-forest-dark/90 backdrop-blur-sm border border-forest-light/70 px-3.5 py-1 rounded-full flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] tracking-wider uppercase font-semibold text-sage-light">
              112-Acre Closed Loop · Barabanki
            </span>
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE MODE TOGGLE (Drone Photo / Master Vector)     */}
      {/* ======================================================== */}
      <div className="mt-3.5 flex items-center gap-1.5 bg-forest-dark/80 backdrop-blur-md p-1 rounded-full border border-forest-light shadow-lg">
        <button
          onClick={() => setViewMode('photo')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            viewMode === 'photo'
              ? 'bg-harvest text-white shadow-md'
              : 'text-sage hover:text-white'
          }`}
          aria-pressed={viewMode === 'photo'}
        >
          <span>📸</span>
          <span>Realistic Drone View</span>
        </button>

        <button
          onClick={() => setViewMode('vector')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            viewMode === 'vector'
              ? 'bg-harvest text-white shadow-md'
              : 'text-sage hover:text-white'
          }`}
          aria-pressed={viewMode === 'vector'}
        >
          <span>🎨</span>
          <span>Architectural Vector</span>
        </button>
      </div>

    </div>
  );
}
