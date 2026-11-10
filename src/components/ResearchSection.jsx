import React from 'react';
import { researchAreas } from '../data/projectData';

export default function ResearchSection() {
  return (
    <section id="research" className="py-24 bg-cream border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-[13px] tracking-[0.14em] uppercase font-semibold text-harvest mb-2.5">
            Research
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-forest leading-tight mb-4">
            Our research areas, brought to life
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            The research areas on our website each get a working home on the campus, linked to a farm unit and a lab, so findings move quickly from the lab to the field.
          </p>
        </div>

        {/* 11 Research Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {researchAreas.map((area) => (
            <div
              key={area.id}
              className="bg-paper border border-line rounded-[14px] p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-serif text-[19px] font-semibold text-forest mb-1.5">
                {area.title}
              </h3>
              <p className="text-[15px] text-ink-muted leading-relaxed font-light">
                {area.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
