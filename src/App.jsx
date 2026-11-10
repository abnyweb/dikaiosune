import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VisionSection from './components/VisionSection';
import FarmSection from './components/FarmSection';
import UniversitySection from './components/UniversitySection';
import ResearchSection from './components/ResearchSection';
import MasterPlanSection from './components/MasterPlanSection';
import SustainabilitySection from './components/SustainabilitySection';
import RoadmapSection from './components/RoadmapSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PartnerModal from './components/PartnerModal';
import AdminDashboard from './components/admin/AdminDashboard';

export default function App() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  
  // View mode: 'public' | 'admin'
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#admin' || window.location.pathname === '/admin' ? 'admin' : 'public';
  });

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setCurrentView('admin');
      } else if (currentView === 'admin' && window.location.hash !== '#admin') {
        setCurrentView('public');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentView]);

  const openAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
  };

  const exitAdmin = () => {
    window.location.hash = '';
    setCurrentView('public');
  };

  // Render Admin Dashboard
  if (currentView === 'admin') {
    return <AdminDashboard onExit={exitAdmin} />;
  }

  // Render Public Website
  return (
    <div className="min-h-screen bg-cream text-ink font-sans flex flex-col selection:bg-harvest selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
        onOpenAdmin={openAdmin}
      />

      {/* Main Narrative Flow */}
      <main className="flex-1">
        {/* 2. Hero */}
        <Hero />

        {/* 3. The Vision: Closed Loop & 5 Steps */}
        <VisionSection />

        {/* 4. The Integrated Farm: 9 Units on One Site */}
        <FarmSection />

        {/* 5. The University: 4 Programs, 10 Labs, 3 Educational Tenets */}
        <UniversitySection />

        {/* 6. Applied Research: 11 Areas */}
        <ResearchSection />

        {/* 7. Master Plan: ~112 Acres Layout */}
        <MasterPlanSection />

        {/* 8. Built Responsibly: 6 Commitments */}
        <SustainabilitySection />

        {/* 9. Roadmap & Values: Timeline to Campus & Motto */}
        <RoadmapSection />

        {/* 10. Contact: Build This With Us & Partnership Form */}
        <ContactSection />
      </main>

      {/* 11. Minimal Footer */}
      <Footer onOpenAdmin={openAdmin} />

      {/* High-Contrast Partner / Contact Modal Dialog */}
      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />
    </div>
  );
}
