import React from 'react';
import HeroArtwork from './HeroArtwork';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-forest via-[#224230] to-forest-dark text-cream pt-28 sm:pt-36 pb-0 overflow-hidden border-b border-forest-light/40">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
          
          {/* Left Column: Heading and Text */}
          <div className="lg:col-span-7 pb-14">
            <div className="text-[13px] tracking-[0.14em] uppercase font-semibold text-harvest mb-3.5">
              The Dikaiosune Mega Project · Version 1
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-semibold text-white leading-[1.12] tracking-tight mb-5">
              An integrated farm and a <em className="italic font-normal text-harvest-gold">veterinary university</em> on one living campus
            </h1>

            <p className="text-lg sm:text-[20px] text-[#D9E2D3] leading-relaxed max-w-xl mb-8 font-light">
              We are planning a closed-loop farm where every animal, crop and by-product feeds the next, and where students learn on a working commercial farm every day.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#farm"
                className="inline-block bg-harvest hover:bg-[#d69d38] text-white font-semibold px-7 py-3 rounded-full text-[15px] transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-95"
              >
                Explore the farm
              </a>

              <a
                href="#university"
                className="inline-block border-[1.5px] border-cream/50 hover:border-cream text-cream font-semibold px-7 py-3 rounded-full text-[15px] transition-all duration-200"
              >
                The university
              </a>
            </div>
          </div>

          {/* Right Column: Realistic Animated Artwork & Drone Visualization */}
          <div className="lg:col-span-5 flex justify-center pb-8">
            <HeroArtwork />
          </div>

        </div>

        {/* Four Key Metrics Strip */}
        <div className="border-t border-cream/20 grid grid-cols-2 lg:grid-cols-4 gap-4 py-7">
          <div className="py-2 pr-4">
            <b className="block font-serif text-2xl sm:text-3xl text-white font-semibold">~112 acres</b>
            <span className="text-xs sm:text-sm text-sage mt-1 block">Contiguous site, Barabanki</span>
          </div>

          <div className="py-2 pr-4">
            <b className="block font-serif text-2xl sm:text-3xl text-white font-semibold">1 loop</b>
            <span className="text-xs sm:text-sm text-sage mt-1 block">Feed, animals, energy, soil, crops</span>
          </div>

          <div className="py-2 pr-4">
            <b className="block font-serif text-2xl sm:text-3xl text-white font-semibold">10 labs</b>
            <span className="text-xs sm:text-sm text-sage mt-1 block">Specialised research and teaching labs</span>
          </div>

          <div className="py-2 pr-4">
            <b className="block font-serif text-2xl sm:text-3xl text-white font-semibold">3 pillars</b>
            <span className="text-xs sm:text-sm text-sage mt-1 block">Feed, pigs and eggs at the core</span>
          </div>
        </div>

      </div>
    </section>
  );
}
