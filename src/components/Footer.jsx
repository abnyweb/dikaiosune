import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const footerLinks = [
    { name: 'SERVICES', href: 'https://dikaiosune.in/services/' },
    { name: 'RESEARCH & STUDY', href: 'https://dikaiosune.in/research-study/' },
    { name: 'ABOUT', href: 'https://dikaiosune.in/#about' },
    { name: 'CONTACT', href: 'https://dikaiosune.in/#contact' },
    { name: 'MEGA PROJECT', href: 'https://dikaiosune.vercel.app/' }
  ];

  return (
    <footer className="bg-[#16291F] text-[#9FB197] text-[13px] py-10 border-t border-forest-light/30 font-poppins">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 flex flex-col gap-6">
        
        {/* Navigation row with redirects to main domain */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-forest-light/20">
          <a
            href="https://dikaiosune.in/"
            className="flex items-center group shrink-0"
            title="Dikaiosune — Main Website"
          >
            <img
              src="/Dikaiosune-Logo-White.webp"
              alt="Dikaiosune"
              className="h-[24px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          <nav aria-label="Footer Menu" className="flex flex-wrap items-center justify-center gap-6 text-[12px] font-medium uppercase tracking-wider text-cream/80">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition ${link.name === 'MEGA PROJECT' ? 'text-harvest-gold font-semibold hover:text-white' : 'hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Corporate info & Admin portal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs">
          <div>
            <span>CIN U01111UP2022PTC174884</span>
            <span className="hidden sm:inline mx-2">·</span>
            <span className="block sm:inline text-sage/70">
              Project plans are indicative and subject to statutory approvals.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-xs text-harvest hover:text-harvest-gold transition cursor-pointer font-medium"
            >
              <Shield size={13} />
              <span>Executive Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
