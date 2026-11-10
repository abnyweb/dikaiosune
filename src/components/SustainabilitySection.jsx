import React from 'react';
import { sustainabilityPillars } from '../data/projectData';

export default function SustainabilitySection() {
  return (
    <section id="sustainability" className="py-24 bg-cream border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-[13px] tracking-[0.14em] uppercase font-semibold text-harvest mb-2.5">
            Built responsibly
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-forest leading-tight">
            Welfare, safety and the land come first
          </h2>
        </div>

        {/* 6 Grid items with border-top: 3px solid leaf */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {sustainabilityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="pt-5 border-t-[3px] border-t-leaf flex flex-col"
            >
              <h3 className="font-serif text-[21px] font-semibold text-forest mb-2">
                {pillar.title.replace(' as Justice', '')}
              </h3>
              <p className="text-[15.5px] text-ink-muted leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
