import React from 'react';
import { universityPrograms, specialisedLabs } from '../data/projectData';

export default function UniversitySection() {
  return (
    <section id="university" className="py-24 bg-forest text-cream border-b border-forest-light/40">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-[13px] tracking-[0.14em] uppercase font-semibold text-harvest-gold mb-2.5">
            The university
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-white leading-tight mb-4">
            A veterinary university that learns on a working farm
          </h2>
          <p className="text-lg text-sage-light leading-relaxed font-light">
            A private university under the Uttar Pradesh Private Universities Act, with a veterinary college at its core. The commercial farm is its teaching farm: students train on real herds, real feed batches and real business decisions. Programmes are subject to approval by the Veterinary Council of India and the state.
          </p>
        </div>

        {/* 4 Academic Programs Grid with Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {universityPrograms.map((prog) => (
            <article
              key={prog.code}
              className="border border-cream/20 rounded-[18px] overflow-hidden bg-white/[0.04] flex flex-col justify-between group hover:border-cream/40 transition-colors shadow-sm"
            >
              {/* Photo */}
              <div className="relative h-36 w-full overflow-hidden bg-black/20">
                <img
                  src={prog.image}
                  alt={prog.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 text-[11px] tracking-wider uppercase text-harvest-gold font-bold">
                  {prog.level}
                </span>
              </div>

              <div className="p-5 pt-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                    {prog.title}
                  </h3>
                  <p className="text-[14.5px] text-sage-light leading-relaxed font-light">
                    {prog.summary}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Ten Specialised Labs */}
        <div className="pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3">
            <div>
              <h3 className="font-serif text-3xl font-semibold text-white mb-1.5">
                Ten specialised labs
              </h3>
              <p className="text-base text-sage-light font-light">
                Each lab teaches students and serves the farm at the same time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-cream/20">
            {specialisedLabs.map((lab) => (
              <div
                key={lab.number}
                className="py-5 border-b border-cream/20 flex items-start gap-4"
              >
                <span className="font-serif text-harvest-gold text-lg font-semibold shrink-0 w-8">
                  {lab.number}
                </span>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-white mb-1">
                    {lab.name}
                  </h4>
                  <p className="text-[14.5px] text-[#B9C8B3] leading-relaxed font-light">
                    {lab.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Learn Callout Boxes */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-harvest-gold/10 border-l-[3px] border-l-harvest p-5 rounded-r-xl">
            <b className="text-white block font-semibold text-base mb-1">
              Earn while you learn
            </b>
            <span className="text-sage-light text-[15px] font-light">
              Students work part-time shifts across the farm units as part of their training.
            </span>
          </div>

          <div className="bg-harvest-gold/10 border-l-[3px] border-l-harvest p-5 rounded-r-xl">
            <b className="text-white block font-semibold text-base mb-1">
              Automation-first
            </b>
            <span className="text-sage-light text-[15px] font-light">
              Sensors and AI handle routine work, so people focus on animal care, science and decisions.
            </span>
          </div>

          <div className="bg-harvest-gold/10 border-l-[3px] border-l-harvest p-5 rounded-r-xl">
            <b className="text-white block font-semibold text-base mb-1">
              Open to farmers
            </b>
            <span className="text-sage-light text-[15px] font-light">
              Paid soil, feed and disease testing gives local farmers access to the same labs.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
