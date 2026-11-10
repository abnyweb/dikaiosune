import React from 'react';
import { roadmapStages } from '../data/projectData';

export default function RoadmapSection() {
  return (
    <>
      {/* Roadmap Section */}
      <section id="roadmap" className="py-24 bg-[#EDE6D6] border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="text-[13px] tracking-[0.14em] uppercase font-semibold text-harvest mb-2.5">
              Roadmap
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-forest leading-tight mb-4">
              From land to campus
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed">
              An indicative sequence. Dates will be confirmed as approvals and construction progress.
            </p>
          </div>

          {/* 5-Stage Phased Timeline */}
          <div className="relative">
            {/* Timeline horizontal line */}
            <div className="hidden lg:block absolute top-[15px] left-0 right-0 h-[2px] bg-sage" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0 relative">
              {roadmapStages.map((stage, idx) => (
                <div key={idx} className="relative pt-8 lg:pt-11 lg:pr-5">
                  
                  {/* Circle Node */}
                  <div className="hidden lg:block absolute top-[6px] left-0 w-5 h-5 rounded-full bg-forest border-4 border-[#EDE6D6]" />

                  <div className="text-[13px] tracking-[0.1em] uppercase font-bold text-harvest mb-1.5">
                    {stage.stage}
                  </div>

                  <h3 className="font-serif text-[20px] font-semibold text-forest mb-2">
                    {stage.title}
                  </h3>

                  <p className="text-[15px] text-ink-muted leading-relaxed font-light">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Values Motto Section */}
      <section className="py-24 bg-cream text-center border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <blockquote className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-forest max-w-4xl mx-auto mb-5 leading-[1.25] italic font-medium">
            Justice for every living soul.
          </blockquote>
          <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed font-light">
            Dikaiosune began as a family-run farm sanctuary. The mega project carries the same idea to a larger scale: a farm that is productive, humane and a place of learning.
          </p>
        </div>
      </section>
    </>
  );
}
