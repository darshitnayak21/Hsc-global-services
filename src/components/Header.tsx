import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo } from '../design-system/BrandLogo';
import { Menu, X, ArrowRight, Phone, Mail } from 'lucide-react';

export type PageId = 'home' | 'about' | 'services' | 'careers' | 'clients' | 'contact';

export interface NavItem {
  id: PageId;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'careers', label: 'Careers' },
  { id: 'clients', label: 'Clients' },
  { id: 'contact', label: 'Contact' },
];

export interface HeaderProps {
  activePage: PageId;
  onNavigate: (pageId: PageId) => void;
  onGetInTouch?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onGetInTouch,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavSelect = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const handleCtaClick = () => {
    if (onGetInTouch) {
      onGetInTouch();
    } else {
      onNavigate('contact');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-xs'
            : 'bg-white/90 backdrop-blur-sm border-slate-100'
        } ${className}`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Zone 1: Brand Wordmark */}
            <div className="flex items-center shrink-0">
              <button
                onClick={() => handleNavSelect('home')}
                className="text-left rounded-lg p-1 -m-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF] cursor-pointer"
                aria-label="Hscgolbalservices Home"
              >
                <BrandLogo size="md" theme="light" />
              </button>
            </div>

            {/* Zone 2: Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-1 xl:gap-2"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavSelect(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-4 py-2 text-sm font-medium rounded-[30px] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF] ${
                      isActive
                        ? 'text-black bg-slate-100 font-semibold'
                        : 'text-slate-600 hover:text-black hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#3183FF] rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Direct Corporate Phone & CTA */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <a
                href="tel:+914035032090"
                className="flex items-center gap-2 text-xs font-mono text-slate-600 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF] rounded py-1 px-2"
                aria-label="Call Hscgolbalservices at +91 40 35032090"
              >
                <Phone className="w-3.5 h-3.5 text-[#3183FF]" aria-hidden="true" />
                <span className="font-medium">+91 40 35032090</span>
              </a>

              <button
                type="button"
                onClick={handleCtaClick}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[30px] bg-slate-900 hover:bg-[#3183FF] text-white text-xs font-medium tracking-tight transition-all duration-300 shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF]"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Zone 4: Mobile Hamburger Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg text-slate-700 hover:text-black hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3183FF] cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={mobileMenuRef}
          className="fixed inset-x-0 top-20 z-40 lg:hidden bg-white border-b border-slate-200 shadow-2xl animate-in slide-in-from-top-2 duration-200"
          role="region"
          aria-label="Mobile Navigation Drawer"
        >
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavSelect(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-[30px] text-base font-medium transition-colors cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-slate-100 text-black font-semibold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-black'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#3183FF]" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <a
                href="tel:+914035032090"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-mono text-slate-700 hover:text-black rounded-lg"
              >
                <Phone className="w-4 h-4 text-[#3183FF]" />
                <span>+91 40 35032090</span>
              </a>

              <a
                href="mailto:info@creativesolutiontech.in"
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-mono text-slate-700 hover:text-black rounded-lg"
              >
                <Mail className="w-4 h-4 text-[#3183FF]" />
                <span>info@creativesolutiontech.in</span>
              </a>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[30px] bg-slate-900 hover:bg-[#3183FF] text-white text-sm font-semibold transition-all cursor-pointer shadow-md"
                >
                  <span>Get In Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
