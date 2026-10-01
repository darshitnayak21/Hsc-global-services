import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export type PageId = 'home' | 'about' | 'services' | 'careers' | 'clients' | 'contact';
export type ColorTheme = 'cyan-emerald' | 'solar-gold' | 'sapphire-ice';

interface DarkHeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onContactClick: () => void;
  colorTheme?: ColorTheme;
  onChangeColorTheme?: (theme: ColorTheme) => void;
}

export const DarkHeader: React.FC<DarkHeaderProps> = ({
  activePage,
  onNavigate,
  colorTheme = 'cyan-emerald',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement | null>(null);

  const navLinks: { id: PageId; label: string; path: string }[] = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'careers', label: 'Careers', path: '/careers' },
    { id: 'clients', label: 'Clients', path: '/clients' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  // Close mobile menu on Escape key press or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        hamburgerBtnRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        hamburgerBtnRef.current &&
        !hamburgerBtnRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const getThemeDetails = () => {
    switch (colorTheme) {
      case 'solar-gold':
        return {
          activeText: 'text-amber-600 font-bold',
          activeIndicator: 'bg-amber-500',
          hoverText: 'hover:text-amber-600',
        };
      case 'sapphire-ice':
        return {
          activeText: 'text-blue-600 font-bold',
          activeIndicator: 'bg-blue-600',
          hoverText: 'hover:text-blue-600',
        };
      default: // cyan-emerald
        return {
          activeText: 'text-cyan-700 font-bold',
          activeIndicator: 'bg-cyan-600',
          hoverText: 'hover:text-cyan-600',
        };
    }
  };

  const currentT = getThemeDetails();

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.07)] transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* 1. Brand Identity */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNav('home');
          }}
          className="flex items-center gap-2 group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded-xl p-1 cursor-pointer transition-all shrink-0"
          aria-label="Hscgolbalservices - Home"
        >
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-cyan-600 transition-colors">
              Hscgolbalservices
            </span>
            <span className="text-[11px] font-mono text-cyan-700 uppercase tracking-wider font-semibold">
              Enterprise IT &amp; Digital Solutions
            </span>
          </div>
        </a>

        {/* 2. Direct Navigation Links (Plain links without pills, borders, or background containers) */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <a
                key={link.id}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm lg:text-[15px] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded px-1 ${
                  isActive
                    ? `${currentT.activeText}`
                    : `text-slate-600 ${currentT.hoverText} font-medium`
                }`}
              >
                <span>{link.label}</span>
                {/* Active subtle underline accent indicator (no background pill or card) */}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full ${currentT.activeIndicator}`}
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* 3. Mobile Hamburger Toggle (Let's Talk removed completely) */}
        <div className="lg:hidden flex items-center">
          <button
            ref={hamburgerBtnRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu (Proper menu list, not individual cards) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          ref={mobileMenuRef}
          role="region"
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <nav className="max-w-7xl mx-auto px-4 py-3 divide-y divide-slate-100">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full text-left py-3 px-2 text-base transition-colors cursor-pointer flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded ${
                    isActive
                      ? 'text-cyan-700 font-bold'
                      : 'text-slate-700 hover:text-cyan-700 font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-600" aria-hidden="true" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
