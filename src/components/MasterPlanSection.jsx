import React from 'react';

export default function MasterPlanSection() {
  const zones = [
    { color: '#1E3A2B', title: 'University campus', desc: 'Academic blocks, teaching hospital, hostels, at the public entrance', tag: 'Entrance' },
    { color: '#C08A2E', title: 'Feed mill & warehouse', desc: 'Clean zone with its own truck gate', tag: 'Upwind' },
    { color: '#8B4A2B', title: 'Pig cluster', desc: 'Breeding, nursery, finishing; shower-in biosecurity', tag: 'Isolated' },
    { color: '#A8693F', title: 'Poultry', desc: 'Layer and broiler houses, egg grading', tag: 'Isolated' },
    { color: '#6E8F64', title: 'Gir dairy & ghee room', desc: 'Herd, milking parlour, export-standard ghee room', tag: 'Central' },
    { color: '#E2C27D', title: 'Research units & labs', desc: 'Goats, fish tanks, apiary, specialised labs', tag: 'Near campus' },
    { color: '#5B6359', title: 'Biogas & fertiliser', desc: 'Digester, gas upgrading, separator', tag: 'Downwind' },
    { color: '#A9BFA0', title: 'Green belt & fields', desc: 'Fodder, flower gardens, bee pasture, tree buffer', tag: 'Perimeter' }
  ];

  return (
    <section id="masterplan" className="py-24 bg-paper border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-[13px] tracking-[0.14em] uppercase font-semibold text-harvest mb-2.5">
            Master plan
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-forest leading-tight mb-4">
            How the ~112 acres are laid out
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            Zones are arranged by biosecurity and wind direction: the university and visitors at the entrance, clean feed production upwind, animal units in separated clusters, and the biogas plant downwind.
          </p>
        </div>

        {/* 2-Column Grid: Map on left, Zones list on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Map on Left */}
          <div className="lg:col-span-7 bg-[#EEF2E6] rounded-[20px] overflow-hidden border border-line p-2 shadow-sm">
            <svg 
              viewBox="0 0 640 460" 
              className="w-full h-auto block select-none"
              role="img" 
              aria-label="Illustrative site zoning plan showing the university at the entrance, feed mill, animal clusters, biogas plant and green belt"
            >
              <rect width="640" height="460" fill="#EEF2E6" />
              <rect x="12" y="12" width="616" height="436" rx="18" fill="none" stroke="#3F6B45" strokeWidth="10" strokeOpacity="0.35" />
              
              <rect x="30" y="300" width="200" height="130" rx="10" fill="#1E3A2B" />
              <text x="130" y="360" textAnchor="middle" fill="#F6F1E7" font-family="Georgia,serif" fontSize="17">University</text>
              <text x="130" y="382" textAnchor="middle" fill="#A9BFA0" font-family="sans-serif" fontSize="12">campus &amp; hospital</text>
              
              <rect x="30" y="30" width="200" height="120" rx="10" fill="#C08A2E" />
              <text x="130" y="96" textAnchor="middle" fill="#fff" font-family="Georgia,serif" fontSize="17">Feed mill</text>
              
              <rect x="30" y="165" width="200" height="120" rx="10" fill="#E2C27D" />
              <text x="130" y="222" textAnchor="middle" fill="#1E3A2B" font-family="Georgia,serif" fontSize="16">Research units</text>
              <text x="130" y="242" textAnchor="middle" fill="#5B6359" font-family="sans-serif" fontSize="12">goats · fish · bees · labs</text>
              
              <rect x="250" y="30" width="170" height="190" rx="10" fill="#8B4A2B" />
              <text x="335" y="128" textAnchor="middle" fill="#fff" font-family="Georgia,serif" fontSize="17">Pig cluster</text>
              
              <rect x="440" y="30" width="170" height="190" rx="10" fill="#A8693F" />
              <text x="525" y="120" textAnchor="middle" fill="#fff" font-family="Georgia,serif" fontSize="17">Poultry</text>
              <text x="525" y="140" textAnchor="middle" fill="#F2D9C9" font-family="sans-serif" fontSize="12">layers · broilers</text>
              
              <rect x="250" y="240" width="170" height="100" rx="10" fill="#6E8F64" />
              <text x="335" y="295" textAnchor="middle" fill="#fff" font-family="Georgia,serif" fontSize="16">Gir dairy</text>
              
              <rect x="440" y="240" width="170" height="100" rx="10" fill="#5B6359" />
              <text x="525" y="295" textAnchor="middle" fill="#fff" font-family="Georgia,serif" fontSize="16">Biogas plant</text>
              
              <rect x="250" y="355" width="360" height="75" rx="10" fill="#A9BFA0" />
              <text x="430" y="398" textAnchor="middle" fill="#1E3A2B" font-family="Georgia,serif" fontSize="16">Fodder, flowers &amp; bee pasture</text>
              
              <path d="M8 380 L30 380" stroke="#1E3A2B" strokeWidth="4" />
              <text x="20" y="455" fill="#5B6359" font-family="sans-serif" fontSize="11">Main gate</text>
            </svg>
          </div>

          {/* Zones List on Right */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-line">
              {zones.map((zone, idx) => (
                <li key={idx} className="py-3.5 flex items-baseline gap-3.5">
                  <span 
                    className="w-3.5 h-3.5 rounded-[4px] shrink-0 mt-1 inline-block"
                    style={{ backgroundColor: zone.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <b className="text-forest font-semibold text-base block">{zone.title}</b>
                    <small className="block text-ink-muted text-sm mt-0.5 font-light">{zone.desc}</small>
                  </div>
                  <em className="not-italic text-clay font-semibold text-sm whitespace-nowrap shrink-0">
                    {zone.tag}
                  </em>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
