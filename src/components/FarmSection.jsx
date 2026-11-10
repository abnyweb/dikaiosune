import React from 'react';
import { farmUnits } from '../data/projectData';

export default function FarmSection() {
  return (
    <section id="farm" className="py-24 bg-cream border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-[13px] tracking-[0.14em] uppercase font-semibold text-harvest mb-2.5">
            The integrated farm
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-forest leading-tight mb-4">
            Version 1: every unit on one site
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            Three commercial pillars carry the farm. Around them, smaller units serve research, teaching and the loop itself. Figures shown are first-version planning targets, not current output.
          </p>
        </div>

        {/* 9 Units Grid with Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {farmUnits.map((unit) => {
            const isCore = unit.category === 'core';
            return (
              <article
                key={unit.id}
                className="bg-paper rounded-[18px] overflow-hidden border border-line flex flex-col shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Photo from online source */}
                <div className="relative h-44 w-full overflow-hidden bg-forest/10 border-b border-line">
                  <img
                    src={unit.image}
                    alt={unit.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  <span
                    className={`absolute bottom-3 left-3 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm ${
                      isCore
                        ? 'bg-[#F4E4C3] text-[#7A5410]'
                        : 'bg-paper text-forest'
                    }`}
                  >
                    {unit.categoryLabel}
                  </span>
                </div>

                <div className="p-6 flex flex-col gap-2.5 flex-1">
                  <h3 className="font-serif text-2xl font-semibold text-forest leading-snug">
                    {unit.title}
                  </h3>

                  <div className="font-serif text-lg font-medium text-clay leading-snug">
                    {unit.target}
                  </div>

                  <p className="text-[15px] text-ink-muted leading-relaxed font-light mt-1">
                    {unit.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Planning Disclaimer */}
        <p className="mt-9 text-sm text-ink-muted font-light">
          Planning targets are indicative for the first version and will be confirmed through detailed design, licensing and phased commissioning.
        </p>

      </div>
    </section>
  );
}
