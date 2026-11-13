import React, { useState, useEffect } from 'react';
import BrandSeal from './BrandSeal';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar({ onOpenPartnerModal, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Research & Study', href: '#research' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      <nav className={`bg-forest text-cream transition-all duration-300 ${isScrolled ? 'shadow-xl py-3' : 'py-4'}`}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 flex items-center justify-between gap-6">
          
          {/* Logo & Brand Wordmark */}
          <a href="#" className="flex items-center gap-3.5 group shrink-0">
            <BrandSeal size={36} className="shrink-0 transition-transform duration-300 group-hover:scale-105" />
            <div className="shrink-0">
              <div className="font-serif text-2xl font-semibold tracking-wide text-white leading-none whitespace-nowrap">
                Dikaiosune
              </div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-sage font-medium mt-1 leading-none whitespace-nowrap">
                Justice for Every Living Soul
              </div>
            </div>
          </a>

          {/* Desktop Nav Links - Clean, single-line, perfectly spaced */}
          <ul className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-cream/85">
            {navLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  className="whitespace-nowrap hover:text-white transition-colors duration-200 py-1"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button, Admin Quick Access & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="hidden md:inline-flex items-center gap-1.5 border border-harvest-gold/40 hover:border-harvest-gold text-harvest-gold hover:text-white px-3.5 py-2 rounded-full text-xs font-semibold transition"
              title="Executive Admin Dashboard"
            >
              <Shield size={13} />
              <span>Admin</span>
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-block bg-harvest hover:bg-[#d69d38] text-white font-semibold px-6 py-2.5 rounded-full text-[15px] transition-all duration-200 shadow-sm hover:shadow-md transform active:scale-95 cursor-pointer whitespace-nowrap shrink-0 leading-normal"
            >
              Partner with us
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-cream/90 hover:text-white hover:bg-forest-light focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-forest-light/60 bg-forest-dark px-6 pt-4 pb-6 space-y-2 mt-3 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-cream hover:bg-forest hover:text-white transition"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-forest-light/40 space-y-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full bg-harvest text-white font-semibold py-3 rounded-full text-sm"
              >
                Partner with us
              </a>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                className="w-full py-2.5 rounded-full border border-harvest-gold/40 text-harvest-gold text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Shield size={13} />
                <span>Executive Admin Portal</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
