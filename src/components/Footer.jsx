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
    <footer className="bg-[#273238] text-[#9FB197] text-[13px] py-10 border-t border-white/10 font-poppins">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 flex flex-col gap-6">
        
        {/* Navigation row with redirects to main domain */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
          <a
            href="https://dikaiosune.in/"
            className="flex items-center group shrink-0"
            title="Dikaiosune — Main Website"
          >
            <img
              src="/Dikaiosune-Logo-White.webp"
              alt="DIKAIOSUNE.IN"
              className="h-[24px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </a>

          <nav aria-label="Footer Menu" className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[13px] font-semibold uppercase tracking-wider text-white/80">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Corporate info & Admin portal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-white/60">
          <div>
            <span>CIN U01111UP2022PTC174884</span>
            <span className="hidden sm:inline mx-2">·</span>
            <span>GSTIN: 09AAJCD7328N1Z0</span>
            <span className="hidden sm:inline mx-2">·</span>
            <span className="block sm:inline text-white/50">
              Project plans are indicative and subject to statutory approvals.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition cursor-pointer font-medium"
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
