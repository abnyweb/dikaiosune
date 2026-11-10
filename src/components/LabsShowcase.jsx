import React, { useState } from 'react';
import { specialisedLabs } from '../data/projectData';
import { Microscope, Search, Stethoscope, Briefcase, Users, Wrench } from 'lucide-react';

export default function LabsShowcase({ lang }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'teaching', 'farm', 'community'
  const [activeLabId, setActiveLabId] = useState(specialisedLabs[0].id);

  const filteredLabs = specialisedLabs.filter((lab) => {
    const matchesSearch = 
      lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.teachingRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.farmRole.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const activeLab = specialisedLabs.find(l => l.id === activeLabId) || specialisedLabs[0];

  return (
    <section id="labs" className="py-24 bg-paper border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase font-bold tracking-widest text-harvest mb-3 flex items-center gap-2">
              <Microscope size={14} />
              <span>Research &amp; Diagnostics</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-forest leading-tight mb-3">
              Ten specialised labs
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed">
              Every single lab fulfills a dual mission: giving veterinary students hands-on diagnostic experience while safeguarding the health and biosecurity of our commercial herds.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              placeholder="Search labs or equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-cream border border-line text-sm focus:outline-none focus:ring-2 focus:ring-harvest focus:border-transparent"
            />
          </div>
        </div>

        {/* Labs Interactive Grid & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Lab Selection List */}
          <div className="lg:col-span-5 flex flex-col gap-2 max-h-[640px] overflow-y-auto pr-2">
            {filteredLabs.map((lab) => {
              const isActive = lab.id === activeLabId;
              return (
                <button
                  key={lab.id}
                  onClick={() => setActiveLabId(lab.id)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                    isActive
                      ? 'bg-forest text-cream border-forest shadow-md'
                      : 'bg-cream/40 border-line hover:bg-cream text-ink'
                  }`}
                >
                  <span className={`font-serif text-xl font-bold ${isActive ? 'text-harvest-gold' : 'text-harvest'}`}>
                    {lab.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-serif text-base font-semibold truncate ${isActive ? 'text-white' : 'text-forest'}`}>
                      {lab.name}
                    </h3>
                    <p className={`text-xs truncate ${isActive ? 'text-sage-light' : 'text-ink-muted'}`}>
                      {lab.farmRole}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Lab Detail Card */}
          <div className="lg:col-span-7 bg-cream/70 rounded-3xl p-6 sm:p-8 border border-line shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
              <span className="font-serif text-4xl font-bold text-harvest">
                Lab {activeLab.number}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-forest text-cream">
                NABL / BSL Standard
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-forest mb-4">
              {activeLab.name}
            </h3>

            {/* Equipment Tag */}
            <div className="p-4 rounded-xl bg-paper border border-line mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-harvest mb-1">
                <Wrench size={13} />
                <span>Specialized Instrumentation</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted font-mono leading-relaxed">
                {activeLab.equipment}
              </p>
            </div>

            {/* Three Roles Tabs / Cards */}
            <div className="space-y-4">
              
              {/* Role 1: Student Teaching */}
              <div className="p-4 rounded-2xl bg-paper border border-line">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-clay mb-1.5">
                  <Stethoscope size={15} />
                  <span>Student Learning &amp; Clinical Experience</span>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {activeLab.teachingRole}
                </p>
              </div>

              {/* Role 2: Commercial Farm Service */}
              <div className="p-4 rounded-2xl bg-paper border border-line">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest mb-1.5">
                  <Briefcase size={15} />
                  <span>Commercial Farm Biosecurity &amp; Quality Control</span>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {activeLab.farmRole}
                </p>
              </div>

              {/* Role 3: Community Access */}
              <div className="p-4 rounded-2xl bg-paper border border-line">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf mb-1.5">
                  <Users size={15} />
                  <span>Regional Farmer &amp; Community Extension Services</span>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {activeLab.communityRole}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
