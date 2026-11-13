import React, { useState } from 'react';
import { loopSteps } from '../data/projectData';

export default function VisionSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = loopSteps[activeStepIndex];

  return (
    <section id="about" className="py-24 bg-paper border-b border-line relative">
      <div id="vision" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Section Header & 5 Loop Steps */}
          <div className="lg:col-span-7">
            <div className="max-w-2xl mb-10">
              <div className="text-[13px] tracking-[0.14em] uppercase font-semibold text-harvest mb-2.5">
                The vision
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-forest leading-tight mb-4">
                Nothing leaves the farm as waste
              </h2>
              <p className="text-lg text-ink-muted leading-relaxed">
                The project is designed as one system. Our own feed mill supplies the animals; their manure becomes energy and fertiliser; the fertiliser grows the crops and flowers that close the circle.
              </p>
            </div>

            {/* 5 Ordered Steps */}
            <ol className="space-y-5">
              {loopSteps.map((step, idx) => (
                <li 
                  key={step.id} 
                  onMouseEnter={() => setActiveStepIndex(idx)}
                  className={`flex items-start gap-4 p-3 rounded-2xl transition-all cursor-pointer ${
                    activeStepIndex === idx ? 'bg-cream/70' : 'hover:bg-cream/40'
                  }`}
                >
                  <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    activeStepIndex === idx ? 'bg-forest text-cream' : 'bg-line text-ink-muted'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-semibold text-forest mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[15px] text-ink-muted leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: Circular Loop Diagram & Active Photo Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center mb-6">
              <svg 
                viewBox="0 0 440 440" 
                className="w-full h-full select-none"
                aria-label="Closed-loop farm diagram with veterinary university at the center"
              >
                {/* Connecting Circle Loop */}
                <circle cx="220" cy="220" r="160" fill="none" stroke="#A9BFA0" strokeWidth="3" />

                {/* Nodes on circle */}
                {/* 1. Feed Mill (Top) */}
                <g className="cursor-pointer" onClick={() => setActiveStepIndex(0)}>
                  <circle cx="220" cy="60" r="48" fill={activeStepIndex === 0 ? '#E2C27D' : '#F4E4C3'} stroke={activeStepIndex === 0 ? '#1E3A2B' : 'none'} strokeWidth="2.5" />
                  <text x="220" y="56" textAnchor="middle" font-family="Georgia,serif" fontSize="15" fill="#1E3A2B">Feed</text>
                  <text x="220" y="74" textAnchor="middle" font-family="Georgia,serif" fontSize="15" fill="#1E3A2B">mill</text>
                </g>

                {/* 2. Animals (Top Right) */}
                <g className="cursor-pointer" onClick={() => setActiveStepIndex(1)}>
                  <circle cx="372" cy="170" r="48" fill={activeStepIndex === 1 ? '#CBD8C5' : '#E7EEDF'} stroke={activeStepIndex === 1 ? '#1E3A2B' : 'none'} strokeWidth="2.5" />
                  <text x="372" y="175" textAnchor="middle" font-family="Georgia,serif" fontSize="15" fill="#1E3A2B">Animals</text>
                </g>

                {/* 3. Biogas energy (Bottom Right) */}
                <g className="cursor-pointer" onClick={() => setActiveStepIndex(2)}>
                  <circle cx="314" cy="350" r="48" fill={activeStepIndex === 2 ? '#E2C27D' : '#F4E4C3'} stroke={activeStepIndex === 2 ? '#1E3A2B' : 'none'} strokeWidth="2.5" />
                  <text x="314" y="346" textAnchor="middle" font-family="Georgia,serif" fontSize="15" fill="#1E3A2B">Biogas</text>
                  <text x="314" y="364" textAnchor="middle" font-family="Georgia,serif" fontSize="15" fill="#1E3A2B">energy</text>
                </g>

                {/* 4. Organic fertiliser (Bottom Left) */}
                <g className="cursor-pointer" onClick={() => setActiveStepIndex(3)}>
                  <circle cx="126" cy="350" r="48" fill={activeStepIndex === 3 ? '#CBD8C5' : '#E7EEDF'} stroke={activeStepIndex === 3 ? '#1E3A2B' : 'none'} strokeWidth="2.5" />
                  <text x="126" y="346" textAnchor="middle" font-family="Georgia,serif" fontSize="15" fill="#1E3A2B">Organic</text>
                  <text x="126" y="364" textAnchor="middle" font-family="Georgia,serif" fontSize="15" fill="#1E3A2B">fertiliser</text>
                </g>

                {/* 5. Crops & flowers (Top Left) */}
                <g className="cursor-pointer" onClick={() => setActiveStepIndex(4)}>
                  <circle cx="68" cy="170" r="48" fill={activeStepIndex === 4 ? '#E2C27D' : '#F4E4C3'} stroke={activeStepIndex === 4 ? '#1E3A2B' : 'none'} strokeWidth="2.5" />
                  <text x="68" y="166" textAnchor="middle" font-family="Georgia,serif" fontSize="15" fill="#1E3A2B">Crops &amp;</text>
                  <text x="68" y="184" textAnchor="middle" font-family="Georgia,serif" fontSize="15" fill="#1E3A2B">flowers</text>
                </g>

                {/* Central Veterinary University Core */}
                <circle cx="220" cy="220" r="62" fill="#1E3A2B" />
                <text x="220" y="214" textAnchor="middle" font-family="Georgia,serif" fontSize="16" fill="#F6F1E7">Veterinary</text>
                <text x="220" y="234" textAnchor="middle" font-family="Georgia,serif" fontSize="16" fill="#F6F1E7">University</text>
              </svg>
            </div>

            {/* Active Stage Photo Card */}
            <div className="w-full max-w-[400px] bg-cream rounded-2xl overflow-hidden border border-line shadow-sm flex items-center gap-3.5 p-2.5">
              <img
                src={activeStep.image}
                alt={activeStep.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0 pr-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-harvest block">
                  Stage 0{activeStepIndex + 1}
                </span>
                <div className="font-serif text-base font-semibold text-forest truncate">
                  {activeStep.title}
                </div>
                <div className="text-xs text-ink-muted line-clamp-2 mt-0.5 font-light">
                  {activeStep.description}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
