import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
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
    { name: 'SERVICES', href: 'https://dikaiosune.in/services/' },
    { name: 'RESEARCH & STUDY', href: 'https://dikaiosune.in/research-study/' },
    { name: 'ABOUT', href: 'https://dikaiosune.in/#about' },
    { name: 'CONTACT', href: 'https://dikaiosune.in/#contact' },
    { name: 'MEGA PROJECT', href: 'https://dikaiosune.vercel.app/', isCurrent: true }
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 font-poppins">
      <nav className={`bg-[#354048] text-white transition-all duration-300 ${isScrolled ? 'shadow-xl py-3' : 'py-4'}`}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 flex items-center justify-between gap-6">
          
          {/* Main Logo - Exact official White webp wordmark from dikaiosune.in */}
          <a
            href="https://dikaiosune.in/"
            className="flex items-center group shrink-0"
            title="Dikaiosune — Return to Main Site"
          >
            <img
              src="/Dikaiosune-Logo-White.webp"
              alt="DIKAIOSUNE.IN"
              className="h-[28px] sm:h-[32px] w-auto max-w-[220px] object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </a>

          {/* Desktop Nav Links - Styled identically to dikaiosune.in */}
          <ul className="hidden lg:flex items-center gap-7 xl:gap-8 text-[15px] font-semibold uppercase tracking-[0.03em] text-white">
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
                  className="whitespace-nowrap hover:text-white/80 transition-colors duration-200 py-1"
                  aria-current={link.isCurrent ? 'page' : undefined}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Get in Touch Button styled identically to dikaiosune.in */}
            <a
              href="https://dikaiosune.in/#contact"
              className="hidden sm:inline-flex items-center justify-center border-2 border-white hover:border-white rounded-full text-white hover:bg-white hover:text-[#354048] font-poppins font-medium text-sm px-6 py-2 transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap leading-normal"
            >
              Get in Touch
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/15 bg-[#2B353D] px-6 pt-4 pb-6 space-y-2 mt-3 animate-fadeIn">
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
                className="block px-3 py-2.5 rounded-lg text-sm uppercase tracking-wider font-semibold text-white hover:bg-white/10 transition"
                aria-current={link.isCurrent ? 'page' : undefined}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-white/15 space-y-2">
              <a
                href="https://dikaiosune.in/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full border-2 border-white text-white font-medium py-2.5 rounded-full text-sm hover:bg-white hover:text-[#354048] transition"
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
