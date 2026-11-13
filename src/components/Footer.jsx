import React from 'react';
import { Shield } from 'lucide-react';
import whiteLogo from '../assets/Dikaiosune-Logo-White.webp';

export default function Footer({ onOpenAdmin }) {
  const footerLinks = [
    { name: 'SERVICES', href: 'https://dikaiosune.in/services/' },
    { name: 'RESEARCH & STUDY', href: 'https://dikaiosune.in/research-study/' },
    { name: 'ABOUT', href: 'https://dikaiosune.in/#about' },
    { name: 'CONTACT', href: 'https://dikaiosune.in/#contact' },
    { name: 'MEGA PROJECT', href: 'https://dikaiosune.vercel.app/' }
  ];

  return (
    <footer className="bg-[#273238] text-[#9FB197] text-[13px] py-10 border-t border-white/10 font-poppins">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 flex flex-col gap-6">
        
        {/* Navigation row with redirects to main domain */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          <a
            href="https://dikaiosune.in/"
            className="flex items-center group shrink-0"
            title="Dikaiosune — Main Website"
          >
            <img
              src={whiteLogo}
              alt="DIKAIOSUNE.IN"
              className="h-[26px] sm:h-[30px] w-auto max-w-[210px] object-contain transition-transform duration-200 group-hover:scale-105"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = 'true';
                  e.currentTarget.src = '/Dikaiosune-Logo-White.webp';
                }
              }}
            />
          </a>

          <nav
            aria-label="Footer Menu"
            className="flex flex-wrap items-center justify-center lg:justify-end gap-x-6 sm:gap-x-8 gap-y-2.5 text-[13px] font-semibold uppercase tracking-[0.03em] text-white/80"
          >
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="whitespace-nowrap hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Corporate info & Discrete Admin Icon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-white/60">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2.5 gap-y-1">
            <span>CIN: U01111UP2022PTC174884</span>
            <span>·</span>
            <span>GSTIN: 09AAJCD7328N1Z0</span>
          </div>

          <div className="flex items-center">
            <button
              onClick={onOpenAdmin}
              className="p-1 rounded text-white/30 hover:text-white/80 transition cursor-pointer"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Shield size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
