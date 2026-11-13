import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import whiteLogo from '../assets/Dikaiosune-Logo-White.webp';
import blackLogo from '../assets/Dikaiosune-Logo-Black.webp';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger sticky state after scrolling past 30px
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'SERVICES', href: 'https://dikaiosune.in/services/' },
    { name: 'RESEARCH & STUDY', href: 'https://dikaiosune.in/research-study/' },
    { name: 'ABOUT', href: 'https://dikaiosune.in/#about' },
    { name: 'CONTACT', href: 'https://dikaiosune.in/#contact' },
    { name: 'MEGA PROJECT', href: 'https://dikaiosune.vercel.app/', isCurrent: true }
  ];

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 font-poppins ${
        isScrolled
          ? 'top-2 sm:top-3.5 px-3 sm:px-6'
          : 'top-0 px-0'
      }`}
    >
      <nav
        className={`max-w-[1280px] mx-auto transition-all duration-300 ${
          isScrolled
            ? 'bg-white rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.14)] px-6 sm:px-9 py-2.5 sm:py-3 border border-black/5 text-black'
            : 'bg-transparent px-6 sm:px-8 py-5 sm:py-6 text-white'
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          
          {/* Main Logo - Swaps between White (top) and Black (sticky pill) */}
          <a
            href="https://dikaiosune.in/"
            className="flex items-center group shrink-0"
            title="Dikaiosune — Return to Main Site"
          >
            <img
              src={isScrolled ? blackLogo : whiteLogo}
              alt="DIKAIOSUNE.IN"
              className="h-[28px] sm:h-[32px] w-auto max-w-[210px] object-contain transition-all duration-200 group-hover:scale-105"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = 'true';
                  e.currentTarget.src = isScrolled ? '/Dikaiosune-Logo-Black.webp' : '/Dikaiosune-Logo-White.webp';
                }
              }}
            />
          </a>

          {/* Desktop Nav Links */}
          <ul
            className={`hidden lg:flex items-center gap-7 xl:gap-8 text-[15px] font-semibold uppercase tracking-[0.03em] ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
          >
            {navLinks.map((link) => (
              <li key={link.name} className="shrink-0">
                <a
                  href={link.href}
                  onClick={
                    link.isCurrent
                      ? (e) => {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      : undefined
                  }
                  className={`whitespace-nowrap transition-colors duration-200 py-1 ${
                    link.isCurrent
                      ? isScrolled
                        ? 'text-black border-b-2 border-harvest font-bold'
                        : 'text-white border-b-2 border-harvest-gold font-bold'
                      : isScrolled
                      ? 'hover:text-black/60'
                      : 'hover:text-white/80'
                  }`}
                  aria-current={link.isCurrent ? 'page' : undefined}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Get in Touch Button */}
            <a
              href="https://dikaiosune.in/#contact"
              className={`hidden sm:inline-flex items-center justify-center border-2 rounded-full font-poppins font-medium text-sm px-6 py-2 transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap leading-normal ${
                isScrolled
                  ? 'border-black text-black hover:bg-black hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-[#16221A]'
              }`}
            >
              Get in Touch
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full focus:outline-none cursor-pointer transition ${
                isScrolled
                  ? 'text-black hover:bg-black/5'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border px-6 pt-4 pb-6 space-y-2 mt-3 rounded-2xl shadow-2xl animate-fadeIn ${
              isScrolled
                ? 'bg-white border-black/10 text-black'
                : 'bg-[#16221A]/95 backdrop-blur-xl border-white/15 text-white'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={
                  link.isCurrent
                    ? (e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    : () => setMobileMenuOpen(false)
                }
                className={`block px-3 py-2.5 rounded-lg text-sm uppercase tracking-wider font-semibold transition ${
                  isScrolled
                    ? 'hover:bg-black/5 text-black'
                    : 'hover:bg-white/10 text-white'
                }`}
                aria-current={link.isCurrent ? 'page' : undefined}
              >
                {link.name}
              </a>
            ))}
            <div className={`pt-3 border-t space-y-2 ${isScrolled ? 'border-black/10' : 'border-white/15'}`}>
              <a
                href="https://dikaiosune.in/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-center w-full border-2 font-medium py-2.5 rounded-full text-sm transition ${
                  isScrolled
                    ? 'border-black text-black hover:bg-black hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-[#16221A]'
                }`}
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
