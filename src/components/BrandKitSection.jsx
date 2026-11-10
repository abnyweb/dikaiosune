import React, { useState } from 'react';
import BrandSeal from './BrandSeal';
import { brandTokens, companyInfo } from '../data/projectData';
import { Palette, Layout, Eye, Copy, Check, Sparkles, Monitor, Smartphone, Share2 } from 'lucide-react';

export default function BrandKitSection({ lang }) {
  const [activeAd, setActiveAd] = useState('billboard');
  const [copiedText, setCopiedText] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <section id="brandkit" className="py-24 bg-paper border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase font-bold tracking-widest text-harvest mb-3 flex items-center gap-2">
            <Palette size={14} />
            <span>Brand Identity &amp; Creative Suite</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-forest leading-tight mb-4">
            Grown with justice. Taught with care.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed">
            The visual and conceptual identity designed for Dikaiosune: grounded in agrarian reality, clinical integrity, and modern clean aesthetics.
          </p>
        </div>

        {/* Brand System Display: Colors, Typography & Sub-Brands */}
        <div className="bg-cream/50 rounded-3xl p-6 sm:p-10 border border-line mb-16">
          
          {/* Official Seal and Wordmark */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-line">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-3xl bg-forest shadow-md">
                <BrandSeal size={72} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-harvest">
                  Official Seal &amp; Wordmark
                </span>
                <div className="font-serif text-4xl sm:text-5xl font-bold tracking-wide text-forest mt-1">
                  DIKAIOSUNE
                </div>
                <div className="font-serif italic text-xl text-harvest mt-1">
                  Justice for every living soul
                </div>
              </div>
            </div>

            <p className="text-sm text-ink-muted max-w-md leading-relaxed font-light">
              The seal symbolizes a sprout rising from living furrowed soil, held inside a ring representing the closed-loop cycle. Two leaves express the two halves of the institution: the farm and the veterinary university.
            </p>
          </div>

          {/* Color Palette */}
          <div className="py-10 border-b border-line">
            <h3 className="font-serif text-2xl font-semibold text-forest mb-6">
              Color Architecture
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {brandTokens.colors.map((c) => (
                <div key={c.hex} className="flex flex-col">
                  <div
                    className={`h-24 rounded-2xl shadow-sm border border-line/60 flex items-end p-3 ${c.bg} ${c.text || 'text-ink'}`}
                  >
                    <span className="text-xs font-mono font-bold">{c.hex}</span>
                  </div>
                  <div className="font-semibold text-sm text-forest mt-2">{c.name}</div>
                  <div className="text-xs text-ink-muted">{c.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* One Family of Sub-Brands */}
          <div className="pt-10">
            <h3 className="font-serif text-2xl font-semibold text-forest mb-2">
              One Family of Names
            </h3>
            <p className="text-sm text-ink-muted mb-6">
              Unified enterprise architecture covering university academics, feeds, farms, and clean energy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {brandTokens.subBrands.map((b) => (
                <div
                  key={b.name}
                  className={`rounded-2xl p-6 ${b.bgClass} flex flex-col justify-between shadow-sm`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-80 block">
                      Dikaiosune
                    </span>
                    <h4 className="font-serif text-2xl font-bold mt-1">
                      {b.name.replace('Dikaiosune ', '')}
                    </h4>
                    <div className="text-xs font-semibold opacity-90 mt-1">
                      {b.subtitle}
                    </div>
                    <p className="text-xs mt-3 opacity-80 leading-relaxed font-light">
                      {b.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-current/20 text-[10px] font-mono uppercase tracking-wider opacity-90">
                    {b.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Interactive Campaign Creative Showcase */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-harvest mb-2 flex items-center gap-1.5">
                <Layout size={14} />
                <span>Marketing &amp; Ad Creative Mockups</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-forest">
                Campaign Ads &amp; Outdoor Displays
              </h3>
            </div>

            {/* Creative format switch */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'billboard', label: 'Billboard Hoarding (16:9)', icon: <Monitor size={14} /> },
                { id: 'linkedin', label: 'LinkedIn Banner (4:1)', icon: <Layout size={14} /> },
                { id: 'square', label: 'Social Square (1:1)', icon: <Share2 size={14} /> },
                { id: 'portrait', label: 'Social Portrait (4:5)', icon: <Share2 size={14} /> },
                { id: 'story', label: 'Mobile Story (9:16)', icon: <Smartphone size={14} /> }
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setActiveAd(fmt.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeAd === fmt.id
                      ? 'bg-forest text-cream shadow-sm'
                      : 'bg-cream text-ink hover:bg-cream-sand border border-line'
                  }`}
                >
                  {fmt.icon}
                  <span>{fmt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Render Active Ad Preview */}
          <div className="bg-[#1F2420] p-4 sm:p-8 rounded-3xl border border-line flex flex-col items-center justify-center min-h-[500px] overflow-hidden shadow-2xl">
            
            {/* 1. Billboard Hoarding */}
            {activeAd === 'billboard' && (
              <div className="w-full max-w-4xl aspect-[16/9] relative bg-forest rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-6 sm:p-12 text-cream border border-forest-light">
                {/* Realistic Campus Background */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <img 
                    src="/images/dikaiosune_campus_hero.jpg" 
                    alt="Campus Aerial" 
                    className="w-full h-full object-cover object-right"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/95 via-50% to-forest/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <BrandSeal size={40} />
                    <span className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-harvest-gold">
                      Dikaiosune University
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl sm:text-5xl font-bold leading-[1.05] mb-2 text-white">
                    Future vets learn here, <span className="italic font-normal text-harvest-gold">on a living farm.</span>
                  </h4>
                  <p className="text-sage-light text-sm sm:text-base mb-3 font-medium">
                    Veterinary education embedded within a 112-acre sustainable commercial farm ecosystem.
                  </p>
                  <p className="text-xs sm:text-sm text-sage-light leading-relaxed">
                    Veterinary &amp; Animal Sciences · 10 specialised labs · a working commercial farm as the classroom
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cream/20">
                  <span className="bg-harvest text-ink font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow">
                    Opening Soon · Subject to approvals
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-harvest-gold font-bold">
                    dikaiosune.in · Barabanki (UP)
                  </span>
                </div>
              </div>
            )}

            {/* 2. LinkedIn Banner */}
            {activeAd === 'linkedin' && (
              <div className="w-full max-w-4xl aspect-[1584/396] relative bg-cream rounded-2xl overflow-hidden shadow-2xl flex items-center p-6 sm:p-10 text-ink border border-line">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1584 396" preserveAspectRatio="none">
                  <path d="M900 396 Q1100 250 1300 300 T1584 240 L1584 396Z" fill="#A9BFA0" />
                  <path d="M980 396 Q1180 310 1380 340 T1584 320 L1584 396Z" fill="#6E8F64" />
                  <circle cx="1400" cy="130" r="64" fill="#E2C27D" />
                  <rect x="1120" y="230" width="170" height="90" fill="#1E3A2B" />
                  <path d="M1110 234 L1205 180 L1300 234Z" fill="#8B4A2B" />
                </svg>

                <div className="relative z-10 max-w-lg">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-clay mb-1">
                    The Dikaiosune Mega Project
                  </div>
                  <h4 className="font-serif text-xl sm:text-3xl font-bold text-forest leading-tight mb-2">
                    Grown with justice. <span className="italic text-clay">Taught with care.</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-ink-muted">
                    An integrated farm and a veterinary university on one living campus · Barabanki, Uttar Pradesh
                  </p>
                </div>
              </div>
            )}

            {/* 3. Social Post 1:1 Square */}
            {activeAd === 'square' && (
              <div className="w-full max-w-md aspect-square relative bg-cream rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-6 sm:p-8 text-ink border border-line">
                <svg className="absolute -right-20 -top-20 w-72 h-72 pointer-events-none" viewBox="0 0 560 560">
                  <circle cx="280" cy="280" r="270" fill="#E7EEDF" />
                  <circle cx="280" cy="280" r="200" fill="none" stroke="#C08A2E" strokeWidth="3" strokeDasharray="6 12" />
                </svg>

                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 mb-4">
                    <BrandSeal size={32} />
                    <span className="text-xs uppercase font-bold tracking-widest text-forest">
                      Dikaiosune University
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl sm:text-4xl font-bold text-forest leading-tight mb-3">
                    Your classroom has <span className="italic text-clay">1,430 sows</span> in it.
                  </h4>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Study veterinary science on a working commercial farm: pigs, poultry, Gir cattle, a feed mill and a biogas plant, all on one campus.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-line/60">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-forest text-cream p-2.5 rounded-xl text-center">
                      <div className="font-serif font-bold text-sm">BVSc &amp; AH</div>
                      <div className="text-[10px] text-sage">Vet degree*</div>
                    </div>
                    <div className="bg-clay text-white p-2.5 rounded-xl text-center">
                      <div className="font-serif font-bold text-sm">MVSc · PhD</div>
                      <div className="text-[10px] opacity-80">Research</div>
                    </div>
                    <div className="bg-harvest text-ink p-2.5 rounded-xl text-center">
                      <div className="font-serif font-bold text-sm">Skills</div>
                      <div className="text-[10px] opacity-80">Farmers</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-ink-muted flex justify-between">
                    <span>*Subject to UP state and VCI approval</span>
                    <span className="font-bold text-forest">dikaiosune.in</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Social Post 4:5 Portrait */}
            {activeAd === 'portrait' && (
              <div className="w-full max-w-sm aspect-[4/5] relative bg-clay text-cream-sand rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-6 sm:p-7 border border-clay-light">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BrandSeal size={30} />
                    <span className="text-xs uppercase font-bold tracking-wider text-harvest-gold">
                      Dikaiosune University
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                    Ten labs. <span className="italic text-harvest-gold">One working farm.</span>
                  </h4>
                  <p className="text-xs text-clay-soft mb-4">
                    Every lab teaches students and keeps the farm safe, at the same time.
                  </p>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] border-t border-white/20 pt-3">
                    {[
                      '01 Feed & Nutrition', '02 Disease Diagnostics',
                      '03 Reproduction & AI', '04 Clinical Hospital',
                      '05 Genetics & Breeding', '06 Food Safety QC',
                      '07 Microbiology & Bio', '08 Soil, Water, Enviro',
                      '09 Precision AI & Data', '10 Pre-clinical Labs'
                    ].map((l, i) => (
                      <div key={i} className="py-1 border-b border-white/10 flex items-center gap-1.5 text-white/90">
                        <span className="text-harvest-gold font-bold">✓</span>
                        <span className="truncate">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                  <span className="bg-harvest-gold text-ink font-bold px-3 py-1.5 rounded-full text-[11px]">
                    Register interest · dikaiosune.in
                  </span>
                  <span className="text-[10px] text-clay-soft">Opening Soon</span>
                </div>
              </div>
            )}

            {/* 5. Mobile Story 9:16 */}
            {activeAd === 'story' && (
              <div className="w-full max-w-[280px] aspect-[9/16] relative bg-forest text-cream rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-5 border border-forest-light">
                {/* Realistic Background Image */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <img 
                    src="/images/dikaiosune_campus_hero.jpg" 
                    alt="Campus" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/95 via-forest/80 to-forest-dark/95" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <BrandSeal size={28} />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-harvest-gold">
                      University
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl font-bold leading-tight text-white mb-2">
                    Become the vet <span className="italic text-harvest-gold">India's farms</span> are waiting for.
                  </h4>
                  <p className="text-xs text-harvest-gold/90 mb-2 font-medium">
                    Hands-on clinical training on a real working commercial farm.
                  </p>
                  <p className="text-[11px] text-sage-light leading-relaxed">
                    Clinical rotations on real herds. A teaching hospital. Part-time work on the farm while you study.
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-cream/20">
                  <button className="w-full bg-harvest text-ink font-bold text-xs py-2 rounded-full shadow text-center mb-1">
                    Register at dikaiosune.in
                  </button>
                  <div className="text-[9px] text-center text-sage">
                    BVSc &amp; AH subject to UP &amp; VCI approval
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
